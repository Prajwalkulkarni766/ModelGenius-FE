
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
  Divider
} from "@mui/material";
import { trainDryRunService, updateModelService, trainModelService } from "../../services/modelService";
import MetricsCard from "../wizard/MetricsCard";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SaveIcon from '@mui/icons-material/Save';
import ScienceIcon from '@mui/icons-material/Science';
import TuneIcon from '@mui/icons-material/Tune';
import { useSnackbar } from "../../hooks/useSnackbar";

interface RetrainTabProps {
  model: any;
  projectId: string;
}

const RetrainTab: React.FC<RetrainTabProps> = ({ model, projectId }) => {
  const [formData, setFormData] = useState({
    algorithm: "",
    handlingMissingValueStrategy: "",
    encodingCategoricalMethod: "",
    normalizationTechnique: "",
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    if (model) {
      setFormData({
        algorithm: model.algorithm || "",
        handlingMissingValueStrategy: model.handlingMissingValueStrategy || "",
        encodingCategoricalMethod: model.encodingCategoricalMethod || "",
        normalizationTechnique: model.normalizationTechnique || "",
      });
    }
  }, [model]);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRetrain = async () => {
    setLoading(true);
    setError(null);
    setResults(null);
    try {
      const res = await trainDryRunService(projectId, model._id, formData);
      if (res && res.data) {
        setResults(res.data);
        showSnackbar("Dry run completed successfully!", "success");
      } else {
        setError("Retraining failed. Please try again.");
        showSnackbar("Retraining failed. Please try again.", "error");
      }
    } catch (err) {
      setError("An error occurred during retraining.");
      showSnackbar("An error occurred during retraining.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      const updateRes = await updateModelService(projectId, model._id, {
        algorithm: formData.algorithm,
        handlingMissingValueStrategy: formData.handlingMissingValueStrategy,
        encodingCategoricalMethod: formData.encodingCategoricalMethod,
        normalizationTechnique: formData.normalizationTechnique,
      });

      if (!updateRes) {
        throw new Error("Failed to update model configuration.");
      }

      const trainRes = await trainModelService(projectId, model._id);

      if (trainRes && trainRes.data) {
        setResults(trainRes.data);
        showSnackbar("Model saved and trained successfully!", "success");
      } else {
        throw new Error("Failed to save and train model.");
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during saving.");
      showSnackbar(err.message || "An error occurred during saving.", "error");
    } finally {
      setLoading(false);
    }
  };

  const isClassification = results?.accuracy !== undefined;

  return (
    <Box>
      <Grid container spacing={3}>
        {/* Configuration Form */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
            >
              <TuneIcon color="primary" />
              Training Configuration
            </Typography>

            <Box display="flex" flexDirection="column" gap={2.5}>
              <FormControl fullWidth size="small">
                <InputLabel>Algorithm</InputLabel>
                <Select
                  name="algorithm"
                  value={formData.algorithm}
                  label="Algorithm"
                  onChange={handleChange}
                >
                  <MenuItem value="logistic">Logistic Regression</MenuItem>
                  <MenuItem value="knn">K-Nearest Neighbors (KNN)</MenuItem>
                  <MenuItem value="svm">Support Vector Machine (SVM)</MenuItem>
                  <MenuItem value="random_forest">Random Forest</MenuItem>
                  <MenuItem value="gradient_boosting">Gradient Boosting</MenuItem>
                  <MenuItem value="linear_regression">Linear Regression</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Missing Value Handling</InputLabel>
                <Select
                  name="handlingMissingValueStrategy"
                  value={formData.handlingMissingValueStrategy}
                  label="Missing Value Handling"
                  onChange={handleChange}
                >
                  <MenuItem value="drop_rows">Remove rows with nulls</MenuItem>
                  <MenuItem value="drop_columns">Remove columns with nulls</MenuItem>
                  <MenuItem value="mean">Mean</MenuItem>
                  <MenuItem value="median">Median</MenuItem>
                  <MenuItem value="mode">Mode</MenuItem>
                  <MenuItem value="constant">Constant</MenuItem>
                  <MenuItem value="ffill">Forward fill</MenuItem>
                  <MenuItem value="bfill">Backward fill</MenuItem>
                  <MenuItem value="knn">KNN Imputation</MenuItem>
                  <MenuItem value="interpolation">Interpolation</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Encoding Method</InputLabel>
                <Select
                  name="encodingCategoricalMethod"
                  value={formData.encodingCategoricalMethod}
                  label="Encoding Method"
                  onChange={handleChange}
                >
                  <MenuItem value="one_hot">One-Hot Encoding</MenuItem>
                  <MenuItem value="label">Label Encoding</MenuItem>
                  <MenuItem value="ordinal">Ordinal Encoding</MenuItem>
                  <MenuItem value="binary">Binary Encoding</MenuItem>
                  <MenuItem value="frequency">Frequency Encoding</MenuItem>
                  <MenuItem value="target">Target Encoding</MenuItem>
                  <MenuItem value="hashing">Hashing Encoding</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth size="small">
                <InputLabel>Normalization</InputLabel>
                <Select
                  name="normalizationTechnique"
                  value={formData.normalizationTechnique}
                  label="Normalization"
                  onChange={handleChange}
                >
                  <MenuItem value="min_max">Min-Max Scaling</MenuItem>
                  <MenuItem value="zscore">Standard Scaling (Z-score)</MenuItem>
                  <MenuItem value="robust">Robust Scaling</MenuItem>
                  <MenuItem value="maxabs">MaxAbs Scaling</MenuItem>
                  <MenuItem value="log">Log Transformation</MenuItem>
                  <MenuItem value="power_transform">Power Transform</MenuItem>
                  <MenuItem value="quantile">Quantile Transform</MenuItem>
                  <MenuItem value="none">None</MenuItem>
                </Select>
              </FormControl>

              <Divider sx={{ my: 1 }} />

              <Box display="flex" gap={2}>
                <Button
                  variant="outlined"
                  onClick={handleRetrain}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} /> : <ScienceIcon />}
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1.2
                  }}
                >
                  {loading ? "Running..." : "Dry Run"}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleSave}
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <SaveIcon />}
                  color="primary"
                  sx={{
                    flex: 1,
                    textTransform: 'none',
                    borderRadius: 2,
                    py: 1.2
                  }}
                >
                  Save & Train
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Results Panel */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper sx={{ p: 3, height: '100%', minHeight: 400 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}
            >
              <PlayArrowIcon color="primary" />
              Training Results
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {!results && !loading && !error && (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: 250,
                  bgcolor: 'action.hover',
                  borderRadius: 2,
                  p: 4
                }}
              >
                <ScienceIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                <Typography color="text.secondary" textAlign="center">
                  Modify configurations and click "Dry Run" to preview metrics.
                  <br />
                  Click "Save & Train" to persist changes and retrain the model.
                </Typography>
              </Box>
            )}

            {loading && (
              <Box display="flex" justifyContent="center" alignItems="center" minHeight={250}>
                <CircularProgress />
              </Box>
            )}

            {results && !loading && (
              <Box>
                <Typography variant="subtitle2" color="primary" gutterBottom sx={{ mb: 2 }}>
                  New Metrics
                </Typography>
                <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                  {isClassification ? (
                    <>
                      <MetricsCard parameter="Accuracy" value={results.accuracy} isPercentage={true} />
                      <MetricsCard parameter="Precision" value={results.precision} isPercentage={true} />
                      <MetricsCard parameter="Recall" value={results.recall} isPercentage={true} />
                      <MetricsCard parameter="F1 Score" value={results.f1_score} isPercentage={true} />
                    </>
                  ) : (
                    <>
                      <MetricsCard parameter="MSE" value={results.mse} isPercentage={false} />
                      <MetricsCard parameter="RMSE" value={results.rmse} isPercentage={false} />
                      <MetricsCard parameter="R² Score" value={results.r2_score} isPercentage={false} />
                    </>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 3, textAlign: 'center' }}>
                  * Results from the latest run
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default RetrainTab;

