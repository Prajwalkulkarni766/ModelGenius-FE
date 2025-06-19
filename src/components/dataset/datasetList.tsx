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

function generate(element: React.ReactElement<unknown>) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function DatasetList() {
    return (
        <Box>
            <Grid>
                <List>
                    {generate(
                        <ListItem
                            secondaryAction={
                                <IconButton edge="end" aria-label="delete">
                                    <DeleteIcon />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <FileCopyIcon />
                            </ListItemAvatar>
                            <ListItemText
                                primary="Single-line item"
                                secondary={'Secondary text'}
                            />
                            <Divider />
                        </ListItem>,
                    )}
                </List>
            </Grid>
        </Box>
    );
}
