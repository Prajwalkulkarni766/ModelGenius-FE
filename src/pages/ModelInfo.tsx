import { useEffect, useState } from 'react';
import { Typography, Box, IconButton } from '@mui/material';
import Layout from '../layouts/Layout';
import ModelTabs from '../components/model/ModelTabs';
import AIAgent from '../components/model/AIAgent';
import ExportModel from '../components/model/ExportModel';
import Dataset from '../components/model/Dataset';
import ModelDetailsView from '../components/model/Detail';
import EditModelModal from '../components/model/EditModelModal';
import CodeDisplay from '../components/model/CodeDisplay';
import ConfirmDialog from '../components/ConfirmDialog';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getModelService, updateModelService, trainModelService, deleteModelService } from '../services/modelService';
import { useSnackbar } from '../hooks/useSnackbar';
import { useAsyncAction } from '../hooks/useAsyncAction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const ModelInfo = () => {
    const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const { execute: executeAction, loading } = useAsyncAction();
    const { execute: executeTrain, loading: trainLoading } = useAsyncAction();

    const [model, setModel] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const fetchModel = async () => {
        if (!projectId || !modelId) return;
        await executeAction(async () => {
            const response = await getModelService(projectId, modelId);
            if (response && response.data) {
                setModel(response.data);
                setError(null);
            } else {
                setError("Failed to load model details.");
                showSnackbar("Failed to load model details.", "error");
            }
        });
    };

useEffect(() => {
        let cancelled = false;

        const load = async () => {
            if (!projectId || !modelId) return;
            await executeAction(async () => {
                const response = await getModelService(projectId, modelId);
                if (!cancelled) {
                    if (response?.data) {
                        setModel(response.data);
                        setError(null);
                    } else {
                        setError("Failed to load model details.");
                        showSnackbar("Failed to load model details.", "error");
                    }
                }
            });
        };

        load();
        return () => { cancelled = true; };
    }, [projectId, modelId]);

    const handleEdit = () => {
        setEditModalOpen(true);
    };

    const handleSaveEdit = async (_id: string, updates: any) => {
        if (!projectId || !modelId) return;
        await executeAction(async () => {
            const response = await updateModelService(projectId, modelId, updates);
            if (response) {
                showSnackbar("Model updated successfully", "success");
                setEditModalOpen(false);
                fetchModel();
            } else {
                showSnackbar("Failed to update model", "error");
            }
        });
    };

    const handleTrain = async () => {
        if (!projectId || !modelId) return;
        await executeTrain(async () => {
            const response = await trainModelService(projectId, modelId);
            if (response) {
                showSnackbar("Training started/completed successfully!", "success");
                fetchModel();
            } else {
                showSnackbar("Training failed.", "error");
            }
        });
    };

    const handleDelete = async () => {
        if (!projectId || !modelId) return;
        await executeAction(async () => {
            const response = await deleteModelService(projectId, modelId);
            if (response.requestStatus) {
                showSnackbar("Model deleted", "success");
                navigate(`/projects/${projectId}`);
            } else {
                showSnackbar("Failed to delete model", "error");
            }
        });
    };

    const openDeleteDialog = () => setDeleteDialogOpen(true);
    const closeDeleteDialog = () => setDeleteDialogOpen(false);

    const handleDownload = () => {
        showSnackbar("Download functionality coming soon!", "info");
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
            onDelete={openDeleteDialog}
            onEdit={handleEdit}
            onDownload={handleDownload}
        />
    );

    const codeDisplay = model ? <CodeDisplay model={model} /> : null;

    return (
        <Layout>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
                <IconButton component={Link} to={`/projects/${projectId}`}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4">{model?.modelName || "Model Info"}</Typography>
            </Box>

            <ModelTabs
                modelInfo={() => modelDetails}
                dataset={() => <Dataset projectId={projectId || ""} model={model} onModelUpdate={fetchModel} />}
                code={() => codeDisplay}
                AIAgent={() => <AIAgent projectId={projectId || ""} modelId={modelId || ""} />}
                exportModel={() => <ExportModel projectId={projectId || ""} modelId={modelId || ""} modelName={model?.modelName || ""} modelPath={model?.modelPath} />}
            />

            <EditModelModal
                open={editModalOpen}
                onClose={() => setEditModalOpen(false)}
                onSave={handleSaveEdit}
                model={model}
                loading={loading}
            />

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Model"
                message={`Are you sure you want to delete "${model?.modelName || 'this model'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                onConfirm={() => {
                    closeDeleteDialog();
                    handleDelete();
                }}
                onCancel={closeDeleteDialog}
            />
        </Layout>
    );
};

export default ModelInfo;
