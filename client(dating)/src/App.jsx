import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Chat from './components/Chat'
import {  Route, Routes } from 'react-router-dom'
import Message from './pages/Message'
import Login from './pages/Login'
import SignupPage from './pages/SignupPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path='/:id' element={<Message/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignupPage/>}/>

     </Routes>
    </>
  )
}

export default App
