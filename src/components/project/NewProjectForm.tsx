import { Box, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { newProjectService } from "../../services/projectService";
import { NewProject } from "../../types/Project";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAsyncAction } from "../../hooks/useAsyncAction";

const NewProjectForm = () => {

  const { showSnackbar } = useSnackbar();
  const { execute, loading } = useAsyncAction();

  const { control, handleSubmit, formState: { errors }, reset } = useForm<NewProject>({
    defaultValues: {
      projectTitle: '',
      projectDescription: ''
    }
  });

  const onSubmit: SubmitHandler<NewProject> = async (data) => {
    await execute(async () => {
      const newProjectSuccess = await newProjectService({
        projectTitle: data.projectTitle,
        projectDescription: data.projectDescription
      });

      if (newProjectSuccess) {
        showSnackbar("Project created successfully!", "success");
        reset();
      } else {
        showSnackbar("Failed to create project. Please try again.", "error");
      }
    });
  };

  return (
    <>
      <Box
        mt={5}
        component="form"
        sx={{ display: "flex", flexDirection: 'column', gap: 2 }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >

        {/* ProjectTitle Field */}
        <Controller
          name="projectTitle"
          control={control}
          rules={{
            required: "Project title is required",
            pattern: {
              value: /^[a-zA-Z0-9\s]+$/,
              message: "Invalid Project title"
            }
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
              error={!!errors.projectTitle}
              helperText={errors.projectTitle?.message}
            />
          )}
        />


        <Controller
          name="projectDescription"
          control={control}
          rules={{
            required: "Project description is required",
            pattern: {
              value: /^[a-zA-Z0-9\s]+$/,
              message: "Invalid Project description"
            }
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
              error={!!errors.projectDescription}
              helperText={errors.projectDescription?.message}
            />
          )}
        />

        <Button sx={{ mt: 2, alignSelf: 'flex-start' }} type="submit" variant="contained" color="primary" size="large" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </Button>
      </Box>
    </>
  )
}

export default NewProjectForm;