import React from 'react';
import './Wind.css';
import { Link } from 'react-router-dom';

const wind = () => {
  return (
  <div className="Register">
    <div className="card">
        <div className="left">
             <h1>WinD .</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
              <span> Do you have an account?</span> 
              <Link to="/login">
              <button >Sign in</button>
              </Link>
          </div>
          <div className="right">
          <h1>Register</h1>
          <form>
            <input type="text" placeholder="Usersname"/>
            <input type="email" placeholder="email"/>
            <input type="password" placeholder="Password"/>

            
            <Link to="/">
            <button >Sign up</button>
            </Link>


          </form>
          </div>  
      </div>    
    </div>
  )
}

export default wind;
