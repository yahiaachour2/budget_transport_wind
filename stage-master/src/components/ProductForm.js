import React, { useState, useEffect } from 'react';
import './FinancierForm.css';
import AuthService from '../service/AuthService';
import productService from '../service/productService';

const ProductForm = () => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('debit'); // Default type is debit
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {}; // You can fill in this variable with query parameters if needed
        const data = await AuthService.alluser(payload);
        setUsers(data); // Store the retrieved data in the 'users' state
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchData(); // Call the function to fetch users when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      type: type,
      description: description,
      montant: amount,
      UserId: selectedUserId, // Use the selected user's ID from the state
    };

    try {
      const response = await productService.createproduct(product);
      console.log(response)
      if (response) {
        setSuccessMessage('Transaction ajoutée avec succès.');
        window.location.href = "/List"; 
      }

    } catch (error) {
      console.error('Error adding transaction:', error);
      setErrorMessage('Erreur lors de l\'ajout de la transaction.');
    }
  };

  return (
    <div className="form-container">
      <header className="form-header">
        <img src={process.env.PUBLIC_URL + '/logo.png'} alt="Logo" className="logo" />
        Wind Transport
      </header>
      <div className="form-content">
        <form onSubmit={handleSubmit} className="form">
          <h2 className="title-medium blue-title">Formulaire product</h2>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}



          <div className="form-group">
            <label>Employer:</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="input2"
              required
            >
              <option value="">Select a user</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Montant (Dinars) :</label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="input"
              required
            />
          </div>
       

         
             
           
          <button type="submit" className="register-button">
            Valider
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
