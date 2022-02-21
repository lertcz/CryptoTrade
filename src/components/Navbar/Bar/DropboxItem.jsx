import { useNavigate } from "react-router-dom";
import React from "react"

export default function DropdownItem(props) {
  const navigate = useNavigate()

  return (
    <button className="menu-item" onClick={() => {
      props.handleClick && props.handleClick()
      props.path && navigate(props.path)
    }}>
      {props.leftIcon && <span className="icon-button m-2">{props.leftIcon}</span>}
      {props.children}
      {props.rightIcon && <span className="icon-button">{props.rightIcon}</span>}
    </button>
  )
}