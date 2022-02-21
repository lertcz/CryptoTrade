import React from "react"

export default function Bar(props) {
    return (
      <nav className="navbar">
        <ul className="navbarUl"> 
            {props.children}
        </ul>
      </nav>
    )
}