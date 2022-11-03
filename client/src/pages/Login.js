import {useState} from 'react';
import './page.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function loginUser(event){
    event.preventDefault()
    
    const response = await fetch('http://localhost:5000/api/login', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        email,
        password,
      }), 
    })

    const data = await response.json()

    if (data.user) {
      localStorage.setItem('token', data.user)
      localStorage.setItem('email', email)
      alert('Login successful')
      toast.success(`Login successful.`);
      window.location.href = "/home"
    }
    else {
      toast.error(`Login failed, Invalid username or password`);
      alert('Login failed, Invalid username or password')
    }
  }


  return (
    <div className='container'>
      <h1 className='h1'>Login</h1>
      <img className='img' src={require('./login.gif')} alt='login' />
      <div className='form'>
        <form onSubmit={loginUser}>
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="Email"/>
          <br />
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Password"/>
          <br />
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
           pauseOnHover theme="light" />
          <input className="submitBtn" type="submit" value="Login"/>
        </form>
      </div>
      
    </div>
          

  );
}

export default App;