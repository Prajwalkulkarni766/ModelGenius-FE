import { Typography, Box, Button } from "@mui/material";
import MetricsCard from "./MetricsCard";
import { ModelStepProps } from '../../types/Model';

const Step5EvaluationMetrics = ({ goToNextStep }: ModelStepProps) => {

    const metricsCardData = [
        { title: 'Accuracy', value: 85.02 },
        { title: 'Precision', value: 85.02 },
        { title: 'Recall', value: 85.02 },
        { title: 'F1-score', value: 85.02 }
    ]

    return (
        <>
            {/* Step: 5 */}
            {/* TODO: work on step five give performance metrices */}
            <Box mt={5} sx={{ display: "flex", flexDirection: 'column' }} gap={2}>
                <Typography variant="h5">Evaluation Metrics Overview</Typography>
                <Box mt={2} sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: "center"
                }}>
                    {metricsCardData.map((data, index) => (
                        <MetricsCard parameter={data.title} value={data.value} key={index} />
                    ))}
                </Box>

                <Typography color="textSecondary" mb={5}>If you are not satisfied with the evalution matrix then you can take help of our AI agent. To take help of AI save the model and modify model later</Typography>
            </Box>

            <Box display="flex" justifyContent="center" mt={4}>
                <Button type="submit" variant="contained" color="primary" size="large" onClick={goToNextStep}>
                    Save & next
                </Button>
            </Box>

        </>
    )
}

export default Step5EvaluationMetrics;