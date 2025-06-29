import { Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/home');
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        component="div"
        sx={{
          p: 4,
          maxWidth: '360',
        }}
      >
        <LoginForm />
      </Box>
    </Box>
  );
};

export default Login;
