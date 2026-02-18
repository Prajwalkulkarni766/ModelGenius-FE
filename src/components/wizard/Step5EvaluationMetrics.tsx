import { useEffect, useState } from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import MetricsCard from "./MetricsCard";
import { ModelStepProps } from "../../types/Model";
import { trainModelService } from "../../services/modelService";
import { useSnackbar } from "../../hooks/useSnackbar";

type Metrics = {
    accuracy?: number;
    precision?: number;
    recall?: number;
    f1?: number;

    mse?: number;
    rmse?: number;
    r2_score?: number;
};

const Step5EvaluationMetrics = ({ projectId, modelId, goToNextStep }: ModelStepProps) => {
    const [metrics, setMetrics] = useState<Metrics | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        const trainModel = async () => {
            if (!projectId || !modelId) {
                showSnackbar("Invalid project or model ID", "error");
                setLoading(false);
                return;
            }

            try {
                const response = await trainModelService(projectId, modelId);

                if (response && response.data) {
                    setMetrics(response.data);
                    showSnackbar("Model trained successfully!", "success");
                } else {
                    showSnackbar("Failed to train the model.", "error");
                }
            } catch (err) {
                console.error(err);
                showSnackbar("Error occurred during model training.", "error");
            } finally {
                setLoading(false);
            }
        };

        trainModel();
    }, [projectId, modelId]);

    return (
        <Box mt={5} sx={{ display: "flex", flexDirection: "column" }} gap={2}>
            <Typography variant="h5">Evaluation Metrics Overview</Typography>

            {loading && (
                <Box display="flex" justifyContent="center" mt={4}>
                    <CircularProgress />
                    <Typography ml={2}>Training model and computing metrics...</Typography>
                </Box>
            )}

            {!loading && metrics && (
                <Box mt={2} sx={{ display: "flex", gap: 2, justifyContent: "center", flexWrap: "wrap" }}>
                    {metrics.accuracy ? (
                        <>
                            <MetricsCard parameter="Accuracy" value={(metrics.accuracy ?? 0).toFixed(2)} />
                            <MetricsCard parameter="Precision" value={(metrics.precision ?? 0).toFixed(2)} />
                            <MetricsCard parameter="Recall" value={(metrics.recall ?? 0).toFixed(2)} />
                            <MetricsCard parameter="F1-score" value={(metrics.f1 ?? 0).toFixed(2)} />
                        </>
                    ) : (
                        <>
                            <MetricsCard parameter="MSE" value={(metrics.mse ?? 0).toFixed(2)} />
                            <MetricsCard parameter="RMSE" value={(metrics.rmse ?? 0).toFixed(2)} />
                            <MetricsCard parameter="R2 Score" value={(metrics.r2_score ?? 0).toFixed(2)} />
                        </>
                    )}
                </Box>
            )}

            {!loading && metrics && (
                <>
                    <Typography color="textSecondary" mb={5} mt={3} textAlign="center">
                        If you are not satisfied with the evaluation metrics, you can take help from our AI agent.
                        Save the model and modify it later if needed.
                    </Typography>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            size="large"
                            onClick={goToNextStep}
                        >
                            Save & Next
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

export default Step5EvaluationMetrics;
