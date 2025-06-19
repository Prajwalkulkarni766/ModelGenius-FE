import { Typography } from "@mui/material";
import Layout from "../layouts/Layout";
import ProgressBar from "../components/wizard/ProgressBar";
import { useState } from "react";
import { projectStore } from "../store/projectStore";
import { modelStore } from "../store/modelStore";

import Step1NameModel from "../components/wizard/Step1NameModel";
import Step2UploadData from "../components/wizard/Step2UploadData";
import Step3DataPreprocessing from "../components/wizard/Step3DataPreprocessing";
import Step4SelectModel from "../components/wizard/Step4SelectModel";
import Step5EvaluationMetrics from "../components/wizard/Step5EvaluationMetrics";
import Step6Done from "../components/wizard/Step6Done";

const NewModelWizard = () => {
    type Step = "step1" | "step2" | "step3" | "step4" | "step5" | "step6";
    const steps: Step[] = ["step1", "step2", "step3", "step4", "step5", "step6"];
    const [currentStep, setCurrentStep] = useState<Step>("step1");

    const { project } = projectStore();
    const { model } = modelStore();
    const currentIndex = steps.indexOf(currentStep);

    const goToNextStep = () => {
        const nextStep = steps[currentIndex + 1];
        if (nextStep) setCurrentStep(nextStep);
    };

    // const goToBackStep = () => {
    //     if (currentIndex > 0) {
    //         setCurrentStep(steps[currentIndex - 1]);
    //     }
    // };

    const renderCurrentStep = () => {
        switch (currentStep) {
            case "step1":
                return <Step1NameModel modelId={null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            case "step2":
                return <Step2UploadData modelId={model?._id ?? null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            case "step3":
                return <Step3DataPreprocessing modelId={model?._id ?? null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            case "step4":
                return <Step4SelectModel modelId={model?._id ?? null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            case "step5":
                return <Step5EvaluationMetrics modelId={model?._id ?? null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            case "step6":
                return <Step6Done modelId={model?._id ?? null} projectId={project?._id ?? null} goToNextStep={goToNextStep} />;
            default:
                return null;
        }
    };

    return (
        <Layout>
            <Typography variant={'h4'} mb={2}>New Model</Typography>
            <ProgressBar activeStep={currentIndex} />
            {renderCurrentStep()}
        </Layout>
    );
};

export default NewModelWizard;
