import React,{useEffect, useState, useContext, useRef} from 'react';
import { Card, Stack,Avatar, Button,Divider,TextField, Typography, Fab, Tabs, Tab, Box,Popover,List , ListItem, ListItemButton,ListItemText } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CallMadeIcon from '@mui/icons-material/CallMade';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import WalletHeader from '../components/wallet/WalletHeader';
import { getBalance, getTransaction } from '../api/CoinApi';
import { transBalance } from '../config/Utils';
import { InfoContext } from "../store/InfoContext";
import MoreMenu from '../components/wallet/MoreMenu';
import TokenItem from '../components/coin/TokenItem';
// import { getTransactions } from '../api/Web3Api';
const WalletPage = () => {
    const navigate = useNavigate();
    // const [matic, setMatic] = useState({matic:"0", wei:"0"})
    const {setAccount, thisAccount, setThisAccount} = useContext(InfoContext);   

    const getCoinBalance = async (accountList, account) => {
        const {data, status} = await getBalance(accountList[account].address).catch((err)=> {console.log(err)});
        if(status === 200) {
            const {data:balance} = data;
            accountList[account]['coin'] = balance;
            setAccount(accountList);
            setThisAccount({
                ...accountList[account],
                coin:balance
            });
        }
    };

    const GetStorageByBrowserType = (key) => {
        if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
            /*global chrome*/
            chrome.storage.local.get([key],function(result){
              console.log(result);
              const accountList = result[key];
              if(accountList) {
                  console.log(accountList)
                  getCoinBalance(accountList, 'account1');
              }
             
            });
        } else {
            const getAccount = sessionStorage.getItem(key);
            console.log(getAccount);
            if(getAccount) {
                const parseAccount = JSON.parse(getAccount);
                setAccount(parseAccount);
                getCoinBalance(parseAccount, 'account1');
            }
        }
    }

    useEffect(()=> {
        GetStorageByBrowserType('account');
    },[])
    return <Card variant="outlined" style={{padding:10}}>
        <Stack alignItems="left" spacing={3}>
            <WalletHeader/>
        </Stack>
        <Divider style={{margin:'10px 0'}}/>
        <WalletAccount account={thisAccount}/>
        <Divider style={{margin:'10px 0'}}/>
        <Stack alignItems="center" spacing={2}>
            <Avatar src="/matic.png"></Avatar>
            <Typography variant='h4' component="div">{transBalance(thisAccount.coin.matic)} MATIC</Typography>
            <Stack direction={"row"} spacing={5}>
                <Stack spacing={1} alignItems="center">
                    <Fab size="small" color="secondary" aria-label="send" onClick={()=>navigate("/wallet/transfer-token")}>
                        <CallMadeIcon fontSize="small"/>
                    </Fab>
                    <Typography variant='body2' component="div">?????????</Typography>
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

const WalletAccount = ({account}) => {
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
        navigator.clipboard.writeText(copyAddressRef.current.value);
    }
    return <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
            <div style={{padding:'0 10px'}}/>
            <Stack alignItems={"center"}>
                <Typography variant='body1' component="div">Account 1</Typography>
                <Button aria-describedby={id} variant='text' onClick={handleClick} >
                    <TextField id="address" variant="standard" size="small" disabled inputRef={copyAddressRef} value={account.address} />
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
                <Typography sx={{ p: 2 }}>?????? ??????.</Typography>
            </Popover>
            </Stack>
            <MoreMenu/>
        </Stack>
}

const WalletTab = () => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    const [transaction, setTransaction] = useState([]);
    const {thisAccount, setThisAccount} = useContext(InfoContext);
    const handleChange = (event, newValue) => {
    console.log(newValue);
      setValue(newValue);
      if(newValue === 1) {
        GetTransactionInfo();
      }
    };

    const GetStorageByBrowserType = (key) => {
        if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
            /*global chrome*/
            chrome.storage.local.get([key],function(result){
              console.log(result);
              const getTransactionByStroage = result[key];
              if(getTransactionByStroage) {
                const test = getTransactionByStroage.map(async(item)=>{
                    const {data,status} = await getTransaction(item).catch(err=>console.log(err));
                    if(status === 200) {
                        console.log(data);
                    }
                })
                
                // setTransaction(getTransaction);
              }
             
            });
        } else {
            const getTransactionByStroage = sessionStorage.getItem(key);
            console.log(getTransactionByStroage);
            if(getTransactionByStroage) {
                const parseTransaction = JSON.parse(getTransactionByStroage);
                const test = parseTransaction.map(async(item)=>{
                    const {data,status} = await getTransaction(item).catch(err=>console.log(err));
                    if(status === 200) {
                        console.log(data);
                    }
                })
                // setTransaction(parseTransaction);
            }
        }
    }
    const GetTransactionInfo = () => {
        GetStorageByBrowserType('transaction');

    }

    return <Box sx={{ width: '100%' }}>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="??????"  />
            <Tab label="??????" />
        </Tabs>
    </Box>
    <TabPanel value={value} index={0}>
        <List style={{padding:0}}>
          <ListItem style={{padding:'10px 0'}} secondaryAction={<ArrowForwardIosIcon/>}>
            <ListItemButton onClick={()=>navigate(`/wallet/token/MATIC`)} >
              <TokenItem name={"MATIC"} value ={thisAccount.coin.matic}/>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem style={{padding:'10px 0'}} secondaryAction={<ArrowForwardIosIcon/>}>
            <ListItemButton onClick={()=>navigate(`/wallet/token/USDT`)} >
            <TokenItem name={"USDT"} img="usdt"/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider style={{margin:'25px 0'}}/>
        <Stack alignItems={"center"}>
            <div/>
            <Typography variant='body2' component="div">????????? ????????? ??????????</Typography>
            <Button variant='text' onClick={()=>{navigate('/wallet/add-token')}}>?????? ????????????</Button>
        </Stack>
    </TabPanel>
    <TabPanel value={value} index={1}>
        {console.log(transaction)}
        <List component="div" aria-labelledby="nested-list-subheader">
        {transaction.map((account, index) => (
        <ListItemButton key={`account-${index}`}>
            <Stack direction={'row'} alignItems={'center'}>
                <Avatar style={{margin:'0 10px'}}>?????????</Avatar>
                <Stack >
                    <ListItemText primary='test' />
                    <Typography variant='body2' component={'div'}>MATIC</Typography>
                </Stack>
            </Stack>
        </ListItemButton>
      ))}

  </List>
    </TabPanel>
</Box>
}



export default WalletPage;