import React, { useRef, useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { Form, Card, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext'

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updateEmail, updatePassword } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Password do not match")
    }

    const promises = []
    setError('')
    setLoading(true)

    if (passwordRef.current.value) {
      await promises.push(updatePassword(passwordRef.current.value))
    }
    if (emailRef.current.value !== currentUser.email) {
      await promises.push(updateEmail(emailRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        navigate("/")
      })
      .catch((e) => {
        console.log(e.message)
        if (e.message.includes("(auth/weak-password)")) {
          setError("Weak password: at least 6 characters")
        }
        if (e.message.includes("(auth/requires-recent-login)")) {
          setError("Log in again before retrying this request")
        }
        else {
          setError("Failed to update account")
        }
      })
      .finally(() => {
        setLoading(false)
      })
    }
  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same" />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same" />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancel</Link>
      </div>
    </>
  )
}