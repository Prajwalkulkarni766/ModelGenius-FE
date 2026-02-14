import { Button, Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { signupService } from "../../services/authService";
import { useState } from 'react';
import { SignupUser } from "../../types/User";
import { Visibility, VisibilityOff } from '@mui/icons-material';

const SignupForm = () => {

    const navigate = useNavigate();
    const [signupError, setSignupError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm<SignupUser>({
        defaultValues: {
            username: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<SignupUser> = async (data) => {
        setIsLoading(true);
        try {
            const signupSuccess = await signupService(data.username, data.email, data.password);

            if (signupSuccess) {
                navigate("/");
            } else {
                setSignupError("Something went wrong. Please try again.");
            }
        } catch (error) {
            setSignupError("An error occurred. Please try again later.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

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
            <Typography variant="h4" textAlign="center" my={2} component="div" fontWeight={600}>
                ModelGenius
            </Typography>
            <Typography variant="h6" textAlign="center" mb={3} color="text.secondary">
                Sign Up to ModelGenius
            </Typography>

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

            {signupError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {signupError}
                </Typography>
            )}

            <Button 
                type='submit' 
                variant="contained" 
                color="primary" 
                size="large" 
                fullWidth
                disabled={isLoading}
                sx={{ mt: 1 }}
            >
                {isLoading ? 'Creating account...' : 'Sign Up'}
            </Button>
            <Box textAlign="center">
                <Link to="/">
                    <Typography color='primary' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Have an account? Sign In
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default SignupForm;
