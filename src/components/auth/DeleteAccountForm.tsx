import { Button, Box, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { deleteAccountService } from "../../services/settingService";
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSnackbar } from "../../hooks/useSnackbar";
import ConfirmDialog from "../ConfirmDialog";

const DeleteAccountForm = () => {

    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [pendingPassword, setPendingPassword] = useState<string | null>(null);

    // Initialize react-hook-form
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            password: '',
        }
    });

    // Handle form submission
    const onSubmit = async (data: { password: string }) => {
        setPendingPassword(data.password);
        setDeleteDialogOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!pendingPassword) return;
        try {
            const deleteAccountSuccess = await deleteAccountService(pendingPassword);

            if (deleteAccountSuccess) {
                navigate("/");
            } else {
                showSnackbar("Failed to delete account. Please try again.", "error");
            }
        } catch (error) {
            showSnackbar("An error occurred. Please try again later.", "error");
            console.error(error);
        }
        setDeleteDialogOpen(false);
        setPendingPassword(null);
    };

    const handleCancelDelete = () => {
        setDeleteDialogOpen(false);
        setPendingPassword(null);
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

            <Button type="submit" variant="contained" color="error" size="large" fullWidth>
                Delete Account
            </Button>

            <ConfirmDialog
                open={deleteDialogOpen}
                title="Delete Account"
                message="This will permanently delete your account and all associated data. This action cannot be undone."
                confirmText="Delete Account"
                cancelText="Cancel"
                confirmColor="error"
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </Box>
    );
};

export default DeleteAccountForm;
