import { Box } from '@mui/material';
import { ReactNode } from 'react';
import Sidebar from '../components/navigation/Sidebar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <Box display="flex" height="100vh" overflow="hidden">
            <Sidebar />

            <Box flexGrow={1} height="100%" overflow="auto" pl={2} pt={2} pr={2}>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
