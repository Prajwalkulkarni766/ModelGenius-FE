import { Box, Typography, Avatar, List, Button } from '@mui/material';
import {
  Home as HomeIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Work as ProjectIcon,
} from '@mui/icons-material';
import SideBarMenuItem from '../../components/dashboard/SideBarMenuItem';
import { MenuItem } from '../../types/Menu';
import { useNavigate } from 'react-router-dom';
import { userStore } from "../../store/userStore";
import { projectStore } from "../../store/projectStore";
import { modelStore } from "../../store/modelStore";
import { logoutService } from '../../services/authService';

const menus: MenuItem[] = [
  { icon: <HomeIcon />, text: 'Home', ref: '/home' },
  { icon: <ProjectIcon />, text: 'New Project', ref: '/new-project' },
  { icon: <DescriptionIcon />, text: 'Existing Projects', ref: '/project' },
  { icon: <SettingsIcon />, text: 'Setting', ref: '/setting' },
];

const Sidebar = () => {

  const { user, setUser } = userStore();
  const { setProject } = projectStore();
  const { setModel } = modelStore();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await logoutService();

      if (response.requestStatus) {
        setUser(null);
        setProject(null);
        setModel(null);
        localStorage.removeItem("token");
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

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
          {user && user.username}
        </Typography>
      </Box>

      {/* Menu List */}
      <List disablePadding>
        {menus.map((menu, index) => (
          <SideBarMenuItem key={index} menu={menu} index={index} />
        ))}
      </List>

      <Box mt="auto">
        <Button onClick={logout} style={{ color: 'inherit', textDecoration: "none" }}>
          <Typography
            ml={2}
            sx={{
              fontSize: 20
            }}
            color="error"
          >
            Logout
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default Sidebar;
