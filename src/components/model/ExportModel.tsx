import React, { useState } from "react";
import { Box, Button, Typography, CircularProgress, Paper, Alert, Stack } from "@mui/material";
import { exportModelService, exportModelCodeService } from "../../services/modelService";
import { toast } from 'react-toastify';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CodeIcon from '@mui/icons-material/Code';

interface ExportModelProps {
    projectId: string;
    modelId: string;
    modelName: string;
    modelPath?: string;
}

const ExportModel: React.FC<ExportModelProps> = ({ projectId, modelId, modelName, modelPath }) => {
    const [downloadingCode, setDownloadingCode] = useState(false);
    const [downloadingModel, setDownloadingModel] = useState(false);

    const handleExportCode = async () => {
        setDownloadingCode(true);
        const success = await exportModelCodeService(projectId, modelId, modelName);
        if (success) {
            toast.success("Python code downloaded successfully!");
        } else {
            toast.error("Failed to download Python code. Ensure the model has been configured.");
        }
        setDownloadingCode(false);
    };

    const handleExportModel = async () => {
        setDownloadingModel(true);
        const success = await exportModelService(projectId, modelId, modelName);
        if (success) {
            toast.success("Model file downloaded successfully!");
        } else {
            toast.error("Failed to download model. Ensure the model has been trained.");
        }
        setDownloadingModel(false);
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