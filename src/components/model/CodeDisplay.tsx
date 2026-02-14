import React, { useEffect, useState } from "react";
import { Paper, Typography, Box, CircularProgress, Alert, IconButton, Tooltip, Snackbar } from "@mui/material";
import { useParams } from "react-router-dom";
import { getModelCodeService } from "../../services/modelService";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import CodeIcon from '@mui/icons-material/Code';

type CodeDisplayProps = {
  model: any;
};

const CodeDisplay: React.FC<CodeDisplayProps> = ({ model }) => {
  const { projectId, modelId } = useParams<{ projectId: string; modelId: string }>();
  const [codeString, setCodeString] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchCode = async () => {
      if (!projectId || !modelId) {
        setError("Missing project or model ID");
        setLoading(false);
        return;
      }

      setLoading(true);
      const code = await getModelCodeService(projectId, modelId);
      if (code) {
        setCodeString(code);
        setError(null);
      } else {
        setError("Failed to fetch Python code. Please ensure the model is configured.");
      }
      setLoading(false);
    };

    fetchCode();
  }, [projectId, modelId, model]);

  const handleCopy = async () => {
    if (codeString) {
      await navigator.clipboard.writeText(codeString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <Paper sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300 }}>
        <CircularProgress />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3 }}>
        <Alert severity="error">{error}</Alert>
      </Paper>
    );
  }

  return (
    <Paper sx={{ overflow: 'hidden' }}>
      {/* Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          bgcolor: '#2d2d2d',
          borderBottom: '1px solid #404040'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <CodeIcon sx={{ color: '#4ec9b0', fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: '#e0e0e0', fontWeight: 500 }}>
            Python
          </Typography>
        </Box>
        <Tooltip title={copied ? "Copied!" : "Copy code"}>
          <IconButton
            size="small"
            onClick={handleCopy}
            sx={{
              color: copied ? '#4caf50' : '#9e9e9e',
              '&:hover': { color: '#fff', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {copied ? <CheckIcon fontSize="small" /> : <ContentCopyIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>

      {/* Code Block */}
      <Box
        sx={{
          maxHeight: "600px",
          overflow: "auto",
          fontSize: "13px",
          lineHeight: 1.6,
          backgroundColor: "#1e1e1e",
          color: "#d4d4d4",
          p: 2.5,
          fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
          whiteSpace: "pre",
          '&::-webkit-scrollbar': {
            width: 8,
            height: 8,
          },
          '&::-webkit-scrollbar-track': {
            bgcolor: '#2d2d2d',
          },
          '&::-webkit-scrollbar-thumb': {
            bgcolor: '#555',
            borderRadius: 4,
            '&:hover': {
              bgcolor: '#777',
            },
          },
        }}
      >
        {codeString}
      </Box>

      <Snackbar
        open={copied}
        autoHideDuration={2000}
        message="Code copied to clipboard"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Paper>
  );
};

export default CodeDisplay;

