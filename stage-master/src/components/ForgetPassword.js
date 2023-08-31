import React, { useState } from 'react';
import './ForgetPassword.css';
import axios from 'axios';
import AuthService from '../service/AuthService';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setAlertMessage('Veuillez fournir une adresse e-mail valide au format nom.prenom@wind.tn.');
    } else {
      try {
        // Send a request to the backend API for password reset
        const response = await axios.post('/api/reset-password', { email });
        if (response.data.success) {
          setAlertMessage('Demande de réinitialisation de mot de passe envoyée !');
        } else {
          setAlertMessage('Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe.');
        }
      } catch (error) {
        setAlertMessage('Une erreur s\'est produite lors de la demande de réinitialisation du mot de passe.');
      }
    }
  };

  // Remove the email format validation by always returning true
  const isValidEmail = () => {
    return true;
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (e.target.value && !isValidEmail()) {
      setEmailError('Veuillez entrer une adresse e-mail valide au format nom.prenom@wind.tn.');
    } else {
      setEmailError('');
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
          <h2 className="title-medium blue-title">Inscription</h2>
          {alertMessage && <p className="form-alert">{alertMessage}</p>}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="E-mail (nom.prenom@wind.tn)"
              required
              className="input1"
            />
          </label>
          {emailError && <p className="error">{emailError}</p>}
          <br />
          <div className="button-container">
            <button type="submit" className="register-button">
              Reinitialisation password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
