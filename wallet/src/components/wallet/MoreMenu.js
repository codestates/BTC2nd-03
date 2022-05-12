import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
const options = [
  'Roly-Poly Scan에서 계정 보기',
];

const MoreMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
    <IconButton onClick={handleClickListItem}><MoreVertIcon/></IconButton>
    <Menu
    id="lock-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
    MenuListProps={{
        'aria-labelledby': 'lock-button',
        role: 'listbox',
    }}
    >
    {options.map((option, index) => (
        <MenuItem
        key={option}
        selected={index === selectedIndex}
        onClick={(event) => handleMenuItemClick(event, index)}
        >
        <OpenInNewIcon style={{padding:'0 5px'}}/>{option}
        </MenuItem>
    ))}
    </Menu>
    </div>
  );
}

export default MoreMenu;