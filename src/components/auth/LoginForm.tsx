import { Button, Box, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { loginService } from "../../services/authService";
import { useState } from 'react';
import { LoginUser } from '../../types/User';
import { userStore } from '../../store/userStore';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useSnackbar } from '../../hooks/useSnackbar';
import { useAsyncAction } from '../../hooks/useAsyncAction';

const LoginForm = () => {
    const navigate = useNavigate();
    const { setUser } = userStore();
    const [showPassword, setShowPassword] = useState(false);
    const { execute, loading: isLoading } = useAsyncAction();
    const { showSnackbar } = useSnackbar();

    const { control, handleSubmit, formState: { errors } } = useForm<LoginUser>({
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const onSubmit: SubmitHandler<LoginUser> = async (data) => {
        await execute(async () => {
            try {
                const { requestStatus, responseData } = await loginService(data.email, data.password);
                if (requestStatus) {
                    setUser(responseData.data.user)
                    navigate("/home");
                } else {
                    showSnackbar("Login failed. Please check your credentials.", "error");
                }
            } catch {
                showSnackbar("Login failed. Please check your credentials.", "error");
            }
        });
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
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <img
                        src="icon.ico"
                        alt="Logo"
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                </Box>
            </Box>
            <Typography variant="h4" textAlign="center" component="div" fontWeight={600}>
                ModelGenius
            </Typography>
            <Typography variant="h6" textAlign="center" mb={2} color="text.secondary">
                Sign In to ModelGenius
            </Typography>

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

            <Link to="/forgot-password">
                <Typography color='primary' textAlign={"right"} sx={{ '&:hover': { textDecoration: 'underline' } }}>
                    Forgot password?
                </Typography>
            </Link>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
                disabled={isLoading}
                sx={{ mt: 1 }}
            >
                {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>

            <Box textAlign="center">
                <Link to="/signup">
                    <Typography color='primary' sx={{ '&:hover': { textDecoration: 'underline' } }}>
                        Don&apos;t have an account? Sign Up
                    </Typography>
                </Link>
            </Box>
        </Box>
    );
};

export default LoginForm;
