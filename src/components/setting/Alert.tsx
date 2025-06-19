import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';
import { AlertListProps } from '../../types/Alert';

export default function Alerts({ alerts }: AlertListProps) {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            {alerts.map((alert, index) => (
                <Alert key={index} severity={alert.severity}>
                    <AlertTitle>{alert.title}</AlertTitle>
                    {alert.description}
                </Alert>
            ))}
        </Stack>
    );
}
