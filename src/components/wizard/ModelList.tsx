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

interface ModelListProps {
    projectId: string;
    models: Model[];
}

export default function ModelList({ projectId, models: initialModels }: ModelListProps) {
    const [models, setModels] = React.useState<Model[]>(initialModels);

    const handleDelete = async (modelId: string) => {
        try {
            const { requestStatus } = await deleteModelService(projectId, modelId);
            if (requestStatus) {
                setModels((prevModels) => prevModels.filter(model => model._id !== modelId));
            }
        } catch (error) {
            console.error('Failed to delete model:', error);
        }
    };

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
                                        <Link to={`/model-info/${model._id}`}>
                                            <Button color='primary'>Edit</Button>
                                        </Link>
                                        <Button
                                            color='error'
                                            onClick={() => handleDelete(model._id)}
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
        </Box>
    );
}
