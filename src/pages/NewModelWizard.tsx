import { Typography } from "@mui/material";
import Layout from "../layouts/Layout";
import ProgressBar from "../components/wizard/ProgressBar";
import { useState } from "react";
import { modelStore } from "../store/modelStore";
import { useParams } from "react-router-dom";

import Step1NameModel from "../components/wizard/Step1NameModel";
import Step2UploadData from "../components/wizard/Step2UploadData";
import Step3DataPreprocessing from "../components/wizard/Step3DataPreprocessing";
import Step4SelectModel from "../components/wizard/Step4SelectModel";
import Step5EvaluationMetrics from "../components/wizard/Step5EvaluationMetrics";
import Step6Done from "../components/wizard/Step6Done";

const NewModelWizard = () => {
    const { projectId } = useParams<{ projectId: string }>();

    type Step =
        | "step1"
        | "step2"
        | "step3"
        | "step4"
        | "step5"
        | "step6";

    const steps: Step[] = [
        "step1",
        "step2",
        "step3",
        "step4",
        "step5",
        "step6",
    ];

    const [currentStep, setCurrentStep] = useState<Step>("step1");

    const { model } = modelStore();
    const modelId = model?._id || '';
    const currentIndex = steps.indexOf(currentStep);

    const goToNextStep = () => {
        const nextStep = steps[currentIndex + 1];
        if (nextStep) setCurrentStep(nextStep);
    };

    if (!projectId) {
        return (
            <Layout>
                <Typography color="error">Invalid project ID</Typography>
            </Layout>
        );
    }

    if (currentStep !== "step1" && !modelId) {
        return (
            <Layout>
                <Typography color="error">
                    Model not created yet. Please complete step 1.
                </Typography>
            </Layout>
        );
    }

    const renderCurrentStep = () => {
        switch (currentStep) {
            case "step1":
                return <Step1NameModel projectId={projectId} goToNextStep={goToNextStep} />;

            case "step2":
                return <Step2UploadData modelId={modelId} projectId={projectId} goToNextStep={goToNextStep} />;

            case "step3":
                return <Step3DataPreprocessing modelId={modelId} projectId={projectId} goToNextStep={goToNextStep} />;

            case "step4":
                return <Step4SelectModel modelId={modelId} projectId={projectId} goToNextStep={goToNextStep} />;

            case "step5":
                return <Step5EvaluationMetrics modelId={modelId} projectId={projectId} goToNextStep={goToNextStep} />;

            case "step6":
                return <Step6Done modelId={modelId} projectId={projectId} goToNextStep={goToNextStep} />;

            default:
                return null;
        }
    };


    return (
        <Layout>
            <Typography variant="h4" mb={2}>
                New Model
            </Typography>
            <ProgressBar activeStep={currentIndex} />
            {renderCurrentStep()}
        </Layout>
    );
};

export default NewModelWizard;
