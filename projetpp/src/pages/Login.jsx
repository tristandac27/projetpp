import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Response:', response.data);

      if (response.data.token) {
        // Stocker le token dans le localStorage
        localStorage.setItem('token', response.data.token);
        // Stocker les informations de l'utilisateur dans le localStorage
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/'); // Redirigez vers la page d'accueil
      } else {
        setError('Erreur de connexion: Token non reçu');
      }
    } catch (error) {
      setError('Email ou mot de passe incorrect');
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>Vous n'avez pas de compte ? <Link to="/register">Créer un compte</Link></p>
    </div>
  );
};

export default Login;
