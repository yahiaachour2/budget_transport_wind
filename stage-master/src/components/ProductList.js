import React, { useState, useEffect } from 'react';
import './FinancierForm.css';
import AuthService from '../service/AuthService';
import productService from '../service/productService';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('credit'); // Default type is credit
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const payload = {}; // You can fill in this variable with query parameters if needed
        const data = await AuthService.allproduct(payload);
        setProducts(data); // Store the retrieved data in the 'products' state
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData(); // Call the function to fetch products when the component mounts
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const product = {
      type: type,
      description: description,
      montant: amount,
      productId: selectedProductId, // Use the selected product's ID from the state
    };

    try {
      const response = await productService.createproduct(product);
      console.log(response);
      if (response) {
        setSuccessMessage('Transaction ajoutée avec succès.');
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
          <h2 className="title-medium blue-title">Formulaire Financier</h2>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

        
        

          {/* Display the table with all product attributes */}
          <table className="product-table">
            <thead>
              <tr>
               
                <th>referance employe</th>
              <th>Name </th>
                <th>Type</th>
                <th>Description</th>
                <th>Montant</th>
                <th>Solde Actuel</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                
                  <td>{product.User.id}</td> {/* ID de l'utilisateur associé */}
                <td>{product.User.username}</td> {/* Nom d'utilisateur de l'utilisateur associé */}
                  <td>{product.type}</td>
                  <td>{product.description}</td>
                  <td>{product.montant}</td>
                  <td>{product.soldeActuel}</td>
                 
                </tr>
              ))}
            </tbody>
          </table>

         
        </form>
      </div>
    </div>
  );
};

export default ProductList;
