import { Button, Box, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { loginService } from "../../services/authService";
import { useState } from 'react';
import { LoginUser } from '../../types/User';
import { userStore } from '../../store/userStore';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = userStore();
    const [loginError, setLoginError] = useState<string | null>(null);

    // Initialize react-hook-form
    const { control, handleSubmit, formState: { errors } } = useForm<LoginUser>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    // Handle form submission
    const onSubmit: SubmitHandler<LoginUser> = async (data) => {
        try {
            // Assuming loginService handles the API call for login.
            const { requestStatus, responseData } = await loginService(data.email, data.password);
            if (requestStatus) {
                console.log(responseData.user)
                setUser(responseData.user)
                navigate("/home"); // Navigate to home on successful login
            } else {
                setLoginError("Invalid credentials. Please try again."); // Show error if login fails
            }
        } catch (error) {
            setLoginError("" + error);
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
                Sign In to ModelGenius
            </Typography>

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

            {/* Display error message if login fails */}
            {loginError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {loginError}
                </Typography>
            )}

            <Link to="/forgot-password">
                <Typography color='primary' textAlign={"right"}>Forgot password?</Typography>
            </Link>

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
                Login
            </Button>

            <Box textAlign="center">
                <Link to="/signup">
                    <Typography color='primary'>Don&apos;t have an account? Sign Up</Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
