export enum Severity {
    error = 'error',
    info = 'info',
    success = 'success',
    warning = 'warning'
}

export interface AlertProps {
    severity: Severity;
    title: string;
    description: string;
}

export interface AlertListProps {
    alerts: AlertProps[];
}