import { Typography, Card, CardContent, Box } from "@mui/material";

interface MetricsCardProps {
    parameter: string;
    value: string | number;
    isPercentage?: boolean;
}

const getColor = (value: number, isPercentage: boolean): string => {
    if (!isPercentage) return '#2196f3'; // Blue for non-percentage metrics
    if (value >= 0.8) return '#4caf50'; // Green for good
    if (value >= 0.6) return '#ff9800'; // Orange for moderate
    return '#f44336'; // Red for low
};

const MetricsCard = ({ parameter, value, isPercentage = true }: MetricsCardProps) => {
    const numericValue = typeof value === 'string' ? parseFloat(value) : value;
    const displayValue = typeof value === 'string' ? value : value?.toFixed(4);
    const color = getColor(numericValue, isPercentage);

    return (
        <Card
            sx={{
                minWidth: 180,
                maxWidth: 220,
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4,
                },
            }}
        >
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: 0.5,
                        mb: 2
                    }}
                >
                    {parameter}
                </Typography>

                <Box sx={{ position: 'relative', display: 'inline-flex', mb: 1 }}>
                    <Box
                        sx={{
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0,
                            position: 'absolute',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ fontWeight: 700, color }}
                        >
                            {isPercentage ? `${(numericValue * 100).toFixed(1)}%` : displayValue}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default MetricsCard;