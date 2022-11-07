import './page.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function History() {
  const navigate = useNavigate()
  const [cities, setCity] = useState([])
  //console.log(cities)
  //console.log(cities.cities[0].city)
  

  const getHistory = async(e) => {

     const response = await fetch('http://localhost:5000/api/search', {
      method:'POST',
      headers: {
        "Content-Type": "application/json",
        'x-access-email': localStorage.getItem('email'), 
      }
     });

     const data = await response.json();
   
  

     if(data.status === 'ok') {
      setCity(data)
      //console.log("data added")
     }
     else{
      //console.log("error")
     }
  }


  async function onDelete(event) {
    event.preventDefault()
    const response = await fetch('http://localhost:5000/api/delete', {
        method: 'POST',
        headers : {
          "Content-Type": "application/json"
        },
        body: JSON.stringify ({
          city: cities.cities[0].city,
          email: cities.cities[0].email
        })
      });
  
      const data = await response.json();
      console.log(data.cities)
      if(data.status ==='ok'){
        console.log("data delete")
        toast.info("Delete the latest location")
        window.location.href('/search')
      }
      else {
        console.log("data error")
      }

  }


  async function logoutUser(event){
    event.preventDefault()

    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    toast.success(`Logout successful.`);
    window.location.href='/';
    
  }  
  
   useEffect(() => {
    const email = localStorage.getItem('email')
    if(!email){
        console.log('Invalid email')
    } else{
        getHistory() 
    }
  }, [])
  
  return (
    <div className="containers">
      <div className="left-col">
        Search History
      </div>
      
      <div className="center-col">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope='col'>Email</th>
              <th scope="col">Location</th>
            </tr>
          </thead>
          <tbody>
            {
              cities.cities.map((element,id) => {
                return(
                  <>
                  <tr key={element}>
                    <th scope="row">{id + 1}</th>
                    <td>{element.email}</td>
                    <td>{element.city}</td>
                  </tr>
                  </>
                )
              })
            }
            {/* <tr>
              <th scope="row">1</th>
              <td>{cities.cities[0].email}</td>
              <td>{cities.cities[0].city}</td>
              <td>
                <input className="btn btn-danger" type="submit" value="X"/>
              </td>
            </tr> */}
          </tbody>
        </table>        
      </div>   

      <div className='form'>
        <form onSubmit={logoutUser}>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable
           pauseOnHover theme="light" />
          <input className="button-6" type="submit" value="Logout"/>
          <input className="button-6" onClick = {onDelete} type="submit" value="Delete Latest"/>
        </form>
      </div>
  </div>
  


  );
}
