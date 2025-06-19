import { Box, Typography } from "@mui/material";
import Input from '@mui/material/Input';


const ariaLabel = { 'aria-label': 'description' };

const AIAgent = () => {
    return (
        <Box p={3} display={"flex"} flexDirection={"column"} gap={2}>
            <Typography color="textSecondary">
                Take help of AI Agent if you want to improve your model
            </Typography>

            <Input placeholder="Enter your prompt" inputProps={ariaLabel} />
        </Box>
    )
}

export default AIAgent;