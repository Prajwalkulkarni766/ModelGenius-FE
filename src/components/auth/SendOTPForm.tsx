import { Button, TextField } from '@mui/material';

interface SendOTPFormProps {
    onSuccess: () => void;
}

const SendOTPForm = ({ onSuccess }: SendOTPFormProps) => {

    const sendOTP = () => {
        onSuccess();
    }

    return (
        <>
            <TextField
                id="email"
                label="Email"
                type="email"
                variant="outlined"
                required
                fullWidth
            />
            <Button onClick={sendOTP} variant="contained" color="primary" size="large" fullWidth>
                Send OTP
            </Button>
        </>
    );
};

export default SendOTPForm;
