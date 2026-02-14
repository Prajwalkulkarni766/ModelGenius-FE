import { Box, Paper } from '@mui/material';
import LoginForm from '../components/auth/LoginForm';

const Login = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backgroundAttachment: 'fixed',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          maxWidth: 420,
          width: '100%',
          borderRadius: 3,
          mx: 2,
        }}
      >
        <LoginForm />
      </Paper>
    </Box>
  );
};

export default Login;
