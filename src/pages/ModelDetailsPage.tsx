// src/pages/ModelDetails.tsx
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ModelDetailsView from "../components/model/Detail";
import RetrainTab from '../components/model/RetrainTab';
import { getModelService, deleteModelService, trainModelService, updateModelService } from "../services/modelService";
import CodeDisplay from '../components/model/CodeDisplay';
import Layout from '../layouts/Layout';
import ModelTabs from '../components/model/ModelTabs';
import AIAgent from '../components/model/AIAgent';
import ExportModel from '../components/model/ExportModel';
import Dataset from '../components/model/Dataset';
import { Typography, Box, IconButton } from '@mui/material';
import { useSnackbar } from '../hooks/useSnackbar';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmDialog from "../components/ConfirmDialog";
import EditModelModal from "../components/model/EditModelModal";

const ModelDetails = () => {
  const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

  const [model, setModel] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [trainLoading, setTrainLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  const fetchModel = async () => {
    if (!projectId || !modelId) return;
    try {
      const res = await getModelService(projectId, modelId);
      if (res?.data) {
        setModel(res.data);
      }
    } catch (err) {
      setError("Failed to load model details");
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
    let cancelled = false;

    const load = async () => {
      if (!projectId || !modelId) return;
      try {
        const res = await getModelService(projectId, modelId);
        if (!cancelled && res?.data) {
          setModel(res.data);
        }
      } catch (err) {
        if (!cancelled) setError("Failed to load model details");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, [projectId, modelId]);

  const handleTrain = async () => {
    setTrainLoading(true);
    try {
      if (projectId && modelId) {
        const res = await trainModelService(projectId, modelId);
        if (res?.data) {
          setModel({ ...model, metrics: res.data });
          showSnackbar("Training completed successfully!", "success");
        }
      }
    } catch (err) {
      setError("Training failed");
      showSnackbar("Training failed.", "error");
    } finally {
      setTrainLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      if (projectId && modelId) {
        await deleteModelService(projectId, modelId);
        showSnackbar("Model deleted successfully!", "success");
        navigate(`/projects/${projectId}`);
      }
    } catch (err) {
      setError("Delete failed");
      showSnackbar("Failed to delete model.", "error");
    }
  };

  const handleEdit = () => {
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (id: string, updates: any) => {
    setEditLoading(true);
    try {
      if (projectId) {
        const res = await updateModelService(projectId, id, updates);
        if (res?.data) {
          setModel(res.data);
          showSnackbar("Model updated!", "success");
        }
      }
    } catch {
      showSnackbar("Update failed.", "error");
    } finally {
      setEditLoading(false);
      setEditDialogOpen(false);
    }
  };

  const openDeleteDialog = () => setDeleteDialogOpen(true);
  const closeDeleteDialog = () => setDeleteDialogOpen(false);

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
      onDownload={() => {
        if (model?.modelPath) {
          window.open(model.modelPath, "_blank");
        }
      }}
    />
  );

  const retrainTab = model && projectId ? (
    <RetrainTab model={model} projectId={projectId} />
  ) : null;

  const codeDisplay = model ? <CodeDisplay model={model} /> : null;

  return (
    <Layout>
      <Box display="flex" alignItems="center" gap={1} pl={2} sx={{ position: 'sticky', top: 0, bgcolor: 'background.default', zIndex: 10, py: 2, mb: 0 }}>
          <IconButton component={Link} to={`/projects/${projectId}`}>
              <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4">{model?.modelName || "Model Info"}</Typography>
      </Box>

      <ModelTabs
        modelInfo={modelDetails}
        retrainTab={retrainTab}
        dataset={<Dataset projectId={projectId || ""} model={model} onModelUpdate={fetchModel} />}
        code={codeDisplay}
        AIAgent={<AIAgent projectId={projectId || ""} modelId={modelId || ""} />}
        exportModel={<ExportModel
          projectId={projectId || ""}
          modelId={modelId || ""}
          modelName={model?.modelName || "model"}
          modelPath={model?.modelPath}
        />}
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

      <EditModelModal
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        onSave={handleSaveEdit}
        model={model}
        loading={editLoading}
      />
    </Layout>
  );
};

export default ModelDetails;
