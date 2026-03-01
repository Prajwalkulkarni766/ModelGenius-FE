import { Box, Typography, Button } from '@mui/material';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useNavigate } from 'react-router';
import Layout from '../layouts/Layout';

const ComingSoon = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <Layout>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        gap={2}
      >
        <HourglassEmptyIcon sx={{ fontSize: 80, color: 'text.secondary' }} />
        <Typography variant="h4" fontWeight={600}>
          Coming Soon
        </Typography>
        <Typography variant="body1" color="text.secondary" textAlign="center">
          AI Agents feature is under development.
          <br />
          Stay tuned for updates!
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          sx={{ mt: 1 }}
          onClick={handleGoBack}
        >
          Go Back
        </Button>
      </Box>
    </Layout>
  );
};

export default ComingSoon;
