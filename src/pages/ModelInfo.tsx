import { Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ModelTabs from '../components/model/ModelTabs';
import PivotedTable from '../components/model/PivotedTable';
import AIAgent from '../components/model/AIAgent';
import ExportModel from '../components/model/ExportModel';
import Dataset from '../components/model/Dataset';

const ModelInfo = () => {
    return (
        <Layout>
            <Typography variant="h4" mb={2}>Model name</Typography>
            <ModelTabs modelInfo={<PivotedTable />} AIAgent={<AIAgent />} exportModel={<ExportModel />} dataset={<Dataset />} />
        </Layout>
    );
};

export default ModelInfo;
