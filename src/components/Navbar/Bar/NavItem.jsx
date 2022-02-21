import { useNavigate } from "react-router-dom";
import React, { useState } from "react"

export default function NavItem(props) {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <li className="nav-item text-white">
      <button className="icon-button" onClick={() => {
        setOpen(!open)
        props.path && navigate(props.path)
      }}>
        {props.icon}
      </button>

      {open && props.children}
    </li>
  )
}