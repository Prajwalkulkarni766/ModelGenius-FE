import { Box, Typography, Avatar, List } from '@mui/material';
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Work as ProjectIcon,
} from '@mui/icons-material';
import SideBarMenuItem from '../../components/dashboard/SideBarMenuItem';
import { MenuItem } from '../../types/Menu';
import { Link } from 'react-router';

const menus: MenuItem[] = [
  { icon: <HomeIcon />, text: 'Home', ref: '/home' },
  { icon: <ProjectIcon />, text: 'New Project', ref: '/new-project' },
  { icon: <DescriptionIcon />, text: 'Existing Projects', ref: '/project' },
  { icon: <SettingsIcon />, text: 'Setting', ref: '/setting' },
];

const Sidebar = () => {
  return (
    <Box
      width="240px"
      display="flex"
      flexDirection="column"
      height="95vh"
    >
      {/* User Info */}
      <Box display="flex" alignItems="center" mb={3} gap={1}>
        <Avatar sx={{ bgcolor: 'primary.main' }}>H</Avatar>
        <Typography variant="subtitle1" fontWeight={500}>
          User Name
        </Typography>
      </Box>

      {/* Menu List */}
      <List disablePadding>
        {menus.map((menu, index) => (
          <SideBarMenuItem key={index} menu={menu} index={index} />
        ))}
      </List>

      <Box mt="auto">
        <Link to="/" style={{ color: 'inherit', textDecoration: "none" }}>
          <Typography
            ml={2}
            sx={{
              fontSize: 20
            }}
            color="error"
          >
            Logout
          </Typography>
        </Link>
      </Box>
    </Box>
  );
};

export default Sidebar;
