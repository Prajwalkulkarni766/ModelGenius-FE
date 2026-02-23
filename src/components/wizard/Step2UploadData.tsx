import { useEffect, useState } from "react";
import { Box, Typography, Button, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ModelStepProps } from "../../types/Model";
import { Dataset } from "../../types/Dataset";
import { getDatasetService, getDatasetColumnsService } from "../../services/datasetService";
import { setModelDatasetsService, setTargetColumnService } from "../../services/modelService";
import Layout from "../../layouts/Layout";
import { useSnackbar } from "../../hooks/useSnackbar";
import { useAsyncAction } from "../../hooks/useAsyncAction";

type Step2Form = {
    datasetId: string;
    targetColumn: string;
};

const Step2UploadData = ({ projectId, goToNextStep, modelId }: ModelStepProps) => {
    const [datasets, setDatasets] = useState<Dataset[]>([]);
    const [columns, setColumns] = useState<string[]>([]);
    const { showSnackbar } = useSnackbar();
    const { execute, loading } = useAsyncAction();

    const { control, handleSubmit, watch, formState: { errors } } = useForm<Step2Form>({
        defaultValues: {
            datasetId: "",
            targetColumn: "",
        },
    });

    const selectedDatasetId = watch("datasetId");

    useEffect(() => {
        // Fetch datasets for this project
        const fetchDatasets = async () => {
            try {
                const response = await getDatasetService(projectId);

                if (response) {
                    setDatasets(response.data);
                }
            } catch (err) {
                console.error(err);
                showSnackbar("Failed to load datasets.", "error");
            }
        };
        fetchDatasets();
    }, [projectId]);

    useEffect(() => {
        // When a dataset is selected, fetch its columns
        if (selectedDatasetId) {
            const fetchColumns = async () => {
                try {
                    const response = await getDatasetColumnsService(projectId, selectedDatasetId);

                    if (response) {
                        setColumns(response.data);
                    }
                } catch (err) {
                    console.error(err);
                    showSnackbar("Failed to load columns for selected dataset.", "error");
                }
            };
            fetchColumns();
        } else {
            setColumns([]);
        }
    }, [projectId, selectedDatasetId]);

    const onSubmit: SubmitHandler<Step2Form> = async (data) => {
        await execute(async () => {
            if (!data.datasetId) throw new Error("Dataset not selected");
            if (!data.targetColumn) throw new Error("Target column not selected");

            // Save selected dataset to model
            const datasetResponse = await setModelDatasetsService(projectId, modelId, data.datasetId);
            if (!datasetResponse) throw new Error("Failed to set dataset");

            // Save target column to model
            const targetResponse = await setTargetColumnService(projectId, modelId, data.targetColumn);
            if (!targetResponse) throw new Error("Failed to set target column");

            goToNextStep();
        });
    };

    if (!modelId) {
        return (
            <Layout>
                <Typography color="error">Invalid model ID</Typography>
            </Layout>
        );
    }

    return (
        <Box component="form" mt={5} sx={{ display: "flex", flexDirection: "column", gap: 3 }} onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h5">Select Dataset & Target Column</Typography>
            <Typography>Select one dataset and the column you want to predict</Typography>

            {/* Dataset select */}
            <Controller
                name="datasetId"
                control={control}
                rules={{ required: "Please select a dataset" }}
                render={({ field }) => (
                    <FormControl fullWidth error={!!errors.datasetId}>
                        <InputLabel>Dataset</InputLabel>
                        <Select {...field} label="Dataset">
                            {datasets.map(d => (
                                <MenuItem key={d._id} value={d._id}>{d.originalFileName}</MenuItem>
                            ))}
                        </Select>
                        {errors.datasetId && <Typography color="error" variant="caption">{errors.datasetId.message}</Typography>}
                    </FormControl>
                )}
            />

            {/* Target column select */}
            {columns.length > 0 && (
                <Controller
                    name="targetColumn"
                    control={control}
                    rules={{ required: "Please select a target column" }}
                    render={({ field }) => (
                        <FormControl fullWidth error={!!errors.targetColumn}>
                            <InputLabel>Target Column</InputLabel>
                            <Select {...field} label="Target Column">
                                {columns.map(col => (
                                    <MenuItem key={col} value={col}>{col}</MenuItem>
                                ))}
                            </Select>
                            {errors.targetColumn && <Typography color="error" variant="caption">{errors.targetColumn.message}</Typography>}
                        </FormControl>
                    )}
                />
            )}

            <Box display="flex" justifyContent="center" mt={4}>
                <Button type="submit" variant="contained" size="large" disabled={loading}>
                    {loading ? 'Saving...' : 'Save & Next'}
                </Button>
            </Box>
        </Box>
    );
};

export default Step2UploadData;
