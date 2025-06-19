import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Typography, Box, Radio, FormControlLabel, RadioGroup, FormControl, Button } from "@mui/material";
import { ModelStepProps } from '../../types/Model';
import { setMachineLearningModelService } from "../../services/modelService";
import { useState } from "react";

type ModelSelectionForm = {
    selectedModel: string;
};

const Step4SelectModel = ({ projectId, goToNextStep, modelId }: ModelStepProps) => {
    const [modelSelectionError, setModelSelectionError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<ModelSelectionForm>({
        defaultValues: {
            selectedModel: "",
        },
    });

    const onSubmit: SubmitHandler<ModelSelectionForm> = async (data) => {
        try {
            const { requestStatus } = await setMachineLearningModelService(projectId, modelId, data.selectedModel);

            if (requestStatus) {
                setModelSelectionError(null);
                goToNextStep();
            } else {
                setModelSelectionError("Failed to save selected model");
            }
        } catch (error) {
            setModelSelectionError("Error during model selection submission: " + error);
        }
    };

    return (
        <Box
            component="form"
            mt={5}
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: 'column' }}
            gap={2}
        >
            <Typography variant="h5">Select Machine Learning Models</Typography>
            <Typography component={'p'}>
                Choose from a variety of algorithms to train your model. You can evaluate your model performance using metrics such as accuracy, precision, recall and F1 score.
            </Typography>

            <Typography variant="h6" mt={2}>Available Algorithms</Typography>

            <Controller
                name="selectedModel"
                control={control}
                rules={{ required: "Please select a machine learning model" }}
                render={({ field }) => (
                    <FormControl error={!!errors.selectedModel}>
                        <RadioGroup {...field} name="ml-model-selection">
                            <FormControlLabel value="logistic" control={<Radio />} label="Logistic Regression" />
                            <FormControlLabel value="knn" control={<Radio />} label="K-Nearest Neighbors (KNN)" />
                            <FormControlLabel value="svm" control={<Radio />} label="Support Vector Machine (SVM)" />
                            <FormControlLabel value="random_forest" control={<Radio />} label="Random Forest" />
                            <FormControlLabel value="gradient_boosting" control={<Radio />} label="Gradient Boosting" />
                        </RadioGroup>
                        {errors.selectedModel && (
                            <Typography color="error" mt={1}>
                                {errors.selectedModel.message}
                            </Typography>
                        )}
                    </FormControl>
                )}
            />

            {modelSelectionError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {modelSelectionError}
                </Typography>
            )}

            <Box display="flex" justifyContent="center" mt={4}>
                <Button type="submit" variant="contained" color="primary" size="large">
                    Save & next
                </Button>
            </Box>
        </Box>
    );
};

export default Step4SelectModel;
