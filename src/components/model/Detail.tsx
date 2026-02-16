import { Box, Typography, Paper, Grid, Button, CircularProgress, Chip, Divider, Stack } from "@mui/material";
import MetricsCard from "../wizard/MetricsCard";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import PsychologyIcon from '@mui/icons-material/Psychology';
import DataObjectIcon from '@mui/icons-material/DataObject';
import TuneIcon from '@mui/icons-material/Tune';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

type ModelDetailsViewProps = {
  model: any;
  loading: boolean;
  trainLoading: boolean;
  error: string | null;
  onTrain: () => void;
  onDelete: () => void;
  onEdit: () => void;
  onDownload: () => void;
};

const ConfigItem = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
    <Box sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      borderRadius: 2,
      bgcolor: 'action.hover',
      color: 'primary.main'
    }}>
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 500 }}>
        {value || 'Not set'}
      </Typography>
    </Box>
  </Box>
);

const formatConfigValue = (value: string): string => {
  if (!value) return 'Not set';
  return value.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};

const ModelDetailsView = ({
  model,
  loading,
  error,
  onDelete,
}: ModelDetailsViewProps) => {

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight={300}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  const isClassification = model.metrics?.accuracy !== undefined;

  return (
    <Box>
      <Grid container spacing={3}>
        <Stack gap={2} width={'100%'}>
          {/* Model Configuration */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <TuneIcon color="primary" />
              Model Configuration
            </Typography>

            <Stack divider={<Divider />}>
              <ConfigItem
                icon={<DataObjectIcon fontSize="small" />}
                label="Target Column"
                value={model.targetColumn}
              />
              <ConfigItem
                icon={<PsychologyIcon fontSize="small" />}
                label="Algorithm"
                value={formatConfigValue(model.algorithm)}
              />
              <ConfigItem
                icon={<DataObjectIcon fontSize="small" />}
                label="Encoding Method"
                value={formatConfigValue(model.encodingCategoricalMethod)}
              />
              <ConfigItem
                icon={<TuneIcon fontSize="small" />}
                label="Normalization"
                value={formatConfigValue(model.normalizationTechnique)}
              />
              <ConfigItem
                icon={<CleaningServicesIcon fontSize="small" />}
                label="Missing Value Strategy"
                value={formatConfigValue(model.handlingMissingValueStrategy)}
              />
            </Stack>

            {/* Tags */}
            <Box sx={{ mt: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip
                label={isClassification ? 'Classification' : 'Regression'}
                color={isClassification ? 'primary' : 'secondary'}
                size="small"
                variant="outlined"
              />
              {model.modelPath && (
                <Chip
                  label="Trained"
                  color="success"
                  size="small"
                  variant="outlined"
                />
              )}
              {!model.modelPath && (
                <Chip
                  label="Not Trained"
                  color="warning"
                  size="small"
                  variant="outlined"
                />
              )}
            </Box>
          </Paper>

          {/* Performance Metrics */}
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Performance Metrics
            </Typography>

            {!model.metrics ? (
              <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 200,
                bgcolor: 'action.hover',
                borderRadius: 2
              }}>
                <Typography color="text.secondary">
                  Train the model to see performance metrics
                </Typography>
              </Box>
            ) : (
              <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
                {isClassification ? (
                  <>
                    <MetricsCard parameter="Accuracy" value={model.metrics.accuracy} isPercentage={true} />
                    <MetricsCard parameter="Precision" value={model.metrics.precision} isPercentage={true} />
                    <MetricsCard parameter="Recall" value={model.metrics.recall} isPercentage={true} />
                    <MetricsCard parameter="F1 Score" value={model.metrics.f1_score} isPercentage={true} />
                  </>
                ) : (
                  <>
                    <MetricsCard parameter="MSE" value={model.metrics.mse} isPercentage={false} />
                    <MetricsCard parameter="RMSE" value={model.metrics.rmse} isPercentage={false} />
                    <MetricsCard parameter="R² Score" value={model.metrics.r2_score} isPercentage={false} />
                  </>
                )}
              </Box>
            )}
          </Paper>

          {/* Actions */}
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteOutlineIcon />}
            onClick={onDelete}
            sx={{
              borderRadius: 2,
              textTransform: 'none',
              px: 3
            }}
          >
            Delete Model
          </Button>
        </Stack>
      </Grid>
    </Box>
  );
};

export default ModelDetailsView;


