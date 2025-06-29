import { Typography, Box, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { newProjectService } from "../../services/projectService";
import { useState } from "react";
import { NewProject } from "../../types/Project";
import ImageDropZone from "./ImageDropZone";

const NewProjectForm = () => {

  const [newProjectError, setNewProjectError] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Initialize react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<NewProject>({
    defaultValues: {
      projectTitle: '',
      projectDescription: ''
    }
  });

  // Handle form submission
  const onSubmit: SubmitHandler<NewProject> = async (data) => {
    try {

      const formData = new FormData();
      formData.append('projectTitle', data.projectTitle);
      formData.append('projectDescription', data.projectDescription);

      if (selectedFile) {
        formData.append('projectFile', selectedFile);
      }

      // Assuming signupService handles the API call for project creation.
      const newProjectSuccess = await newProjectService(formData);

      if (newProjectSuccess) {
        setNewProjectError(null);
        reset();
        setSelectedFile(null);
      } else {
        setNewProjectError("Something went wrong. Please try again.");
      }
    } catch (error) {
      setNewProjectError("An error occurred. Please try again later.");
      console.error(error);
    }
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

        <ImageDropZone file={selectedFile} onFileSelect={setSelectedFile} />

        {/* Display error message if new project creation fails */}
        {newProjectError && (
          <Typography color="error" mt={2}>
            {newProjectError}
          </Typography>
        )}


        <Button sx={{ mt: 2, alignSelf: 'flex-start' }} type="submit" variant="contained" color="primary" size="large" >
          Create
        </Button>
      </Box>
    </>
  )
}

export default NewProjectForm;