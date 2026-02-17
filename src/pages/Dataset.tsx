import { Box, Typography, IconButton } from '@mui/material';
import Layout from '../layouts/Layout';
import UploadDataset from '../components/dataset/UploadDataset';
import { useParams, Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Dataset = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <Layout>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
          <IconButton component={Link} to={`/projects/${projectId}`}>
              <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">Upload your data</Typography>
      </Box>
      <Typography mb={5}>Drag and drop your data file here, or browse to select a CSV or XLSX</Typography>

      {projectId !== undefined && <Box mt={5}>
        <UploadDataset projectId={projectId} />
      </Box>
      }
    </Layout>
  );
};

export default Dataset;
