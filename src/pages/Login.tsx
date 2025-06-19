import { Box } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
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
