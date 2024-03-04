import { useState } from 'react';

const useSignup = (url) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const signup = async (userData) => {
    try {
      setIsLoading(true);
      setError(null);

      console.log('Sending request to:', url); // Log the URL
      console.log('Request body:', JSON.stringify(userData)); // Log the request body

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      console.log('Response status:', response.status); // Log the response status

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Signup failed: ${errorText}`);
      }

      const data = await response.json();
      console.log('Response data:', data); // Log the response data
      return data;
    } catch (error) {
      console.error('Error during signup:', error); // Log the error
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, error, isLoading };
};

export default useSignup;