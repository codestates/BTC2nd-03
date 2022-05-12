import React,{useState,useContext} from 'react';
import { IconButton, OutlinedInput,Alert, InputLabel,Card,InputAdornment, Button, Stack, Typography, TextField,FormControl, Divider  } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";
import {SetStorageByBrowserType} from "../config/Utils";
import { WalletContext } from "../store/InfoContext";
import WalletHeader from '../components/wallet/WalletHeader';
import ClearIcon from '@mui/icons-material/Clear';
const TransferTokenPage = () => {
    const navigate = useNavigate();
    const [values, setValues] = useState({
      token_address: '',
      token_sign: '',
      token_decimal: 0,
    });
    
    const onSubmit = async () => {
    //   const {data, status} = await createWallet(values);
    //   if (status === 200) {
    //     const {data:walletInfo} = data;
    //     console.log(walletInfo);
        
    //     //setWallet(walletInfo);
    //     SetStorageByBrowserType("address",walletInfo);

    //     navigate('/wallet');
    //   }
    //   if (status !== 200) {
    //     console.error(data);
    //   }
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
            <InputLabel htmlFor="filled-adornment-token_address">주소</InputLabel>
            <OutlinedInput
            id="token_address"
            type={'text'}
            value={values.token_address}
            onChange={handleChange('token_address')}
            label="TokenAddress"
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
            <InputLabel htmlFor="filled-adornment-token_decimal">금액</InputLabel>
            <OutlinedInput
            id="token_decimal"
            type="number"
            value={values.token_decimal}
            onChange={handleChange('token_decimal')}
            label="TokenDecimal"
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
    </Card>
    </Stack>
</div>
    
}

export default TransferTokenPage;