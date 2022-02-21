import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

import Bar from './Bar/Bar';
import NavItem from './Bar/NavItem';
import DropdownMenu from './Bar/DropdownMenu';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import Coins from '@mui/icons-material/MonetizationOn';

import '../../styles/Navbar.css'


function Navbar() {
  const { currentUser } = useAuth()
  return (
    <Bar>
          <NavItem
            path={"/"}
            icon={<HomeIcon />}
          />

        <div className='inline-block float-right pr-6 pt-1'>

          <NavItem
            path={"/crypto-list"}
            icon={<Coins />} />

          <NavItem icon={currentUser ? <AccountCircleIcon /> : <LoginIcon />}>
            <DropdownMenu />
          </NavItem>
        </div>
    </Bar>
  )
}

export default Navbar