import React from 'react'; 
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './Home'
import Search from './pages/Search'
import Navbar from './components/Navbar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const App = () => {

    let x= localStorage.getItem('token')
    console.log(x)
    if(x) {
        return(
            <div>
                 <BrowserRouter>
                    <Navbar />
                    <Routes> 
                        <Route exact path="/" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                        <Route exact path="/home" element={<Home/>} />
                        <Route exact path="/search" element={<Search/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
    else {
        toast.info('Please login or register.');
        return(
            <div>
                 <BrowserRouter>
                    <Navbar /> 
                    <Routes> 
                        <Route exact path="/" element={<Login/>} />
                        <Route exact path="/register" element={<Register/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        )
    }
}

export default App