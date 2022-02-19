import React from "react";

import Navbar from "./components/Navbar/Navbar";

/* Profile */
import Dashboard from "./components/profile/Dashboard"; //Profile screen
import SignUp from "./components/profile/SignUp";
import Login from "./components/profile/Login";
import ForgotPassword from "./components/profile/ForgotPassword";
import UpdateProfile from "./components/profile/UpdateProfile";
import PrivateRoute from "./components/Routes/PrivateRoute";

/* Main Page */
import MainPage from './components/MainPage/MainPage'
import GuestPage from './components/MainPage/GuestPage'

/* Crypto list */
import CryptoList from "./components/CryptoList/CryptoList";

import { AuthProvider } from './contexts/AuthContext';

import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
      <Router>
        <AuthProvider>
          <Navbar />
          <Container 
            className="d-flex align-items-center justify-content-center"
            style={{ minHeight: "100vh" }}>
              <div className="w-100" style={{ maxWidth: '400px' }}>
                <Routes>
                  {/* <Route path='/' element={<PrivateRoute reroute={"/"}/>}>
                    <Route path='/' element={<MainPage />} />
                  </Route> */}
                  <Route path='/' element={<MainPage />} />

                  <Route path='/profile' element={<PrivateRoute reroute={"/login"}/>}>
                    <Route path='/profile' element={<Dashboard />} />
                  </Route>

                  <Route path='/update-profile' element={<PrivateRoute reroute={"/login"}/>}>
                    <Route path='/update-profile' element={<UpdateProfile />}/>
                  </Route>

                  <Route path="/crypto-list" element={<CryptoList />} />

                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
             </div>
        </Container> 
        </AuthProvider>
      </Router>
  )
}

export default App