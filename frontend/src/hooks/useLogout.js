import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // Perform logout logic, e.g., clear local storage, remove tokens, etc.
    localStorage.removeItem('authToken');
    
    // Navigate to the login page
    navigate('/login');
  };

  return { logout };
};

export default useLogout;
