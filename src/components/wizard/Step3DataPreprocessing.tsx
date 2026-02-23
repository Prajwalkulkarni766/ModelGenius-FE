import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Typography, Box, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
import { ModelStepProps } from '../../types/Model';
import { settingDataCleaningMethodService } from "../../services/modelService";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAsyncAction } from "../../hooks/useAsyncAction";

type PreprocessingFormValues = {
    handlingMissingValueStrategy: string;
    encodingCategoricalMethod: string;
    normalizationTechnique: string;
};

const Step3DataPreprocessing = ({ projectId, goToNextStep, modelId }: ModelStepProps) => {
    const { showSnackbar } = useSnackbar();
    const { execute, loading } = useAsyncAction();
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PreprocessingFormValues>({
        defaultValues: {
            handlingMissingValueStrategy: '',
            encodingCategoricalMethod: '',
            normalizationTechnique: '',
        },
    });

    const onSubmit: SubmitHandler<PreprocessingFormValues> = async (data) => {
        await execute(async () => {
            const response = await settingDataCleaningMethodService(projectId, modelId, data.handlingMissingValueStrategy, data.encodingCategoricalMethod, data.normalizationTechnique);

            if (response) {
                goToNextStep();
            } else {
                showSnackbar("Failed to save preprocessing settings.", "error");
            }
        });
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
                name="handlingMissingValueStrategy"
                control={control}
                rules={{ required: "Please select a cleaning strategy" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.handlingMissingValueStrategy}>
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
                            <MenuItem value="knn">KNN Imputation</MenuItem>
                            <MenuItem value="interpolation">Interpolation</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {/* Encoding Method */}
            <Typography variant="h6" mb={1}>Encoding Categorical Data</Typography>
            <Controller
                name="encodingCategoricalMethod"
                control={control}
                rules={{ required: "Please select an encoding method" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.encodingCategoricalMethod}>
                        <InputLabel>Method</InputLabel>
                        <Select {...field} label="Method">
                            <MenuItem value="one_hot">One-Hot Encoding</MenuItem>
                            <MenuItem value="label">Label Encoding</MenuItem>
                            <MenuItem value="ordinal">Ordinal Encoding</MenuItem>
                            <MenuItem value="binary">Binary Encoding</MenuItem>
                            <MenuItem value="frequency">Frequency Encoding</MenuItem>
                            <MenuItem value="target">Target Encoding</MenuItem>
                            <MenuItem value="hashing">Hashing Encoding</MenuItem>
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
                            <MenuItem value="power_transform">Power Transform</MenuItem>
                            <MenuItem value="quantile">Quantile Transform</MenuItem>
                            <MenuItem value="none">None</MenuItem>
                        </Select>
                    </FormControl>
                )}
            />

            {/* Submit */}
            <Box display="flex" justifyContent="center" mt={4}>
                <Button type="submit" variant="contained" color="primary" size="large" disabled={loading}>
                    {loading ? 'Saving...' : 'Save & next'}
                </Button>
            </Box>
        </Box>
    );
};

export default Step3DataPreprocessing;
