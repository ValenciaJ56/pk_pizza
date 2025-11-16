import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Prueba from "./pages/Prueba"

function App() {
  return (
  <BrowserRouter>    
    <Routes>
      <Route path="/Prueba" element={<Prueba />}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App