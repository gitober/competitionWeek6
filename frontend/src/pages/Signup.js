import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useSignup from '../hooks/useSignup';

const Signup = () => {
  const navigate = useNavigate();
  // Removed setIsAuthenticated from the destructured variables as it's not returned by useSignup
  const { username, email, password, dob, phone, signup, isLoading, error } = useSignup();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isFormSubmitting) return;

    setIsFormSubmitting(true);

    try {
      // Your validation logic here
      if (!username.value || !email.value || !password.value || !dob.value || !phone.value) {
        throw new Error('All fields are required.');
      }

      const response = await signup();
      
      // Assuming signup function directly updates isAuthenticated within the hook
      if (response && response.success) {
        // Optionally, redirect or perform additional actions upon successful signup
        navigate('/'); // Redirect to the homepage or dashboard as appropriate
      } else {
        // Handle server response error
        console.error('Signup failed:', response.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Signup failed:', error.message);
      // Assuming setError is meant to handle form submission errors
    } finally {
      setIsFormSubmitting(false);
    }
  };

  // Basic form structure
  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <form className="signup" onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" {...username} autoComplete="username" />
          </label>
          <label>
            Email:
            <input type="email" {...email} autoComplete="email" />
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
            <input type="tel" {...phone} />
          </label>
          
          {error && <div className="error">{error}</div>}
          <button type="submit" disabled={isLoading || isFormSubmitting}>Sign up</button>
        </form>
      )}
    </div>
  );
};

export default Signup;
