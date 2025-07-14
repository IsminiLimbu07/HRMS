import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes,Route } from 'react-router-dom'
import LoginForm from './Pages/login'
import Home from "./Pages/home";
import Dashboard from './Pages/dashboard'
import Employee from './Pages/employee'
import ProtectedRoute from './components/home/utils/protectedRoute'

function App() {

  return (
    <>
    <Routes>
      <Route path = "/" element={<LoginForm />} />
      <Route path="home" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }>

        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employee" element={
          <ProtectedRoute allowedRoles = {["hr", "manager", "admin"]}>
          <Employee />

          </ProtectedRoute>
        }
        />

      </Route>

    </Routes>
    
    </>
  )
}

export default App
