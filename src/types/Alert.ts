export interface AlertProps {
    severity?: 'error' | 'warning' | 'info' | 'success';
    title: string;
    description: string;
}

export interface AlertListProps {
    alerts: AlertProps[];
}
