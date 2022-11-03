import {useState} from 'react';
import { useNavigate } from "react-router-dom";
import './page.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const navigate = useNavigate(); 
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()
    
     const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',  
      headers: {
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
        name,
        email,
        password,
      }), 
    })

    const data = await response.json()

    //console.log(data);
    
    if(data.status === 'ok'){
      toast.info(`Please login`);
      window.location.href ("/");
    }
    
  }


  return (
    <div className='container'>
      <h1 className='h1'>Register</h1>
      <img className='img' src={require('./di.gif')} alt='login' />
      <div className='form'>
        <form onSubmit={registerUser}>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)}
          type="text" placeholder="Name"/>
          <br />
          <input className="input" value={email} onChange={(e) => setEmail(e.target.value)}
          type="email" placeholder="Email"/>
          <br />
          <input className="input" value={password} onChange={(e) => setPassword(e.target.value)}
          type="password" placeholder="Password"/>
          <br />
          <ToastContainer position="top-right" autoClose={20000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
           pauseOnHover theme="light" />
          <input className='submitBtn' type="submit" value="Register"/>
        </form>
      </div>
    </div>

  );
}

export default App;