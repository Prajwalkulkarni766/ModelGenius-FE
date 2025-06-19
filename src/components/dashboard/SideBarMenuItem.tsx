import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { MenuItem } from '../../types/Menu';
import { Link } from 'react-router';

interface Props {
    menu: MenuItem;
    index: number;
}

const SideBarMenuItem = ({ menu, index }: Props) => (
    <Link to={menu.ref} style={{ textDecoration: "none", color: "inherit" }}>
        <ListItemButton key={index} sx={{ px: 1.5 }}>
            <ListItemIcon sx={{ minWidth: 32, color: 'text.primary' }}>
                {menu.icon}
            </ListItemIcon>
            <ListItemText primary={menu.text} />
        </ListItemButton>
    </Link>
);

export default SideBarMenuItem;
