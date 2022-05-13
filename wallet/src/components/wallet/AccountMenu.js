import React, {useContext,useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,ListSubheader,List,ListItem,Stack, ListItemButton,ListItemIcon,ListItemText, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { InfoContext } from "../../store/InfoContext";
import AddIcon from '@mui/icons-material/Add';
const options = [
  '내 계정',
  '계정 생성',
];

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const {coin} = useContext(InfoContext);
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
      <IconButton onClick={handleClickListItem}><Avatar >H</Avatar></IconButton>
      
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
          index ==0 ? <MyAccountList coin={coin}/> :
          <MenuItem
            key={option}
            onClick={(event) => handleMenuItemClick(event, index)}
            style={{padding:15}}
          >
            <AddIcon style={{padding:'0 5px'}}/>{option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

const MyAccountList = ({coin})=> {
    const [open, setOpen] = useState(true);
    const [accountSelectedIndex, setAccountSelectedIndex] = useState(0);

    const handleListItemClick = (event, index) => {
        console.log(index);
        setAccountSelectedIndex(index);
      };
    const handleClick = () => {
      setOpen(!open);
    };
    return <List
    style={{width:300}}
    component="nav"
    aria-labelledby="nested-list-subheader"
    
    subheader={
      <ListSubheader component="div" id="nested-list-subheader">
        내 계정
      </ListSubheader>
    }
    >
      {options.map((option, index) => (
        <ListItemButton selected={index === accountSelectedIndex} onClick={(event)=>handleListItemClick(event,index)}>
            <Stack direction={'row'} alignItems={'center'}>
                <div style={index === accountSelectedIndex ? {visibility:'visible'} :{visibility:'hidden'}}><CheckIcon style={{color:'green'}}/></div>
                <Avatar style={{margin:'0 10px'}}>H</Avatar>
                <Stack >
                    <ListItemText primary="Sent mail" />
                    <Typography variant='body2'>{coin.matic} MATIC</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
      ))}

  </List>
}


export default AccountMenu;