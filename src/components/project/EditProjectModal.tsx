import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { NewProject } from '../../types/Project';

interface EditProjectModalProps {
  open: boolean;
  initialTitle: string;
  initialDescription: string;
  loading?: boolean;
  onSave: (title: string, description: string) => void;
  onCancel: () => void;
}

const EditProjectModal: React.FC<EditProjectModalProps> = ({
  open,
  initialTitle,
  initialDescription,
  loading = false,
  onSave,
  onCancel,
}) => {
  const { control, handleSubmit, formState: { errors } } = useForm<NewProject>({
    defaultValues: {
      projectTitle: initialTitle,
      projectDescription: initialDescription,
    },
    values: {
      projectTitle: initialTitle,
      projectDescription: initialDescription,
    },
  });

  const onSubmit = (data: NewProject) => {
    onSave(data.projectTitle, data.projectDescription);
  };

  return (
    <Dialog open={open} onClose={onCancel} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Project</DialogTitle>
      <DialogContent>
        <Controller
          name="projectTitle"
          control={control}
          rules={{
            required: 'Project title is required',
            pattern: {
              value: /^[a-zA-Z0-9\s]+$/,
              message: 'Invalid Project title',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="projectTitle"
              label="Project title"
              type="text"
              variant="outlined"
              required
              fullWidth
              sx={{ mt: 2 }}
              error={!!errors.projectTitle}
              helperText={errors.projectTitle?.message}
            />
          )}
        />

        <Controller
          name="projectDescription"
          control={control}
          rules={{
            required: 'Project description is required',
            pattern: {
              value: /^[a-zA-Z0-9\s]+$/,
              message: 'Invalid Project description',
            },
          }}
          render={({ field }) => (
            <TextField
              {...field}
              id="projectDescription"
              label="Project description"
              type="text"
              variant="outlined"
              required
              fullWidth
              rows={4}
              multiline
              sx={{ mt: 2 }}
              error={!!errors.projectDescription}
              helperText={errors.projectDescription?.message}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          color="primary"
          disabled={loading}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProjectModal;
