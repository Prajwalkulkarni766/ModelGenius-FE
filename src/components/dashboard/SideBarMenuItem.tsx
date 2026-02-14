import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MenuItem } from '../../types/Menu';
import { Link } from 'react-router';

interface Props {
    menu: MenuItem;
    index: number;
    isActive?: boolean;
}

const SideBarMenuItem = ({ menu, index, isActive = false }: Props) => (
    <Link to={menu.ref} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton
            key={index}
            selected={isActive}
            sx={{
                px: 2,
                py: 1,
                mb: 0.5,
                borderRadius: 2,
                '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.contrastText',
                    '& .MuiListItemIcon-root': {
                        color: 'primary.contrastText',
                    },
                    '&:hover': {
                        bgcolor: 'primary.main',
                    },
                },
            }}
        >
            <ListItemIcon sx={{ minWidth: 36, fontSize: 20 }}>
                {menu.icon}
            </ListItemIcon>
            <ListItemText
                primary={menu.text}
                primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.9rem',
                }}
            />
        </ListItemButton>
    </Link>
);

export default SideBarMenuItem;
