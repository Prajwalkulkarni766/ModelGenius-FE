import { Button, Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useState } from 'react';
import { resetPasswordService } from '../../services/authService';
import { useAsyncAction } from '../../hooks/useAsyncAction';
import { useSnackbar } from '../../hooks/useSnackbar';
import { Visibility, VisibilityOff } from '@mui/icons-material';

type UpdatePasswordFormValues = {
    password: string;
    confirmPassword: string;
};

type FormState = "form" | "success" | "error";

const UpdatePasswordForm = () => {
    const [formState, setFormState] = useState<FormState>("form");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const { execute, loading: isLoading } = useAsyncAction();
    const { showSnackbar } = useSnackbar();

    const { control, handleSubmit, formState: { errors } } = useForm<UpdatePasswordFormValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        }
    });

    const onSubmit: SubmitHandler<UpdatePasswordFormValues> = async (data) => {
        await execute(async () => {
            try {
                await resetPasswordService(data.password);
                setFormState("success");
            } catch (error) {
                setFormState("error");
                showSnackbar("Failed to reset password. Please try again.", "error");
            }
        });
    };

    if (formState === "success") {
        return (
            <Box textAlign="center">
                <Typography variant="h6" color="success.main" mb={2}>
                    Password updated successfully!
                </Typography>
                <Link to="/">
                    <Typography color='primary' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Go to login page
                    </Typography>
                </Link>
            </Box>
        );
    }

    if (formState === "error") {
        return (
            <Box textAlign="center">
                <Typography variant="h6" color="error.main" mb={2}>
                    Problem while updating password. Please try again later.
                </Typography>
                <Link to="/">
                    <Typography color='primary' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Go to login page
                    </Typography>
                </Link>
            </Box>
        );
    }

    return (
        <Box
            component="form"
            sx={{
                m: 'auto',
                maxWidth: 360,
                display: 'flex',
                gap: 2,
                alignContent: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h5" textAlign="center" mb={2}>
                Reset Password
            </Typography>

            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Password is required",
                    minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                    }
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />

            <Controller
                name="confirmPassword"
                control={control}
                rules={{
                    required: "Please confirm your password",
                    validate: (value, formValues) =>
                        value === formValues.password || "Passwords do not match"
                }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="confirmPassword"
                        label="Confirm Password"
                        type={showConfirmPassword ? "text" : "password"}
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle confirm password visibility"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                )}
            />

            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 1 }}
            >
                {isLoading ? 'Updating...' : 'Update Password'}
            </Button>

            <Box textAlign="center">
                <Link to="/">
                    <Typography color='primary' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Back to login
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default UpdatePasswordForm;
