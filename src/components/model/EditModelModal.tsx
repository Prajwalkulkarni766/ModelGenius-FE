import React, { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";

type EditModelModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (modelId: string, updates: any) => Promise<void>;
  model: any;
  loading: boolean;
};

const ALGORITHMS = [
  { value: "logistic", label: "Logistic Regression" },
  { value: "knn", label: "K-Nearest Neighbors" },
  { value: "svm", label: "Support Vector Machine" },
  { value: "random_forest", label: "Random Forest" },
  { value: "gradient_boosting", label: "Gradient Boosting" },
  { value: "linear_regression", label: "Linear Regression" },
];

const HANDLING_MISSING_VALUES = [
  { value: "drop_rows", label: "Remove rows with nulls" },
  { value: "drop_columns", label: "Remove columns with nulls" },
  { value: "mean", label: "Mean" },
  { value: "median", label: "Median" },
  { value: "mode", label: "Mode" },
  { value: "constant", label: "Constant" },
  { value: "ffill", label: "Forward Fill" },
  { value: "bfill", label: "Backward Fill" },
  { value: "knn", label: "KNN Imputation" },
  { value: "interpolation", label: "Interpolation" },
];

const ENCODING_METHODS = [
  { value: "one_hot", label: "One-Hot Encoding" },
  { value: "label", label: "Label Encoding" },
  { value: "ordinal", label: "Ordinal Encoding" },
  { value: "binary", label: "Binary Encoding" },
  { value: "frequency", label: "Frequency Encoding" },
  { value: "target", label: "Target Encoding" },
  { value: "hashing", label: "Hashing Encoding" },
];

const NORMALIZATION_TECHNIQUES = [
  { value: "min_max", label: "Min-Max Scaling" },
  { value: "zscore", label: "Standard Scaling (Z-score)" },
  { value: "robust", label: "Robust Scaling" },
  { value: "maxabs", label: "MaxAbs Scaling" },
  { value: "log", label: "Log Transformation" },
  { value: "power_transform", label: "Power Transform" },
  { value: "quantile", label: "Quantile Transform" },
  { value: "none", label: "None" },
];

const EditModelModal: React.FC<EditModelModalProps> = ({
  open,
  onClose,
  onSave,
  model,
  loading,
}) => {
  const [formData, setFormData] = useState({
    modelName: "",
    algorithm: "",
    handlingMissingValueStrategy: "",
    encodingCategoricalMethod: "",
    normalizationTechnique: "",
  });
  const saveGuardRef = useRef(false);

  useEffect(() => {
    if (model) {
      setFormData({
        modelName: model.modelName || "",
        algorithm: model.algorithm || "",
        handlingMissingValueStrategy: model.handlingMissingValueStrategy || "",
        encodingCategoricalMethod: model.encodingCategoricalMethod || "",
        normalizationTechnique: model.normalizationTechnique || "",
      });
    }
  }, [model]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (saveGuardRef.current || loading) return;
    saveGuardRef.current = true;
    onSave(model._id, formData);
    setTimeout(() => { saveGuardRef.current = false; }, 300);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Model Settings</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Model Name"
              name="modelName"
              value={formData.modelName}
              onChange={handleChange}
            />
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Algorithm</InputLabel>
              <Select
                label="Algorithm"
                name="algorithm"
                value={formData.algorithm}
                onChange={handleChange}
              >
                {ALGORITHMS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Handling Missing Values</InputLabel>
              <Select
                label="Handling Missing Values"
                name="handlingMissingValueStrategy"
                value={formData.handlingMissingValueStrategy}
                onChange={handleChange}
              >
                {HANDLING_MISSING_VALUES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Encoding Method</InputLabel>
              <Select
                label="Encoding Method"
                name="encodingCategoricalMethod"
                value={formData.encodingCategoricalMethod}
                onChange={handleChange}
              >
                {ENCODING_METHODS.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <FormControl fullWidth>
              <InputLabel>Normalization Technique</InputLabel>
              <Select
                label="Normalization Technique"
                name="normalizationTechnique"
                value={formData.normalizationTechnique}
                onChange={handleChange}
              >
                {NORMALIZATION_TECHNIQUES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModelModal;
