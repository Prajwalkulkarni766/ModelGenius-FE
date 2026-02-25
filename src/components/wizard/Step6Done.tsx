import { Typography, Box, Button } from "@mui/material";
import { ModelStepProps } from '../../types/Model';
import { useNavigate } from 'react-router';
import { modelStore } from '../../store/modelStore';

const Step6Done = ({ projectId }: ModelStepProps) => {
    const navigate = useNavigate();
    const clearModel = modelStore((state) => state.clearModel);

    const handleDone = () => {
        clearModel();
        navigate(`/projects/${projectId}`);
    };

    return (
        <>
            {/* Step: 6 */}
            <Box mt={5} sx={{ display: "flex", flexDirection: 'column' }} gap={2}>
                <Typography align="center" variant="h4" mt={5} >Congratulations🥳! Done with Model setup. </Typography>

                <Box mt={3} display="flex" justifyContent="center">
                    <Button sx={{ mt: "5" }} variant="contained" color="primary" onClick={handleDone}>
                        Done
                    </Button>
                </Box>
            </Box>
        </>
    )
}

export default Step6Done;