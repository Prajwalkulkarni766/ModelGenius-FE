import * as React from 'react';
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Grid,
    Typography
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { Dataset } from '../../types/Dataset';
import { deleteDatasetService } from '../../services/datasetService';

interface DatasetListProps {
    projectId: string;
    datasets: Dataset[];
}

export default function DatasetList({ projectId, datasets: initialDatasets }: DatasetListProps) {
    const [datasets, setDatasets] = React.useState<Dataset[]>(initialDatasets);

    const handleDelete = async (datasetId: string, modelId: string) => {
        try {
            const { requestStatus } = await deleteDatasetService(datasetId, modelId, projectId);
            if (requestStatus) {
                setDatasets(prev => prev.filter(dataset => dataset._id !== datasetId));
            }
        } catch (error) {
            console.error('Failed to delete dataset:', error);
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <List style={{ width: '100%' }}>
                    {datasets.map((dataset) => (
                        <React.Fragment key={dataset._id}>
                            <ListItem
                                // secondaryAction={
                                //     <Button
                                //         color="error"
                                //         startIcon={<DeleteIcon />}
                                //         onClick={() => handleDelete(dataset._id, dataset.modelId)}
                                //     >
                                //         Delete
                                //     </Button>
                                // }
                            >
                                <ListItemAvatar>
                                    <FileCopyIcon />
                                </ListItemAvatar>
                                <ListItemText
                                    primary={dataset.originalFileName}
                                    secondary={`Uploaded: ${new Date(dataset.createdAt).toLocaleDateString()}`}
                                />
                            </ListItem>
                        </React.Fragment>
                    ))}
                    {datasets.length === 0 && <Typography>No dataset uploaded yet</Typography>}
                </List>
            </Grid>
        </Box>
    );
}
