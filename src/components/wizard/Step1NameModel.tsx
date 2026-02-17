import { Typography, Box, TextField, Button } from "@mui/material";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useState } from 'react';
import { BaseModelStepProps, ModelName } from '../../types/Model';
import { createNewModel } from "../../services/modelService";
import { modelStore } from "../../store/modelStore";
import { useSnackbar } from "../../hooks/useSnackbar";

const Step1NameModel = ({ projectId, goToNextStep }: BaseModelStepProps) => {

    const { setModel } = modelStore();
    const [modelCreationError, setModelCreationError] = useState<string | null>(null);
    const { showSnackbar } = useSnackbar();

    const { control, handleSubmit, formState: { errors } } = useForm<ModelName>({
        defaultValues: {
            modelName: "",
        }
    });

    const onSubmit: SubmitHandler<ModelName> = async (data) => {
        try {
            const response = await createNewModel(projectId, data.modelName);

            if (response) {
                setModelCreationError(null);
                setModel(response.data);
                goToNextStep();
            }
            else {
                setModelCreationError("Failed to create model")
                showSnackbar("Failed to create model. Please try again.", "error");
            }
        } catch (error) {
            setModelCreationError("" + error);
            showSnackbar("An error occurred. Please try again.", "error");
            console.error(error);
        }
    };

    return (
        <Box
            component="form"
            mt={5}
            sx={{ display: "flex", flexDirection: 'column', gap: 2 }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Typography variant="h5">Name your model</Typography>

            <Controller
                name="modelName"
                control={control}
                rules={{ required: "Model name is required" }}
                render={({ field }) => (
                    <TextField
                        {...field}
                        id="modelName"
                        type="text"
                        variant="outlined"
                        required
                        fullWidth
                        error={!!errors.modelName}
                        helperText={errors.modelName?.message}
                    />
                )}
            />

            {modelCreationError && (
                <Typography color="error" textAlign="center" mt={2}>
                    {modelCreationError}
                </Typography>
            )}

            <Box display={"flex"} mt={2} mx={10} gap={3} justifyContent={'center'} alignItems={'center'}>
                <Button type="submit" variant="contained" color="primary" size="large">
                    Save & next
                </Button>
            </Box>
        </Box >
    );
};

export default Step1NameModel;
