import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const authToken = data.token;

        if (authToken) {
          localStorage.setItem('authToken', authToken); 
          setIsLoading(false);
          navigate('/home'); 
          return true;
        } else {
          const data = await response.json();
          console.error('Login failed:', data.error || 'Invalid token received');
          throw new Error('Invalid token received');
        }
      } else {
        const data = await response.json();
        throw new Error(data.message || 'Login failed');
      }
    } catch (error) {
      setError(error.message || 'An error occurred during login');
      return false; 
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
};

export default useLogin;
