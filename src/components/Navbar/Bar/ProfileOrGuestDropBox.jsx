import React from "react"
import { useAuth } from '../../../contexts/AuthContext'

import DropdownItem from "./DropboxItem";

import LogoutIcon from '@mui/icons-material/Logout';

/* darkmode ? */
/* import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

import useDarkMode from "../../useDarkMode"; */


/* change drop box depending if you are logged in */
export default function ProfileOrGuestDropBox() {
    const { currentUser, logout } = useAuth()
    /* useDarkMode() */
    /* const [colorTheme, setTheme] = useDarkMode() */
    
    async function handleLogout() {
      console.log("logout")
      await logout()
    }

    if (currentUser) {
      return (
        <>
          <DropdownItem
            path={"/profile"}>
            {currentUser.email}
          </DropdownItem>

          <DropdownItem
            path={"/"}
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