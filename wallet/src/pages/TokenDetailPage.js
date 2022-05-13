import React,{useEffect, useState, useContext} from 'react';
import { Card, Stack,Avatar, Button,Divider,TextField, Typography, Fab, Tabs, Tab, Box, List , ListItem, ListItemButton   } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CallMadeIcon from '@mui/icons-material/CallMade';
import WalletHeader from '../components/wallet/WalletHeader';
import DetailCoinBread from '../components/wallet/DetailCoinBread';
import MoreMenu from '../components/wallet/MoreMenu';
import { InfoContext } from "../store/InfoContext";
import { transBalance } from '../config/Utils';
import TokenItem from '../components/coin/TokenItem';

const TokenDetailPage = () => {
    // uncover define core glare athlete verb actress work unusual buddy banana cricket
    const {token_name} = useParams();
    const navigate = useNavigate();
    const [address, SetAddress] = useState({address:"",keystore:""});
    const {thisAccount, setThisAccount} = useContext(InfoContext);
    useEffect(()=>{
        console.log(token_name);
    },[])

    return <Card variant="outlined" style={{padding:10}}>
        <Stack alignItems="left" spacing={3}>
            <WalletHeader/>
        </Stack>
        <Divider style={{margin:'10px 0'}}/>
        <WalletInHeader/>
        <Divider style={{margin:'10px 0'}}/>
        <Stack alignItems="center" spacing={3}>
            <Avatar src="/matic.png"></Avatar>
            <Typography variant='h4' component="div">{transBalance(thisAccount.coin.matic)} MATIC</Typography>
            <Stack direction={"row"} spacing={5}>
                <Stack spacing={1} alignItems="center">
                    <Fab size="small" color="secondary" aria-label="send" onClick={()=>navigate("/wallet/transfer-token")}>
                        <CallMadeIcon fontSize="small"/>
                    </Fab>
                    <Typography variant='body2' component="div">보내기</Typography>
                </Stack>
            </Stack>
        </Stack>
        <WalletTab coin={thisAccount.coin}/>
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

const WalletInHeader = () => {
    
    return <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
        <DetailCoinBread prev={'Account1'} name={'MATIC'}/>
        <MoreMenu/>
    </Stack>
}

const WalletTab = ({coin}) => {
    const navigate = useNavigate();
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
      console.log(newValue);
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
          <ListItem style={{padding:'10px 0'}}>
            <ListItemButton>
              <TokenItem name={"MATIC"} value ={coin.matic}/>
            </ListItemButton>
          </ListItem>
          <Divider/>
          <ListItem style={{padding:'10px 0'}}>
            <ListItemButton>
            <TokenItem name={"USDT"}/>
            </ListItemButton>
          </ListItem>
        </List>
        <Divider style={{margin:'25px 0'}}/>
        <Stack alignItems={"center"}>
            <div/>
            <Typography variant='body2' component="div">토큰이 보이지 않나요?</Typography>
            <Button variant='text' onClick={()=>{navigate('/wallet/add-token')}}>토큰 가져오기</Button>
        </Stack>
    </TabPanel>
    <TabPanel value={value} index={1}>
        Item Two
    </TabPanel>
</Box>
}

export default TokenDetailPage;