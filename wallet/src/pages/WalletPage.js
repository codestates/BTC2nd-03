import React,{useEffect, useState, useContext, useRef} from 'react';
import { Card, Stack,Avatar, Button,Divider,TextField, Typography, Fab, Tabs, Tab, Box,Popover,List , ListItem, ListItemButton,ListItemText   } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";
import {GetStorageByBrowserType} from "../config/Utils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WalletHeader from '../components/wallet/WalletHeader';
import { getBalance } from '../api/CoinApi';
import { transBalance } from '../config/Utils';
import { InfoContext } from "../store/InfoContext";


const WalletPage = () => {
    const navigate = useNavigate();
    const [address, SetAddress] = useState({address:"",keystore:""});
    // const [matic, setMatic] = useState({matic:"0", wei:"0"})
    const {coin, setCoin} = useContext(InfoContext);

    const getCoinBalance = async (getAddress) => {
        const {data, status} = await getBalance(getAddress.address).catch((err)=> {console.log(err)});
        if(status === 200) {
            const {data:balance} = data;
            setCoin(balance)
        }
    };
    useEffect(()=> {
        const getAddress = GetStorageByBrowserType('address');
        getCoinBalance(getAddress);
        console.log(getAddress);
        SetAddress(getAddress);
    },[])

    return <Card variant="outlined" style={{padding:10}}>
        <Stack alignItems="left" spacing={3}>
            <WalletHeader/>
        </Stack>
        <Divider style={{margin:'10px 0'}}/>
        <WallAccount address={address}/>
        <Divider style={{margin:'10px 0'}}/>
        <Stack alignItems="center" spacing={2}>
            <Avatar src="/matic.png"></Avatar>
            <Typography variant='h4' component="p">{transBalance(coin.matic)} MATIC</Typography>
            <Stack direction={"row"} spacing={5}>
                <Stack spacing={1} alignItems="center">
                    <Fab size="small" color="secondary" aria-label="send" onClick={()=>navigate("/wallet/transfer-token")}>
                        <CallMadeIcon fontSize="small"/>
                    </Fab>
                    <Typography variant='body2' component="div">보내기</Typography>
                </Stack>
            </Stack>
        </Stack>
        <WalletTab/>
    </Card>
}

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

const WallAccount = ({address}) => {
    const copyAddressRef = useRef();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event) => {
        copyAddressUrl();
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyAddressUrl = () => {
        // copyAddressRef.current.focus();
        // copyAddressRef.current.select();
        navigator.clipboard.writeText(copyAddressRef.current.value);
    }
    return <Stack alignItems="center">
        <Typography variant='body1' component="div">Account 1</Typography>
        <Button aria-describedby={id} variant='text' onClick={handleClick} >
            <TextField id="address" variant="standard" size="small" disabled inputRef={copyAddressRef} value={address.address} />
            <ContentCopyIcon fontSize='small' style={{margin:'0 5px'}}/>
        </Button>
        <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
        >
            <Typography sx={{ p: 2 }}>복사 완료.</Typography>
        </Popover>
    </Stack>

}

const WalletTab = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const {coin, setCoin} = useContext(InfoContext);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="자산"  />
            <Tab label="활동" />
        </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
        <List style={{padding:0}}>
          <ListItem style={{padding:'10px 0'}} secondaryAction={<ArrowForwardIosIcon/>}>
            <ListItemButton onClick={()=>navigate(`/wallet/token/MATIC`)} >
              <TokenItem name={"MATIC"} value ={coin.matic}/>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem style={{padding:'10px 0'}} secondaryAction={<ArrowForwardIosIcon/>}>
            <ListItemButton onClick={()=>navigate(`/wallet/token/USDT`)} >
            <TokenItem name={"USDT"}/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider style={{margin:'25px 0'}}/>
        <Stack alignItems={"center"}>
            <div/>
            <Typography variant='body2' component="p">토큰이 보이지 않나요?</Typography>
            <Button variant='text' onClick={()=>{navigate('/wallet/add-token')}}>토큰 가져오기</Button>
        </Stack>
    </TabPanel>
    <TabPanel value={value} index={1}>
        Item Two
    </TabPanel>
</Box>
}

const TokenItem = ({name,value=0}) => {
    return <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
    <Stack direction={"row"} >
        <Avatar src="/matic.png"/>
        <div style={{padding:'0 10px'}}/>
        <Stack>
            <Typography variant='body2'>{transBalance(value)} {name}</Typography>
            <Typography variant='body2'>$0.00 USD</Typography>
        </Stack>
    </Stack>
</Stack>
}

export default WalletPage;