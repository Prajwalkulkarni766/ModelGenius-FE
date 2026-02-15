import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import ModelTabs from '../components/model/ModelTabs';
import AIAgent from '../components/model/AIAgent';
import ExportModel from '../components/model/ExportModel';
import Dataset from '../components/model/Dataset';
import ModelDetailsView from '../components/model/Detail';
import EditModelModal from '../components/model/EditModelModal';
import CodeDisplay from '../components/model/CodeDisplay';
import { useParams, useNavigate } from 'react-router-dom';
import { getModelService, updateModelService, trainModelService, deleteModelService } from '../services/modelService';
import { toast } from 'react-toastify';

const ModelInfo = () => {
    const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();
    const navigate = useNavigate();

    const [model, setModel] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [trainLoading, setTrainLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const fetchModel = async () => {
        if (!projectId || !modelId) return;
        setLoading(true);
        const response = await getModelService(projectId, modelId);
        if (response && response.data) {
            setModel(response.data);
            setError(null);
        } else {
            setError("Failed to load model details.");
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchModel();
    }, [projectId, modelId]);

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleSaveEdit = async (_id: string, updates: any) => {
        if (!projectId || !modelId) return;
        setLoading(true);
        const response = await updateModelService(projectId, modelId, updates);
        if (response) {
            toast.success("Model updated successfully");
            setEditModalOpen(false);
            fetchModel(); // Refresh data
        } else {
            toast.error("Failed to update model");
        }
        setLoading(false);
    };

    const handleTrain = async () => {
        if (!projectId || !modelId) return;
        setTrainLoading(true);
        const response = await trainModelService(projectId, modelId);
        if (response) {
            toast.success("Training started/completed successfully!");
            // Refresh to get new metrics
            fetchModel();
        } else {
            toast.error("Training failed.");
        }
        setTrainLoading(false);
    };

    const handleDelete = async () => {
        if (!projectId || !modelId) return;
        if (window.confirm("Are you sure you want to delete this model?")) {
            setLoading(true);
            const response = await deleteModelService(projectId, modelId);
            if (response.requestStatus) {
                toast.success("Model deleted");
                navigate(`/projects/${projectId}`);
            } else {
                toast.error("Failed to delete model");
                setLoading(false);
            }
        }
    };

    const handleDownload = () => {
        toast.info("Download functionality coming soon!");
    };

    if (!model && !loading) {
        return (
            <Layout>
                <Typography color="error">Model not found.</Typography>
            </Layout>
        );
    }

    // Prepare components for tabs
    const modelDetails = (
        <ModelDetailsView
            model={model || {}}
            loading={loading}
            trainLoading={trainLoading}
            error={error}
            onTrain={handleTrain}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onDownload={handleDownload}
        />
    );

    const codeDisplay = model ? <CodeDisplay model={model} /> : null;

    return (
        <Layout>
            <Typography variant="h4" mb={2}>{model?.modelName || "Model Info"}</Typography>

            <ModelTabs
                modelInfo={modelDetails}
                dataset={<Dataset projectId={projectId || ""} model={model} onModelUpdate={fetchModel} />}
                code={codeDisplay}
                AIAgent={<AIAgent projectId={projectId || ""} modelId={modelId || ""} />}
                exportModel={<ExportModel projectId={projectId || ""} modelId={modelId || ""} modelName={model?.modelName || ""} modelPath={model?.modelPath} />}
            />

            <EditModelModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveEdit}
                model={model}
                loading={loading}
            />
        </Layout>
    );
};

export default ModelInfo;
