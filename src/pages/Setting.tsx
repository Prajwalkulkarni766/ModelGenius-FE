import { Box, Typography } from '@mui/material';
import Layout from '../layouts/Layout';
import SettingTabs from '../components/setting/SettingTabs';

import Profile from '../components/setting/Profile';
import Account from '../components/setting/Account';
import Notification from '../components/setting/Notification';

const Setting = () => {
    return (
        <Layout>
            <Typography variant="h4">Setting</Typography>

            <Box mt={5}>
                <SettingTabs profile={<Profile />} account={<Account />} notification={<Notification />} />
            </Box>
        </Layout>
    );
};

export default Setting;
