import React, { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import Coins from '@mui/icons-material/MonetizationOn';

import './Navbar.css'


function Navbar() {
  const { currentUser } = useAuth()
  return (
    <Bar>
          <NavItem
            path="/"
            icon={<HomeIcon />}
          />

        {/*<div className="navbar-account">*/}
        <div className="flex flex-row flex-end">
          <NavItem
            path="/"
            icon={<HomeIcon />} />

          <NavItem
            path="/crypto-list"
            icon={<Coins />} />

          <NavItem icon={currentUser ? <AccountCircleIcon /> : <LoginIcon />}>
            <DropdownMenu />
          </NavItem>
        </div>
          
        {/*</div>*/}
    </Bar>
  )
}

function DropdownMenu() {
  const { currentUser, logout } = useAuth()
  async function handleLogout() {
    await logout()
  }

  /* change drop box depending if you are logged in */
  function ProfileOrGuestDropBox() {
    if (currentUser) {
      return (
        <>
          <DropdownItem
            path={"/profile"}>
            {currentUser.email}
          </DropdownItem>

          <DropdownItem
            path={"#"}
            handleClick={handleLogout}
            leftIcon={<LogoutIcon />}>
            Log Out
          </DropdownItem>
        </>
      )
    }
    else {
      return (
        <>
          <DropdownItem
            path={"/login"}>
            Log In
          </DropdownItem>

          <DropdownItem
            path={"/signin"}>
            Sign In
          </DropdownItem>
        </>
      )
    }
  }

  function DropdownItem(props) {
    return (
      <a href={props.path} className="menu-item" onClick={props.handleClick}>
        {props.leftIcon && <span className="icon-button m-2">{props.leftIcon}</span>}
        {props.children}
        {props.rightIcon && <span className="icon-button">{props.rightIcon}</span>}
      </a>
    )
  }

  return (
    <div className="dropdown">
      <ProfileOrGuestDropBox />
    </div>
  )
}

function Bar(props) {
  /* return (
     <nav className="navbar flex-col">
       <ul className="navbar-account flex-row w-11/12"> { props.children }</ul>
     </nav>
   )*/

  return (
    <nav className="navbar">
      <ul className="flex flex-row"/*className="w-11/12"*/> {props.children}</ul>
    </nav>
  )
}

function NavItem(props) {
  const [open, setOpen] = useState(false)

  return (
    <li className="nav-item text-white">
      <a href={props.path} className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  )
}

export default Navbar