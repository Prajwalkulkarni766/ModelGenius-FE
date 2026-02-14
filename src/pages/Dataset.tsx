import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import UploadDataset from '../components/dataset/UploadDataset';
import { useParams } from 'react-router-dom';

const Dataset = () => {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <Layout>
      <Typography variant="h4">Upload your data</Typography>
      <Typography mb={5}>Drag and drop your data file here, or browse to select a CSV or XLSX</Typography>

      {projectId !== undefined && <Box mt={5}>
        <UploadDataset projectId={projectId} />
      </Box>
      }
    </Layout>
  );
};

export default Dataset;
