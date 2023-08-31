import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthService from '../service/AuthService';


import './RegistreForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!username || !email || !password || !isValidEmail() || !role) {
      setAlertMessage(
        'Veuillez remplir tous les champs du formulaire avant de procéder à l\'enregistrement ou corriger les erreurs.'
      );
      alert(
        'Veuillez remplir tous les champs du formulaire avant de procéder à l\'enregistrement ou corriger les erreurs.'
      );
    } 
    const newUser = { username:username,email: email, password: password , Role:role};


    try {
      const response = await AuthService.registre(newUser);
      if(response.success){
      window.location.href = "/login"; 
      }else {

        setAlertMessage(
          response.message
        );
      }

    } catch (error) {
      console.log(error);

    }
  };

  const isValidEmail = () => {
    const emailRegex = /^[a-zA-Z]+\.[a-zA-Z]+@wind\.tn$/;
    return emailRegex.test(email);
  };

  const validateEmail = () => {
    if (!isValidEmail()) {
      setEmailError('Veuillez entrer une adresse e-mail au format nom.prenom@wind.tn.');
   
    } else {
      setEmailError('');
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
   
   
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length > 8) {
      setAlertMessage('Le mot de passe ne doit pas dépasser 8 caractères.');
      alert('Le mot de passe ne doit pas dépasser 8 caractères.');
    } else {
      setAlertMessage('');
    }
  };

  return (
    <div className="form-container">
    



  <header className="form-header">
    <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="logo" />
    Wind Transport
  </header>



  
      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title-medium blue-title">Registration</h2>

          {alertMessage && <p className="alert ">{alertMessage}</p>}
          <label>
            Username:
            <input

              type="text"
              value={username}
              placeholder="Nom d'utilisateur"
              required
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
            />
          </label>
          <br />
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={validateEmail}
              placeholder="E-mail(nom.prenom@wind.tn)"
              required
              className="input1"
            />
          </label>
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Mot de passe (8 caractères exactement)"
              minLength={8}
              required
              className="form-input"
            />
          </label>
          <br />
          <label>
            Role:
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="input2"
              required
            >
              <option value="">Sélectionnez un rôle</option>
              <option value="employee">Employé</option>
              <option value="admin">Administrateur</option>
            </select>
          </label>
          <br />
          <div className="button-container">
            <Link to="/login" className="login-link">
              <button type="submit" className="login-button">
                Se connecter
              </button>
            </Link>
            <button type="submit" className="register-button">
              S'inscrire
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;