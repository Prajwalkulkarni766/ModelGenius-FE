import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Paper,
  Grid,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Alert
} from '@mui/material';
import { getDatasetService, getDatasetPreviewService } from '../../services/datasetService';
import { setModelDatasetsService } from '../../services/modelService';
import { Dataset as DatasetType } from '../../types/Dataset';
import { toast } from 'react-toastify';

interface DatasetProps {
  projectId: string;
  model: any;
  onModelUpdate?: () => void;
}

const Dataset: React.FC<DatasetProps> = ({ projectId, model, onModelUpdate }) => {
  const [datasets, setDatasets] = useState<DatasetType[]>([]);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<any[]>([]);
  const [loadingDatasets, setLoadingDatasets] = useState(false);
  const [loadingPreview, setLoadingPreview] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchDatasets();
  }, [projectId]);

  useEffect(() => {
    // If model has a dataset, select it by default if available
    // However, model object might not have datasetId directly accessible or named differently (backend specific).
    // Assuming model.datasetId or similar. If not, we just rely on user selection.
    // Based on Detail.tsx, model has datasetName.
    // If we want to auto-select, we need to match name or fetch full model details if not present.
    // For now, let's just let user select.
  }, [model]);

  const fetchDatasets = async () => {
    if (!projectId) return;
    setLoadingDatasets(true);
    const res = await getDatasetService(projectId);
    if (res && res.data) {
      setDatasets(res.data);
    }
    setLoadingDatasets(false);
  };

  const handleSelectDataset = async (id: string) => {
    setSelectedDatasetId(id);
    setPreviewData([]);

    // Fetch preview
    setLoadingPreview(true);
    const res = await getDatasetPreviewService(projectId, id);
    if (res && res.data) {
      setPreviewData(res.data);
    }
    setLoadingPreview(false);
  };

  const handleSetDataset = async () => {
    if (!projectId || !model?._id || !selectedDatasetId) return;

    setSaving(true);
    const res = await setModelDatasetsService(projectId, model._id, selectedDatasetId);
    if (res && res.data) {
      toast.success("Dataset assigned to model successfully!");
      if (onModelUpdate) onModelUpdate();
    } else {
      toast.error("Failed to assign dataset.");
    }
    setSaving(false);
  };

  return (
    <Box p={3} height="100%">
      <Grid container spacing={3} height="100%">
        {/* Left Sidebar: Dataset List */}
        <Grid size={{ xs: 12, md: 3 }} sx={{ borderRight: 1, borderColor: 'divider' }}>
          <Typography variant="h6" gutterBottom>Datasets</Typography>
          {loadingDatasets ? (
            <CircularProgress size={20} />
          ) : (
            <List sx={{ maxHeight: '70vh', overflow: 'auto' }}>
              {datasets.map((d) => (
                <ListItem key={d._id} disablePadding>
                  <ListItemButton
                    selected={selectedDatasetId === d._id}
                    onClick={() => handleSelectDataset(d._id)}
                  >
                    <ListItemText
                      primary={d.originalFileName}
                      secondary={new Date(d.createdAt || "").toLocaleDateString()}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
              {datasets.length === 0 && (
                <Typography color="textSecondary" variant="body2">No datasets found.</Typography>
              )}
            </List>
          )}
        </Grid>

        {/* Right Content: Preview */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">
              {selectedDatasetId ? "Dataset Preview" : "Select a Dataset"}
            </Typography>
            {selectedDatasetId && (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSetDataset}
                disabled={saving}
              >
                {saving ? "Saving..." : "Set as Model Dataset"}
              </Button>
            )}
          </Box>

          {loadingPreview ? (
            <Box display="flex" justifyContent="center" mt={4}>
              <CircularProgress />
            </Box>
          ) : previewData.length > 0 ? (
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
              <TableContainer sx={{ maxHeight: '65vh' }}>
                <Table stickyHeader size="small">
                  <TableHead>
                    <TableRow>
                      {Object.keys(previewData[0]).map((key) => (
                        <TableCell key={key} sx={{ fontWeight: 'bold' }}>{key}</TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {previewData.map((row, idx) => (
                      <TableRow key={idx} hover>
                        {Object.values(row).map((val: any, i) => (
                          <TableCell key={i}>{String(val)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Box p={1}>
                <Typography variant="caption" color="textSecondary">
                  Showing first {previewData.length} rows.
                </Typography>
              </Box>
            </Paper>
          ) : selectedDatasetId ? (
            <Alert severity="info">No preview data available or empty file.</Alert>
          ) : (
            <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
              <Typography color="textSecondary">Please select a dataset from the list to view preview.</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dataset;