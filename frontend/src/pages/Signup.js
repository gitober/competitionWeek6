import React from 'react';
import useSignup from '../hooks/useSignup';
import { useField } from '../hooks/useField';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  // Initialize form fields using the useField hook
  const usernameField = useField('text');
  const emailField = useField('email');
  const passwordField = useField('password');
  const dateOfBirthField = useField('date');
  const phoneNumberField = useField('text');

  // Access the navigation function from React Router
  const navigate = useNavigate();

  // Use the useSignup hook to manage signup functionality
  const { signup, isLoading, error } = useSignup('/api/register'); // Pass your signup endpoint

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare user data from form fields
    const userData = {
      username: usernameField.value,
      email: emailField.value,
      password: passwordField.value,
      date_of_birth: dateOfBirthField.value,
      phone_number: phoneNumberField.value,
    };

    try {
      // Call the signup function from the useSignup hook
      const user = await signup(userData);

      if (user) {
        console.log('Signup successful:', user);
        // Navigate to the login page upon successful signup
        navigate('/login');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>Sign Up</h3>
      {/* Render input fields using spread attributes from useField */}
      <label>Username:</label>
      <input {...usernameField} />
      <label>Email address:</label>
      <input {...emailField} />
      <label>Password:</label>
      <input {...passwordField} />
      <label>Date of birth:</label>
      <input {...dateOfBirthField} />
      <label>Phone number:</label>
      <input {...phoneNumberField} />
      {/* Disable the button when the form is submitting */}
      <button type="submit" disabled={isLoading}>
        Sign up
      </button>
      {/* Display error message if there's an error */}
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
