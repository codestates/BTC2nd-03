import React,{useEffect, useState} from 'react';
import { Card, Stack,Avatar,Dialog, DialogTitle,Button,Divider, Typography, Fab, Tabs, Tab, Box } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";
import {GetStorageByBrowserType} from "../config/Utils";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CallMadeIcon from '@mui/icons-material/CallMade';
const SimpleDialog = (props) => {
    const { onClose, selectedValue, open } = props;
    const handleClose = () => {
        onClose(selectedValue);
      };
    
    // const handleListItemClick = (value) => {
    //     onClose(value);
    // };
    return <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
}

const WalletHeader = () => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    return <Stack direction={"row"} justifyContent={"space-between"}>
                <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
                <Stack alignItems="center" justifyContent={"center"}>
                    <Stack direction={"row"}>
                        <Button variant="outlined" onClick={handleClickOpen} style={{margin:0,padding:'0 5px 0 10px'}}>
                            Polygon Testnet
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                        <div style={{padding:'0 5px'}}/>
                        <SimpleDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                        <Avatar>H</Avatar>
                    </Stack>
                </Stack>
            </Stack>
}

const WalletPage = () => {
    const [address, SetAddress] = useState({address:"",keystore:""});
    useEffect(()=>{
        const getAddress = GetStorageByBrowserType('address');
        console.log(getAddress);
        SetAddress(getAddress);
    },[])

    return <Card variant="outlined" style={{padding:10}}>
        <Stack alignItems="left" spacing={3}>
            <WalletHeader/>
        </Stack>
        <Divider style={{margin:'10px 0'}}/>
        <Stack alignItems="left" spacing={3}>
            Account
        </Stack>
        <Divider style={{margin:'10px 0'}}/>
        <Stack alignItems="center" spacing={3}>
            <Avatar>P</Avatar>
            <Typography variant='h4' component="p">4.9 MATIC</Typography>
            <Stack direction={"row"} spacing={5}>
                <Stack spacing={1} alignItems="center">
                    <Fab size="small" color="secondary" aria-label="send">
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

const WalletTab = () => {
    const [value, setValue] = React.useState(0);

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
        <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <Stack direction={"row"}>
            <Avatar>P</Avatar>
            <div style={{padding:'0 10px'}}/>
            <Stack>
                <Typography variant='body2' component="div">0 MATIC</Typography>
                <Typography variant='body2' component="div">$0.00 USD</Typography>
            </Stack>

        </Stack>
            <ArrowForwardIosIcon/>
        </Stack>
        <Divider style={{margin:'25px 0'}}/>
        <Stack alignItems={"center"}>
            <div/>
            <Typography variant='body2' component="div">토큰이 보이지 않나요?</Typography>
            <Button variant='text'>토큰 가져오기</Button>
        </Stack>
    </TabPanel>
    <TabPanel value={value} index={1}>
        Item Two
    </TabPanel>
</Box>
}

export default WalletPage;