import React from 'react'
import Navbar from './Aseests/Navbar'
import Home from './components/Home'
import { Footer } from './Aseests/Footer'

const App = () => {
  return (
    <div className="font-poppins bg-body min-h-screen flex flex-col p-4 relative">
    <Navbar />
    <Home />
    <Footer />
    </div>
  )
}

export default App