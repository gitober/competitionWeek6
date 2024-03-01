import { useState } from 'react';
import useField from './useField'; // Adjust the import path

const useLogin = () => {
  const username = useField('');
  const password = useField('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.value, password: password.value }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }

      const user = await response.json();

      sessionStorage.setItem("user", JSON.stringify(user));
      setIsLoading(false);
    } catch (error) {
      console.error('Error during login:', error.message);
      setError(error.message || 'An error occurred during login.');
      setIsLoading(false);
    }
  };

  return { username, password, login, isLoading, error };
};

export default useLogin;
