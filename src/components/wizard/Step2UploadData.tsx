import { useCallback, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { ModelStepProps } from '../../types/Model';
import { uploadDatasetService } from "../../services/modelService";

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

type UploadDataForm = {
    dataFiles: File[];
};

const Step2UploadData = ({ projectId, goToNextStep, modelId }: ModelStepProps) => {
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [fileUploadError, setFileUploadError] = useState<string | null>(null);

    const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm<UploadDataForm>({
        defaultValues: {
            dataFiles: [],
        }
    });

    const selectedFiles = watch("dataFiles");

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const files = Array.from(event.dataTransfer.files);
        setValue("dataFiles", files, { shouldValidate: true });
    }, [setValue]);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files ? Array.from(event.target.files) : [];
        setValue("dataFiles", files, { shouldValidate: true });
    };

    const onSubmit: SubmitHandler<UploadDataForm> = async (data) => {
        try {

            const file = data.dataFiles?.[0]; // Get the first file

            if (!file) {
                setFileUploadError("No file selected");
                return;
            }

            const { requestStatus } = await uploadDatasetService(modelId, projectId, file);

            if (requestStatus) {
                setFileUploadError(null);
                goToNextStep();
            }
            else {
                setFileUploadError("Failed to upload file")
            }
        } catch (error) {
            setFileUploadError("" + error);
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            mt={5}
            sx={{ display: "flex", flexDirection: 'column' }}
            gap={2}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h5">Upload your data</Typography>
            <Typography mb={5}>Drag and drop your data file here, or browse to select a CSV or XLSX</Typography>

            <Controller
                name="dataFiles"
                control={control}
                rules={{ required: "At least one file is required" }}
                render={({ field }) => (
                    <Box
                        onDrop={(e) => {
                            handleDrop(e);
                        }}
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
                                onChange={(e) => {
                                    handleFileSelect(e);
                                }}
                            />
                        </Button>

                        {errors.dataFiles && (
                            <Typography color="error" mt={2}>
                                {errors.dataFiles.message}
                            </Typography>
                        )}
                    </Box>
                )}
            />

            {selectedFiles.length > 0 && (
                <List sx={{ mt: 3 }}>
                    {selectedFiles.map((file: File, idx: number) => (
                        <ListItem key={idx}>
                            <ListItemText primary={file.name} secondary={`${(file.size / 1024).toFixed(1)} KB`} />
                        </ListItem>
                    ))}
                </List>
            )}

            {fileUploadError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {fileUploadError}
                </Typography>
            )}

            <Box mt={3} display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary" size="large">
                    Save & Next
                </Button>
            </Box>
        </Box>
    );
};

export default Step2UploadData;
