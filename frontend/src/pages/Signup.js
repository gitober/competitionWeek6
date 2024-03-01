import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const Signup = () => {
  const navigate = useNavigate();
  const { username, email, password, dob, phone, signup, isLoading, error, isAuthenticated, setIsAuthenticated, setError } = useSignup();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prevent multiple form submissions
    if (isFormSubmitting) {
      return;
    }

    setIsFormSubmitting(true);
    setError(null);

    try {
      // Check if required fields are not empty
      if (!dob.value || !phone.value) {
        throw new Error('Date of birth and phone number are required.');
      }

      const response = await signup(
        username.value,
        email.value,
        password.value,
        dob.value,
        phone.value
      );

      if (response && response.success) {
        setIsAuthenticated(true);
        navigate('/');
      } else {
        const serverError = response && response.error;
        setError(serverError ? serverError : 'Signup failed');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      setError(error.message || 'An error occurred during signup');
    } finally {
      setIsFormSubmitting(false);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" {...username} autoComplete="username" />
      </label>
      <label>
        Email:
        <input type="text" {...email} autoComplete="email" />
      </label>
      <label>
        Password:
        <input type="password" {...password} autoComplete="new-password" />
      </label>
      <label>
        Date of Birth:
        <input type="date" {...dob} />
      </label>
      <label>
        Phone:
        <input type="text" {...phone} />
      </label>

      {isLoading && <div className="loading">Signing up...</div>}
      {error && <div className="error">{error}</div>}
      {isAuthenticated && <div className="success">Signup successful!</div>}
      <button type="submit" disabled={isLoading}>Sign up</button>
    </form>
  );
};

export default Signup;
