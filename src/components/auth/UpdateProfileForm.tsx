import { Button, Box, TextField, Typography } from '@mui/material';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { getProfileService, updateProfileService } from "../../services/settingService";
import { useState, useEffect } from 'react';
import { UpdateProfileUser } from "../../types/User";

const UpdateProfileForm = () => {

  const [profileUpdateError, setProfileUpdateError] = useState<string | null>(null);

  // Initialize react-hook-form
  const { control, handleSubmit, formState: { errors }, reset } = useForm<UpdateProfileUser>({
    defaultValues: {
      username: '',
      email: ''
    }
  });

  // Handle form submission
  const onSubmit: SubmitHandler<UpdateProfileUser> = async (data) => {
    try {
      // Assuming signupService handles the API call for login.
      const updateProfileSuccess = await updateProfileService(data.username, data.email);

      // console.log(updateProfileSuccess)
      // if (signupSuccess) {
      //     navigate("/home");
      // } else {
      //     setProfileUpdateError("Something went wrong. Please try again.");
      // }
    } catch (error) {
      setProfileUpdateError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfileService();
      if (data) {
        reset({
          username: data.username,
          email: data.email
        });
      }
    };
    fetchProfile();
  }, [])

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

      {/* Display error message if update profile fails */}
      {profileUpdateError && (
        <Typography color="error" textAlign="center" mt={2}>
          {profileUpdateError}
        </Typography>
      )}

      <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
        Update Profile
      </Button>
    </Box>
  );
};

export default UpdateProfileForm;
