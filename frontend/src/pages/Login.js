import React from 'react';
import { useField } from '../hooks/useField';
import { useNavigate } from 'react-router-dom';
import useLogin from '../hooks/useLogin';

const Login = () => {
  const usernameField = useField('text');
  const passwordField = useField('password');
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const success = await login(usernameField.value, passwordField.value, navigate);
      if (success) {
        console.log('Login successful');
        console.log(localStorage.getItem('authToken')); 
        navigate('/home')
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Username:</label>
      <input {...usernameField} />
      <label>Password:</label>
      <input {...passwordField} />

      <button type="submit" disabled={isLoading}>{isLoading ? 'Logging in...' : 'Log in'}</button>
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </form>
  );
};

export default Login;
