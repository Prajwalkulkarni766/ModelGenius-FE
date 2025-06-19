import { Button, Box, TextField, Typography } from '@mui/material';
import { Link } from 'react-router';

const UpdatePasswordForm = () => {

    const updatePassword = () => { }

    return (
        <>
            <TextField
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                required
                fullWidth
            />
            <TextField
                id="password"
                label="Renter Password"
                type="password"
                variant="outlined"
                required
                fullWidth
            />
            <Button onClick={updatePassword} variant="contained" color="primary" size="large" fullWidth>
                Update Password
            </Button>

            <Box textAlign="center" mt={3}>
                <Typography>Password updated successfully. Go back to <Link to="/" color='inherit'>login page</Link></Typography>
            </Box>
            <Box textAlign="center" mt={3}>
                <Typography>Problem while updating Password. Please try again later after sometime. Go back to <Link to="/" color='inherit'>login page</Link></Typography>
            </Box>
        </>
    );
};

export default UpdatePasswordForm;