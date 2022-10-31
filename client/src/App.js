import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './Home'
import Navbar from './components/Navbar'



const App = () => {
    return(
        <div>
             <BrowserRouter>
                <Navbar />
                <Routes> 
                    <Route exact path="/" element={<Login/>} />
                    <Route exact path="/register" element={<Register/>} />
                    <Route exact path="/home" element={<Home/>} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App