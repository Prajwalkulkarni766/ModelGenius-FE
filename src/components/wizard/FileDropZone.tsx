import { useCallback, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileDropZone = () => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [selectedFiles, setSelectedFiles] = useState<Array<File>>([]);

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);
        setSelectedFiles(files);
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setSelectedFiles(files);
    };

    return (
        <>
            <Box
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                sx={{
                    border: '2px dashed #aaa',
                    borderRadius: 2,
                    padding: 4,
                    textAlign: 'center',
                    backgroundColor: isDragging ? '#e3f2fd' : '#f9f9f9',
                    color: '#555',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                }}
            >
                <Typography variant="h5">
                    Drag and drop or upload your file
                </Typography>
                <Typography mt={2}>
                    Data must be in CSV or XLSX format
                </Typography>

                <Button
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    sx={{ mt: 2 }}
                >
                    Browse files
                    <VisuallyHiddenInput
                        type="file"
                        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        multiple
                        onChange={handleFileSelect}
                    />
                </Button>
            </Box>

            {selectedFiles.length > 0 && (
                <>
                    <List sx={{ mt: 3 }}>
                        {selectedFiles.map((file: File, idx) => (
                            <ListItem key={idx}>
                                <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
                            </ListItem>
                        ))}
                    </List>
                </>
            )}
        </>
    );
};

export default FileDropZone;
