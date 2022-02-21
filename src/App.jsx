import React from "react";

import Navbar from "./components/Navbar/Navbar";
import LoginWrapper from "./components/Layouts/LoginWrapper"

/* Profile */
import Dashboard from "./pages/profile/Dashboard"; //Profile screen
import SignUp from "./pages/profile/SignUp";
import Login from "./pages/profile/Login";
import ForgotPassword from "./pages/profile/ForgotPassword";
import UpdateProfile from "./pages/profile/UpdateProfile";
import PrivateRoute from "./components/Routes/PrivateRoute";

/* Main Page */
import MainPage from './pages/MainPage'
/* import GuestPage from './pages/GuestPage' */

/* Crypto coins */
import CryptoList from "./pages/Coins/CryptoList";
import DetailedView from "./pages/Coins/DetailedView"

import { AuthProvider } from './contexts/AuthContext';

import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <Router>
        <AuthProvider>
        <StyledEngineProvider injectFirst>
          <Navbar />
          <Routes>
            <Route path='/' element={<MainPage />} />
            <Route exact path="/crypto-list" element={<CryptoList />} />
            <Route path="/crypto-list/:id" element={<DetailedView />} />

            <Route path='/profile' element={<PrivateRoute reroute={"/login"}/>}>
              <Route path='/profile' element={<LoginWrapper element={Dashboard} />} />
            </Route>
            
            <Route path="/signup" element={<LoginWrapper element={SignUp} />} />
            <Route path="/login" element={<LoginWrapper element={Login} />} />
            <Route path="/forgot-password" element={<LoginWrapper element={ForgotPassword} />} />
            
            <Route path='/update-profile' element={<PrivateRoute reroute={"/login"}/>}>
              <Route path='/update-profile' element={<LoginWrapper element={UpdateProfile} />} />
            </Route>
          </Routes>
        </StyledEngineProvider>
        </AuthProvider>
      </Router>
  )
}

export default App