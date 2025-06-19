import { Box } from '@mui/material';
import SignupForm from '../components/auth/SignupForm';

const Signup = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Box
        component="div"
        sx={{
          p: 4,
          maxWidth: '360',
        }}
      >
        <SignupForm />
      </Box>
    </Box>
  );
};

export default Signup;
