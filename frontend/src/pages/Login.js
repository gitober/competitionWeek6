import React from 'react';
import useLogin from '../hooks/useLogin';
import useField from '../hooks/useField';

const Login = ({ setIsAuthenticated }) => {
  const username = useField('');
  const password = useField('');
  const { login, isLoading, error } = useLogin();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await login(username.value, password.value);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>

      <label>Username:</label>
      <input
        type="text"
        {...username}
        autoComplete="username"
      />

      <label>Password:</label>
      <input
        type="password"
        {...password}
        autoComplete="current-password"
      />

      {error && <div className="error">{error}</div>}
      <button type="submit" disabled={isLoading}>
        Log In
      </button>
    </form>
  );
};

export default Login;
