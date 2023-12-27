import React from 'react'
import Navbar from './Aseests/Navbar'
import Home from './components/Home'
import { Footer } from './Aseests/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'

const App = () => {
    return (
        <div className="font-poppins bg-body min-h-screen flex flex-col relative">
            <BrowserRouter>
                <Navbar/>
                <div className=' flex-grow'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/connecter' element={<Login />} />
                    <Route path='/inscrire' element={<Register />} />
                </Routes>
                </div>
            </BrowserRouter>
            <Footer />
        </div>
    )
}

export default App