import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import SendOTPForm from './SendOTPForm';
import VerifyOTPForm from './VerifyOTPForm';
import UpdatePasswordForm from './UpdatePasswordForm';

const ForgotPasswordForm = () => {

    type Step = "step1" | "step2" | "step3";
    const [currentStep, setCurrentStep] = useState<Step>("step1");

    const updateStep = (nextStep: Step) => {
        setCurrentStep(nextStep);
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case "step1":
                return <SendOTPForm onSuccess={() => updateStep("step2")} />;
            case "step2":
                return <VerifyOTPForm onSuccess={() => updateStep("step3")} />;
            case "step3":
                return <UpdatePasswordForm />;
            default:
                return null;
        }
    };

    return (
        <>
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
            >
                <Typography variant="h3" textAlign="center" mt={2} component="div">
                    ModelGenius
                </Typography>
                <Typography variant="h6" color='textSecondary' textAlign="center" mb={1}>
                    Reset Password
                </Typography>

                {renderCurrentStep()}

            </Box>
        </>
    );
};

export default ForgotPasswordForm;
