import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginForm.css";
import AuthService from "../service/AuthService";
import jwt_decode from "jwt-decode";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");

  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password || !isValidEmail()) {
      setAlertMessage(
        "Veuillez remplir tous les champs du formulaire avant de procéder à l'enregistrement ou corriger les erreurs."
      );
      alert(
        "Veuillez remplir tous les champs du formulaire avant de procéder à l'enregistrement ou corriger les erreurs."
      );
    }
    const newUser = { email: email, password: password };

    try {
      const response = await AuthService.login(newUser);

      const decoded = jwt_decode(response.token); // ppppppppppppppppppppDecode the token

    
      if (
        decoded &&
        (decoded.Role === "admin" || decoded.Role === "employee")
      ) {
        if (decoded.Role === "admin") {
          window.location.href = "/F";
        } else if (decoded.Role === "employee") {
          window.location.href = "/prod";
        }
      } else {
        setAlertMessage(response.error || "Invalid role");
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
      setEmailError(
        "Veuillez entrer une adresse e-mail au format nom.prenom@wind.tn."
      );
    } else {
      setEmailError("");
    }
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

    if (e.target.value.length > 8) {
      setAlertMessage("Le mot de passe ne doit pas dépasser 8 caractères.");
      alert("Le mot de passe ne doit pas dépasser 8 caractères.");
    } else {
      setAlertMessage("");
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          alt="Logo"
          className="logo"
        />
        Wind Transport
      </header>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title-medium blue-title">Inscription</h2>
          {alertMessage && <p className="alert">{alertMessage}</p>}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              onBlur={validateEmail}
              placeholder="E-mail (nom.prenom@wind.tn)"
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

          <div className="button-container">
            <button type="submit" className="register-button">
              se connecter
            </button>

            <Link to="/Reset" className="forget-password-link">
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
