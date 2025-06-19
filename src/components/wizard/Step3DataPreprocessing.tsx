import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { ModelStepProps } from '../../types/Model';
import { settingDataCleaningMethodService } from "../../services/modelService";
import { useState } from "react";

type PreprocessingFormValues = {
    cleaningStrategy: string;
    encodingMethod: string;
    normalizationTechnique: string;
};

const Step3DataPreprocessing = ({ projectId, goToNextStep, modelId }: ModelStepProps) => {
    const [dataPreProcessingError, setDataPreProcessingError] = useState<string | null>(null);
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PreprocessingFormValues>({
        defaultValues: {
            cleaningStrategy: '',
            encodingMethod: '',
            normalizationTechnique: '',
        },
    });

    const onSubmit: SubmitHandler<PreprocessingFormValues> = async (data) => {
        try {
            const { requestStatus } = await settingDataCleaningMethodService(projectId, modelId, data.cleaningStrategy, data.encodingMethod, data.normalizationTechnique);

            if (requestStatus) {
                setDataPreProcessingError(null);
                goToNextStep();
            } else {
                setDataPreProcessingError("Failed to save preprocessing settings.");
            }
        } catch (error) {
            setDataPreProcessingError("Error during preprocessing submission: " + error);
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
            <Typography variant="h5">Data Cleaning</Typography>

            {/* Cleaning Strategy */}
            <Typography variant="h6" mb={1}>Handling Missing Value</Typography>
            <Controller
                name="cleaningStrategy"
                control={control}
                rules={{ required: "Please select a cleaning strategy" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.cleaningStrategy}>
                        <InputLabel>Strategy</InputLabel>
                        <Select {...field} label="Strategy">
                            <MenuItem value="drop_rows">Remove rows with nulls</MenuItem>
                            <MenuItem value="drop_columns">Remove columns with nulls</MenuItem>
                            <MenuItem value="mean">Fill missing with mean</MenuItem>
                            <MenuItem value="median">Fill missing with median</MenuItem>
                            <MenuItem value="mode">Fill missing with mode</MenuItem>
                            <MenuItem value="constant">Fill with constant</MenuItem>
                            <MenuItem value="ffill">Forward fill</MenuItem>
                            <MenuItem value="bfill">Backward fill</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {/* Encoding Method */}
            <Typography variant="h6" mb={1}>Encoding Categorical Data</Typography>
            <Controller
                name="encodingMethod"
                control={control}
                rules={{ required: "Please select an encoding method" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.encodingMethod}>
                        <InputLabel>Method</InputLabel>
                        <Select {...field} label="Method">
                            <MenuItem value="one_hot">One-Hot Encoding</MenuItem>
                            <MenuItem value="label">Label Encoding</MenuItem>
                            <MenuItem value="ordinal">Ordinal Encoding</MenuItem>
                            <MenuItem value="binary">Binary Encoding</MenuItem>
                            <MenuItem value="frequency">Frequency Encoding</MenuItem>
                            <MenuItem value="target">Target Encoding</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {/* Normalization Technique */}
            <Typography variant="h6" mb={1}>Normalization</Typography>
            <Controller
                name="normalizationTechnique"
                control={control}
                rules={{ required: "Please select a normalization technique" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.normalizationTechnique}>
                        <InputLabel>Technique</InputLabel>
                        <Select {...field} label="Technique">
                            <MenuItem value="min_max">Min-Max Scaling</MenuItem>
                            <MenuItem value="zscore">Standard Scaling (Z-score)</MenuItem>
                            <MenuItem value="robust">Robust Scaling</MenuItem>
                            <MenuItem value="maxabs">MaxAbs Scaling</MenuItem>
                            <MenuItem value="log">Log Transformation</MenuItem>
                            <MenuItem value="none">None</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {dataPreProcessingError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {dataPreProcessingError}
                </Typography>
            )}

            {/* Submit */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Button type="submit" variant="contained" color="primary" size="large">
                    Save & next
                </Button>
            </Box>
        </Box>
    );
};

export default Step3DataPreprocessing;
