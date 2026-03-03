import { Button, Box, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getProfileService, updateProfileService } from "../../services/settingService";
import { useState, useEffect } from 'react';
import { UpdateProfileUser } from "../../types/User";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAsyncAction } from '../../hooks/useAsyncAction';

const UpdateProfileForm = () => {

  const { showSnackbar } = useSnackbar();
  const { execute, loading: isLoading } = useAsyncAction();

  // Initialize react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileUser>({
    defaultValues: {
      username: '',
      email: ''
    }
  });

  // Handle form submission
  const onSubmit: SubmitHandler<UpdateProfileUser> = async (data) => {
    await execute(async () => {
      try {
        const updateProfileSuccess = await updateProfileService(data.username, data.email);

        if (updateProfileSuccess) {
          showSnackbar("Profile updated successfully!", "success");
        } else {
          showSnackbar("Failed to update profile. Please try again.", "error");
        }
      } catch (error) {
        showSnackbar("An error occurred. Please try again later.", "error");
        console.error(error);
      }
    });
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfileService();
        if (data) {
          reset({
            username: data.data.username,
            email: data.data.email
          });
        }
      } catch (error) {
        showSnackbar("Failed to load profile. Please try again.", "error");
        console.error(error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <Box
      component="form"
      sx={{
        maxWidth: '360px',
        display: 'flex',
        gap: 2,
        flexDirection: 'column',
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >

      {/* Username field */}
      <Controller
        name="username"
        control={control}
        rules={{
          required: "Username is required",
          pattern: {
            value: /^[a-zA-Z0-9]+$/,
            message: "Invalid username"
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="username"
            label="Username"
            type="text"
            variant="outlined"
            required
            fullWidth
            error={!!errors.username}
            helperText={errors.username?.message}
          />
        )}
      />


      {/* Email Field */}
      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: "Invalid email address"
          }
        }}
        render={({ field }) => (
          <TextField
            {...field}
            id="email"
            label="Email"
            type="email"
            variant="outlined"
            required
            fullWidth
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />

      <Button type="submit" variant="contained" color="primary" size="large" fullWidth disabled={isLoading}>
        {isLoading ? 'Updating...' : 'Update Profile'}
      </Button>
    </Box>
  );
};

export default UpdateProfileForm;
