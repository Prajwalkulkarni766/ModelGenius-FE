import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import Divider from '@mui/material/Divider';
import { Dataset } from '../../types/Dataset';
import { deleteDatasetService } from '../../services/datasetService';
import { useSnackbar } from '../../hooks/useSnackbar';
import ConfirmDialog from '../ConfirmDialog';

interface DatasetListProps {
  projectId: string;
  dataset?: Dataset[];
}

export default function DatasetList({ projectId, dataset = [] }: DatasetListProps) {
  const [datasets, setDatasets] = React.useState<Dataset[]>(dataset);
  const [deletingId, setDeletingId] = React.useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);
  const { showSnackbar } = useSnackbar();

  const handleDeleteClick = (datasetId: string) => {
    setDeleteTargetId(datasetId);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTargetId) return;

    setDeletingId(deleteTargetId);

    const response = await deleteDatasetService(projectId, deleteTargetId);

    if (response) {
      showSnackbar("Dataset deleted successfully!", "success");
      setDatasets(prev => prev.filter(d => d._id !== deleteTargetId));
    } else {
      showSnackbar("Failed to delete dataset.", "error");
    }

    setDeletingId(null);
    setDeleteTargetId(null);
  };

  const handleCancelDelete = () => {
    setDeleteTargetId(null);
  };

  const targetDataset = datasets.find(d => d._id === deleteTargetId);

  return (
    <Box>
      <Grid>
        <List>
          {datasets.length > 0 ? (
            datasets.map((data) => (
              <React.Fragment key={data._id}>
                <ListItem
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteClick(data._id)}
                      disabled={deletingId === data._id}
                    >
                      <DeleteIcon />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <FileCopyIcon />
                  </ListItemAvatar>
                  <ListItemText
                    primary={data.originalFileName}
                    secondary={
                      data.createdAt
                        ? new Date(data.createdAt).toLocaleDateString()
                        : ''
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No datasets available" />
            </ListItem>
          )}
        </List>
      </Grid>

      <ConfirmDialog
        open={!!deleteTargetId}
        title="Delete Dataset"
        message={`Are you sure you want to delete "${targetDataset?.originalFileName || 'this dataset'}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        confirmColor="error"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </Box>
  );
}
