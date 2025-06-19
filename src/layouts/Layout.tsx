import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Sidebar from '../components/navigation/Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box display="flex" px={5} py={2}>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Box flexGrow={1} pl={4}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
