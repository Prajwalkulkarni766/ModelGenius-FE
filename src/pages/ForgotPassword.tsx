import { Box } from "@mui/material"
import ForgotPasswordForm from "../components/auth/ForgotPasswordForm";

const ForgotPassword = () => {
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh">
            <Box
                component="div"
                sx={{
                    p: 4,
                    maxWidth: '360',
                }}
            >
                <ForgotPasswordForm />
            </Box>
        </Box>
    )
}

export default ForgotPassword;