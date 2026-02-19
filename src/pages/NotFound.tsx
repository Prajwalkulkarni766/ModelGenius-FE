import { Box, Typography, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router';

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      gap={2}
    >
      <ErrorOutlineIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
      <Typography variant="h4" fontWeight={600}>
        404 - Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" textAlign="center">
        The page you're looking for doesn't exist or has been moved.
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 1 }}
        onClick={handleGoHome}
      >
        Go Home
      </Button>
    </Box>
  );
};

export default NotFound;
