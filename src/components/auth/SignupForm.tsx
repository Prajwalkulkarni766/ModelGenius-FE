import { Button, Box, TextField, Typography } from '@mui/material';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signupService } from "../../services/authService";
import { useState } from 'react';
import { SignupUser } from "../../types/User";

const SignupForm = () => {

    const navigate = useNavigate();
    const [signupError, setSignupError] = useState<string | null>(null);

    // Initialize react-hook-form
    const { control, handleSubmit, formState: { errors } } = useForm<SignupUser>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    // Handle form submission
    const onSubmit: SubmitHandler<SignupUser> = async (data) => {
        try {
            // Assuming signupService handles the API call for login.
            const signupSuccess = await signupService(data.username, data.email, data.password);

            if (signupSuccess) {
                navigate("/home");
            } else {
                setSignupError("Something went wrong. Please try again.");
            }
        } catch (error) {
            setSignupError("An error occurred. Please try again later.");
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                m: 'auto',
                maxWidth: '360px',
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
            <Typography variant="h3" textAlign="center" my={2} component="div">
                ModelGenius
            </Typography>
            <Typography variant="h5" textAlign="center" mb={3}>
                Sign Up to ModelGenius
            </Typography>

            {/* Username Field */}
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

            {/* Password Field */}
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
                        type="password"
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.password}
                        helperText={errors.password?.message}
                    />
                )}
            />

            {/* Display error message if signup fails */}
            {signupError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {signupError}
                </Typography>
            )}

            <Button type='submit' variant="contained" color="primary" size="large" fullWidth>
                Signup
            </Button>
            <Box textAlign="center">
                <Link to="/">
                    <Typography color='primary'>Have an account? Sign In</Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default SignupForm;
