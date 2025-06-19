import { useCallback } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

interface ImageDropZoneProps {
    file: File | null;
    onFileSelect: (file: File | null) => void;
}

const ImageDropZone = ({ file, onFileSelect }: ImageDropZoneProps) => {
    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            onFileSelect(droppedFile);
        }
    }, [onFileSelect]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selected = event.target.files?.[0] || null;
        onFileSelect(selected);
    };

    return (
        <>
            <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                sx={{
                    border: '2px dashed #aaa',
                    borderRadius: 2,
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    color: '#555',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
            >
                <Typography variant="h5">Drag and drop or upload project image</Typography>
                <Typography mt={2}>Data must be in image format</Typography>

                <Button component="label" variant="contained" sx={{ mt: 2 }}>
                    Browse files
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        style={{ display: 'none' }}
                    />
                </Button>
            </Box>

            {file && (
                <List sx={{ mt: 3 }}>
                    <ListItem>
                        <ListItemText
                            primary={file.name}
                            secondary={`${(file.size / 1024).toFixed(1)} KB`}
                        />
                    </ListItem>
                </List>
            )}
        </>
    );
};

export default ImageDropZone;
