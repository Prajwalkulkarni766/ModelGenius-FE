import * as React from 'react';
import {
    Box, Button, List, ListItem, ListItemAvatar,
    ListItemText, Grid, Divider,
    Typography
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { Link } from 'react-router';
import { Model } from '../../types/Model';
import { deleteModelService } from '../../services/modelService';
import ConfirmDialog from '../../components/ConfirmDialog';

interface ModelListProps {
    projectId: string;
    models: Model[];
}

export default function ModelList({ projectId, models: initialModels }: ModelListProps) {
    const [models, setModels] = React.useState<Model[]>(initialModels);
    const [deleteTargetId, setDeleteTargetId] = React.useState<string | null>(null);
    const deleteGuardRef = React.useRef(false);

    const handleDeleteClick = (modelId: string) => {
        setDeleteTargetId(modelId);
    };

    const handleConfirmDelete = async () => {
        if (deleteGuardRef.current || !deleteTargetId) return;
        deleteGuardRef.current = true;
        try {
            const { requestStatus } = await deleteModelService(projectId, deleteTargetId);
            if (requestStatus) {
                setModels((prevModels) => prevModels.filter(model => model._id !== deleteTargetId));
            }
        } catch (error) {
            console.error('Failed to delete model:', error);
        }
        setDeleteTargetId(null);
        setTimeout(() => { deleteGuardRef.current = false; }, 300);
    };

    const handleCancelDelete = () => {
        setDeleteTargetId(null);
    };

    const targetModel = models.find(m => m._id === deleteTargetId);

    return (
        <Box>
            <Grid
                container
                spacing={2}
            >
                <List style={{ width: '100%' }}>
                    {models.map((model) => (
                        <React.Fragment key={model._id}>
                            <ListItem
                                secondaryAction={
                                    <>
                                        <Link to={`/projects/${projectId}/models/${model._id}`}>
                                            <Button color='primary'>Edit</Button>
                                        </Link>
                                        <Button
                                            color='error'
                                            onClick={() => handleDeleteClick(model._id)}
                                        >
                                            Delete
                                        </Button>
                                    </>
                                }
                            >
                                <ListItemAvatar>
                                    <SmartToyIcon />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={model.modelName}
                                    secondary={`${model.mlModelName} - ${new Date(model.createdAt).toLocaleDateString()}`}
                                />
                            </ListItem>
                            <Divider />
                        </React.Fragment>
                    ))}

                    {models.length === 0 && <Typography>No model created yet</Typography>}
                </List>
            </Grid>

            <ConfirmDialog
                open={!!deleteTargetId}
                title="Delete Model"
                message={`Are you sure you want to delete "${targetModel?.modelName || 'this model'}"? This action cannot be undone.`}
                confirmText="Delete"
                cancelText="Cancel"
                confirmColor="error"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Box>
    );
}
