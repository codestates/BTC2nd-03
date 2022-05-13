import React, {useContext,useState} from 'react';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Avatar,ListSubheader,List,ListItem,Stack, ListItemButton,ListItemIcon,ListItemText, Typography } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { InfoContext } from "../../store/InfoContext";
import AddIcon from '@mui/icons-material/Add';
import { createWallet } from '../../api/WalletApi';
const options = [
  '내 계정',
  '계정 생성',
];

const AccountMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const {account, thisAccount, info, setThisAccount} = useContext(InfoContext);
  const open = Boolean(anchorEl);
  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setAnchorEl(null);
    if(index === 1) {
        CreateAccount();
    }
  };

  const CreateAccount = () => {
    console.log("계정 생성");
    
    GetStorageByBrowserType('mnemonic')
  }

  const GetStorageByBrowserType = async (key) => {
    if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
        /*global chrome*/
        chrome.storage.local.get([key], async function(result){
          console.log(result);
          const getData = result[key];
          if(getData) {
            console.log(getData);
            const formData = {
                'mnemonic':getData,
                'password':info.password,
                'accountCount':Object.keys(account).length+1
            }
            const {data, status} = await createWallet(formData).catch((err)=>{console.log(err)});
            if(status === 200) {
                console.log(data);
            }
          }
         
        });
    } else {
        const getData = sessionStorage.getItem(key);
        console.log(getData);
        if(getData) {
            const parseData = JSON.parse(getData);
            console.log(parseData);
            const test = JSON.parse(sessionStorage.getItem('account'));
            console.log(test['account1']['keystore']);

            const formData = {
                'mnemonic':parseData,
                'password':info.password,
                'accountCount':Object.keys(account).length+1
            }
            const {data, status} = await createWallet(formData).catch((err)=>{console.log(err)});
            if(status === 200) {
                console.log(data);
            }
        }
    }
  }

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
          index ==0 ? <MyAccountList accountList={account}/> :
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

const MyAccountList = ({accountList})=> {
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
      {Object.keys(accountList).map((account, index) => (
        <ListItemButton key={`account-${index}`} selected={index === accountSelectedIndex} onClick={(event)=>handleListItemClick(event,index)}>
            <Stack direction={'row'} alignItems={'center'}>
                <div style={index === accountSelectedIndex ? {visibility:'visible'} :{visibility:'hidden'}}><CheckIcon style={{color:'green'}}/></div>
                <Avatar style={{margin:'0 10px'}}>{account}</Avatar>
                <Stack >
                    <ListItemText primary={account} />
                    <Typography variant='body2' component={'div'}>{accountList[account].coin.matic} MATIC</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
      ))}

  </List>
}


export default AccountMenu;