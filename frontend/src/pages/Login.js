import React, { useState } from 'react';
import { useLogin } from '../hooks/useLogin'; // Update import statement
import useField from '../hooks/useField';

const Login = ({ setIsAuthenticated }) => {
  // State variables to manage form fields
  const email = useField('');
  const password = useField('');
  const [error, setError] = useState(null);
  const { login, isLoading } = useLogin(); // Use the useLogin hook

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    try {
      // Call the login function from the useLogin hook
      await login(email.value, password.value);

      // Set user authentication status if login was successful
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Email:</label>
      <input
        type="text"
        {...email}
        autoComplete="username"
      />

      <label>Password:</label>
      <input
        type="password"
        {...password}
        autoComplete="current-password"
      />

      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading}>Log In</button> {/* Disable button during loading */}
    </form>
  );
};

export default Login;
