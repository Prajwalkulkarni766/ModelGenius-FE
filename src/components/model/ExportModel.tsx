import React from "react";
import { Box, Button, Typography, CircularProgress, Paper, Alert, Stack } from "@mui/material";
import { exportModelService, exportModelCodeService } from "../../services/modelService";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAsyncAction } from "../../hooks/useAsyncAction";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CodeIcon from '@mui/icons-material/Code';

interface ExportModelProps {
    projectId: string;
    modelId: string;
    modelName: string;
    modelPath?: string;
}

const ExportModel: React.FC<ExportModelProps> = ({ projectId, modelId, modelName, modelPath }) => {
    const { execute: executeCode, loading: downloadingCode } = useAsyncAction();
    const { execute: executeModel, loading: downloadingModel } = useAsyncAction();
    const { showSnackbar } = useSnackbar();

    const handleExportCode = async () => {
        await executeCode(async () => {
            const success = await exportModelCodeService(projectId, modelId, modelName);
            if (success) {
                showSnackbar("Python code downloaded successfully!", "success");
            } else {
                showSnackbar("Failed to download Python code. Ensure the model has been configured.", "error");
            }
        });
    };

    const handleExportModel = async () => {
        await executeModel(async () => {
            const success = await exportModelService(projectId, modelId, modelName);
            if (success) {
                showSnackbar("Model file downloaded successfully!", "success");
            } else {
                showSnackbar("Failed to download model. Ensure the model has been trained.", "error");
            }
        });
    };

    return (
        <Box p={3} display="flex" justifyContent="center">
            <Paper sx={{ p: 4, maxWidth: 600, width: '100%', textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>Export Model</Typography>
                <Typography paragraph color="textSecondary">
                    Download the trained model as Python code or the raw model file.
                </Typography>

                <Stack spacing={2} mt={3} alignItems="center">
                    {/* Primary: Download Python Code */}
                    <Button
                        variant="contained"
                        size="large"
                        startIcon={downloadingCode ? <CircularProgress size={20} color="inherit" /> : <CodeIcon />}
                        onClick={handleExportCode}
                        disabled={downloadingCode}
                        fullWidth
                        sx={{ maxWidth: 300 }}
                    >
                        {downloadingCode ? "Downloading..." : "Download Python Code"}
                    </Button>
                    <Typography variant="caption" color="textSecondary">
                        Format: Python Script (.py)
                    </Typography>

                    {/* Secondary: Download PKL file */}
                    {modelPath && (
                        <>
                            <Button
                                variant="outlined"
                                size="medium"
                                startIcon={downloadingModel ? <CircularProgress size={20} color="inherit" /> : <FileDownloadIcon />}
                                onClick={handleExportModel}
                                disabled={downloadingModel}
                                fullWidth
                                sx={{ maxWidth: 300, mt: 2 }}
                            >
                                {downloadingModel ? "Downloading..." : "Download Model File"}
                            </Button>
                            <Typography variant="caption" color="textSecondary">
                                Format: Pickle (.pkl) or Joblib
                            </Typography>
                        </>
                    )}

                    {!modelPath && (
                        <Alert severity="info" sx={{ mt: 2 }}>
                            Train the model first to download the model file (.pkl).
                        </Alert>
                    )}
                </Stack>
            </Paper>
        </Box>
    )
}

export default ExportModel;