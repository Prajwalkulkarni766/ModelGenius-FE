import { useCallback, useState } from 'react';
import { Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { UploadDatasetProps } from '../../types/Dataset';
import { uploadDatasetService } from "../../services/datasetService";
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from '../../hooks/useSnackbar';

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

const ALLOWED_EXTENSIONS = ['.csv', '.xlsx', '.xls'];
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const validateFiles = (files: File[]): { valid: File[]; errors: string[] } => {
  const errors: string[] = [];
  const valid = files.filter(f => {
    const ext = '.' + f.name.split('.').pop()?.toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      errors.push(`"${f.name}" — unsupported type (CSV / XLSX only)`);
      return false;
    }
    if (f.size > MAX_FILE_SIZE_BYTES) {
      errors.push(`"${f.name}" — exceeds ${MAX_FILE_SIZE_MB} MB limit`);
      return false;
    }
    return true;
  });
  return { valid, errors };
};

type UploadDataForm = {
  dataFiles: File[];
};

const UploadDataset = ({ projectId }: UploadDatasetProps) => {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const navigate = useNavigate();
  const { showSnackbar } = useSnackbar();

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
    const { valid, errors } = validateFiles(files);
    if (errors.length) showSnackbar(errors.join('\n'), 'error');
    if (!valid.length) return;
    setValue("dataFiles", valid, { shouldValidate: true });
  }, [setValue, showSnackbar]);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    const { valid, errors } = validateFiles(files);
    if (errors.length) showSnackbar(errors.join('\n'), 'error');
    if (!valid.length) return;
    setValue("dataFiles", valid, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<UploadDataForm> = async (data) => {
    try {

      const file = data.dataFiles;

      if (!file || file.length == 0) {
        showSnackbar("No file selected.", "error");
        return;
      }

      const response = await uploadDatasetService(projectId, file);

      if (response) {
        showSnackbar("Dataset uploaded successfully!", "success");
        navigate(`/projects/${projectId}`);
      }
      else {
        showSnackbar("Failed to upload file. Please try again.", "error");
      }
    } catch (error) {
      showSnackbar("An error occurred. Please try again.", "error");
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
      <Controller
        name="dataFiles"
        control={control}
        rules={{ required: "At least one file is required" }}
        render={() => (
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

      <Box mt={3} display="flex" justifyContent="center">
        <Button type="submit" variant="contained" color="primary" size="large">
          Upload
        </Button>
      </Box>
    </Box>
  );
};

export default UploadDataset;
