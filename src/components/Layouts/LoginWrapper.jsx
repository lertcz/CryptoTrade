import React from 'react'
import { Container } from 'react-bootstrap';

export default function LoginWrapper(props) {
  return (
    <div>
        <Container 
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: '400px' }}>
                {<props.element />}
            </div>
        </Container>
    </div>
  )
}
