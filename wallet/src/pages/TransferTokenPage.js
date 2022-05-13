import React,{useState,useContext} from 'react';
import { IconButton, OutlinedInput,Alert, InputLabel,Card,InputAdornment, Button, Stack, Typography, TextField,FormControl, Divider  } from "@mui/material";
import { transfer } from '../api/CoinApi';
import { InfoContext } from '../store/InfoContext';
import { useNavigate } from "react-router-dom";
import WalletHeader from '../components/wallet/WalletHeader';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const TransferTokenPage = () => {
    const navigate = useNavigate();
    const {account,thisAccount} = useContext(InfoContext);
    const [open, setOpen] = React.useState(false);
    const [values, setValues] = useState({
      receiver: '',
      token_sign:'MATIC',
      matic_amount: 0,
    });
    // {
    //     "sender":"0x12ee8bac9da9fdde7958d705851403a26903ffa3",
    //     "receiver":"0x235162cb33da9565e7c05e0c8bb071f8d43b55ff",
    //     "matic_amount":"0.001",
    //     "private_key":"50d017a0e93263b277d335a4671742146d4f374305ef0c0e9bac4cab3456aaa8"
    // }
    const handleClose = () => {
        setOpen(false);
      };
      const handleToggle = () => {
        setOpen(!open);
      };
    
    const SetStorageByBrowserType = (key, transactionHash) => {
        if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
            /*global chrome*/
            chrome.storage.local.get([key],function(result){
              const getTransaction = result[key];
              let data = {};
              console.log(getTransaction)
              if(getTransaction) {
                getTransaction.push(transactionHash);
                data[key] = getTransaction;
                /*global chrome*/
                chrome.storage.local.set(data,function(){ console.log("saved ok"); } );
              } else{
                data[key] = [transactionHash];
                /*global chrome*/
                chrome.storage.local.set(data,function(){ console.log("saved ok"); } );
            }
            });
        } else {
            const getTransaction = sessionStorage.getItem(key);
            console.log(getTransaction);
            if(getTransaction) {
                const test = JSON.parse(getTransaction)
                test.push(transactionHash);
                sessionStorage.setItem(key, JSON.stringify(test));
            } else {
                sessionStorage.setItem(key, JSON.stringify([transactionHash]));
            }
        }
    }

    const onSubmit = async () => {
        handleToggle();
        const formData = {
            sender:thisAccount.address,
            receiver:values.receiver,
            matic_amount:values.matic_amount,
            private_key:account['account1'].privateKey
        };
        console.log(formData);

      const {data, status} = await transfer(formData).catch((err)=>alert(err)).finally(()=>handleClose());
      if (status === 200) {
        const {data:{receipt}} = data;
        console.log(receipt.transactionHash);
        SetStorageByBrowserType('transaction',receipt.transactionHash);

        
        navigate('/wallet');
      }
    }

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    return <div style={{padding:10}}>
    <WalletHeader/>
    <Stack alignItems={"center"}>
    <Card maxWidth="sm" style={{width:400, height:600}}>
        <Stack alignItems="center" spacing={3} style={{margin:15}} >
            <Typography variant="h5">보내기</Typography>
        {/* <Alert severity="warning">기존 토큰의 가짜 버전 생성을 포함하여 누구나 토큰을 생성할 수 있습니다. </Alert> */}
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-receiver">보낼 주소</InputLabel>
            <OutlinedInput
            id="receiver"
            type={'text'}
            value={values.receiver}
            onChange={handleChange('receiver')}
            label="Receiver"
            />
        </FormControl>
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-token_sign">자산</InputLabel>
            <OutlinedInput
            id="token_sign"
            type={'text'}
            value={values.token_sign}
            onChange={handleChange('token_sign')}
            label="TokenSign"
            />
        </FormControl>
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-matic_amount">금액</InputLabel>
            <OutlinedInput
            id="matic_amount"
            type="number"
            value={values.matic_amount}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
            onChange={handleChange('matic_amount')}
            label="Amount"
            />
        </FormControl>
        <div style={{padding:"30px 0"}}/>
        <Divider/>
            <Stack direction={'row'}  justifyContent="space-around" spacing={2}>
                <Button  variant="outlined" onClick={()=>navigate(-1)} style={{width:150}} >
                    취소
                </Button>
                <Button variant="contained" onClick={()=>onSubmit()} style={{width:150}}>
                    다음
                </Button>
            </Stack>
        </Stack>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
        >
        <CircularProgress color="inherit" />
        </Backdrop>
    </Card>
    </Stack>
</div>
    
}

export default TransferTokenPage;