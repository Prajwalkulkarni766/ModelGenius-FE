import { Button, TextField, Typography } from '@mui/material';

interface VerifyOTPFormProps {
    onSuccess: () => void;
}

const VerifyOTPForm = ({ onSuccess }: VerifyOTPFormProps) => {

    const verifyOTP = () => {
        onSuccess();
    }

    return (
        <>
            <Typography textAlign={"center"}>Enter otp sent to your email address</Typography>
            <TextField
                id="otp"
                label="OTP"
                type="text"
                variant="outlined"
                required
                fullWidth
            />
            <Button onClick={verifyOTP} variant="contained" color="primary" size="large" fullWidth>
                Verify OTP
            </Button>
        </>
    );
};

export default VerifyOTPForm;
