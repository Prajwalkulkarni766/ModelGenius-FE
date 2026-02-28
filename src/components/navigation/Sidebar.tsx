import { Box, Typography, Avatar, List, ListItemButton, Divider } from '@mui/material';
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Work as ProjectIcon,
  Logout as LogoutIcon,
  Psychology as AIIcon,
} from '@mui/icons-material';
import SideBarMenuItem from '../../components/dashboard/SideBarMenuItem';
import { MenuItem } from '../../types/Menu';
import { useLocation } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { userStore } from '../../store/userStore';
import { modelStore } from '../../store/modelStore';
import { projectStore } from '../../store/projectStore';
import { logoutService } from '../../services/authService';

const menus: MenuItem[] = [
  { icon: <HomeIcon />, text: 'Home', ref: '/home' },
  { icon: <ProjectIcon />, text: 'New Project', ref: '/projects/new' },
  { icon: <DescriptionIcon />, text: 'Existing Projects', ref: '/projects' },
  { icon: <AIIcon />, text: 'AI Agent', ref: '/ai-agent' },
];

const bottomMenus: MenuItem[] = [
  { icon: <SettingsIcon />, text: 'Settings', ref: '/setting' },
];

const Sidebar = () => {
  const location = useLocation();
  const user = userStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutService();
    userStore.getState().clearUser();
    modelStore.getState().clearModel();
    projectStore.getState().clearProject();
    navigate("/");
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : 'U';
  };

  return (
    <Box
      width="260px"
      display="flex"
      flexDirection="column"
      height="100vh"
      sx={{
        position: 'sticky',
        top: 0,
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box display="flex" alignItems="center" gap={2} sx={{ px: 2, pb: 2, pt: 2 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
          {getInitial(user?.username || 'User')}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" fontWeight={500} lineHeight={1.2}>
            {user?.username || 'User'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email || 'user@example.com'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ mb: 1 }} />

      <List disablePadding sx={{ flex: 1 }}>
        {menus.map((menu, index) => (
          <SideBarMenuItem
            key={index}
            menu={menu}
            index={index}
            isActive={location.pathname === menu.ref}
          />
        ))}
      </List>

      <Divider sx={{ mb: 1 }} />

      <List disablePadding>
        {bottomMenus.map((menu, index) => (
          <SideBarMenuItem
            key={index}
            menu={menu}
            index={index}
            isActive={location.pathname === menu.ref}
          />
        ))}
      </List>

      <Box sx={{ p: 1, pt: 0 }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 2,
            color: 'error.main',
            '&:hover': {
              bgcolor: 'rgba(231, 76, 60, 0.1)',
            },
          }}
        >
          <LogoutIcon sx={{ mr: 1.5, fontSize: 20 }} />
          <Typography fontWeight={500}>Logout</Typography>
        </ListItemButton>
      </Box>
    </Box>
  );
};

export default Sidebar;
