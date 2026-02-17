import { Button, Box, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { deleteAccountService } from "../../services/settingService";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from "../../hooks/useSnackbar";

const DeleteAccountForm = () => {

    const navigate = useNavigate();
    const [deleteAccountError, setDeleteAccountError] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();

    // Initialize react-hook-form
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            password: '',
        }
    });

    // Handle form submission
    const onSubmit = async (data: { password: string }) => {
        try {
            // Assuming signupService handles the API call for login.
            const deleteAccountSuccess = await deleteAccountService(data.password);

            if (deleteAccountSuccess) {
                navigate("/");
            } else {
                setDeleteAccountError("Something went wrong. Please try again.");
                showSnackbar("Failed to delete account. Please try again.", "error");
            }
            setDeleteAccountError(null);
        } catch (error) {
            setDeleteAccountError("An error occurred. Please try again later.");
            showSnackbar("An error occurred. Please try again later.", "error");
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                maxWidth: '450px',
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
            <Typography color='textSecondary'>Deleting your account is permanent and cannot be undone.</Typography>

            {/* Password field */}
            <Controller
                name="password"
                control={control}
                rules={{
                    required: "Password is required",
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

            {/* Display error message if delete account fails */}
            {deleteAccountError && (
                <Typography color="error">
                    {deleteAccountError}
                </Typography>
            )}

            <Button type="submit" variant="contained" color="error" size="large" fullWidth>
                Delete Account
            </Button>
        </Box>
    );
};

export default DeleteAccountForm;
