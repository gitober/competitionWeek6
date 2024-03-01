import { useState } from 'react';
import useField from '../hooks/useField';

const useSignup = () => {
  const username = useField('');
  const email = useField('');
  const password = useField('');
  const dob = useField('');
  const phone = useField('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const signup = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          email: email.value,
          password: password.value,
          date_of_birth: dob.value,
          phone_number: phone.value,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const user = await response.json();

        // Assuming the backend sends an authentication token
        const authToken = user.token;

        // Store the token in localStorage
        localStorage.setItem('authToken', authToken);

        setIsAuthenticated(true);
      }

      setIsLoading(false);
      return { success: true };
    } catch (error) {
      console.error('Error during signup:', error);
      setError(error.message || 'An error occurred during signup.');
      setIsAuthenticated(false);
      setIsLoading(false);
      return { success: false, error: error.message || 'An error occurred during signup.' };
    }
  };

  return { username, email, password, dob, phone, signup, isLoading, error, isAuthenticated, setIsAuthenticated, setError }; // Return setIsAuthenticated function
};

export default useSignup;
