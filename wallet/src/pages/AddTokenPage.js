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
const AddTokenPage = () => {
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
        <Stack alignItems="left" spacing={3} style={{margin:15}} >
        <Stack direction={'row'} justifyContent="space-between" alignItems="flex-start">
        <Typography variant="h4">토큰 가져오기</Typography>
        <IconButton color="primary" aria-label="clear" component="span" style={{color:'gray'}} onClick={()=>navigate(-1)}>
            <ClearIcon />
        </IconButton>
        </Stack>
        <Stack spacing={1} >
            <Typography variant="body1" style={{color:'gray'}}>맞춤형 토큰</Typography>
            <Divider/>
        </Stack>
        <Alert severity="warning">기존 토큰의 가짜 버전 생성을 포함하여 누구나 토큰을 생성할 수 있습니다. </Alert>
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-token_address">토큰 계약 주소</InputLabel>
            <OutlinedInput
            id="token_address"
            type={'text'}
            value={values.token_address}
            onChange={handleChange('token_address')}
            label="TokenAddress"
            />
        </FormControl>
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-token_sign">토큰 기호</InputLabel>
            <OutlinedInput
            id="token_sign"
            type={'text'}
            value={values.token_sign}
            onChange={handleChange('token_sign')}
            label="TokenSign"
            />
        </FormControl>
        <FormControl sx={{ m: 1}} variant="outlined">
            <InputLabel htmlFor="filled-adornment-token_decimal">토큰 십진수</InputLabel>
            <OutlinedInput
            id="token_decimal"
            type="number"
            value={values.token_decimal}
            onChange={handleChange('token_decimal')}
            label="TokenDecimal"
            />
        </FormControl>
        <div style={{padding:"15px 0"}}/>
        <Divider/>
        <Button variant="contained" onClick={()=>onSubmit()}>
            맞춤형 토큰 추가
        </Button>
        </Stack>
    </Card>
    </Stack>
</div>
    
}

export default AddTokenPage;