import { Typography, Card, CardContent } from "@mui/material";

const MetricsCard = ({ parameter, value }: { parameter: string, value: number }) => {
    return (
        <>
            <Card sx={{ width: 250 }}>
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                        {parameter}
                    </Typography>
                    <Typography mt={2} variant="h4">
                        {value}%
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
}

export default MetricsCard;