import React,{useState,useContext} from 'react';
import { IconButton, OutlinedInput, FormHelperText, InputLabel,Container,InputAdornment, Button, Stack, Typography, TextField  } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";
import {SetStorageByBrowserType} from "../config/Utils";
import { WalletContext } from "../store/InfoContext";
import FormControl, { useFormControl } from '@mui/material/FormControl';

const ImportWalletPage = () => {
    const {required} = useFormControl() || {};
    const navigate = useNavigate();
    const [values, setValues] = useState({
      mnemonic: '',
      password: '',
      password_confirm: '',
      showMnemonic: false,
    });
    
    const onSubmit = async () => {
      const {data, status} = await createWallet(values).catch((err)=>{console.log(err)});
      if (status === 200) {
        const {data:walletInfo} = data;
        console.log(walletInfo);
        SetStorageByBrowserType("mnemonic",values.mnemonic);
        //setWallet(walletInfo);
        SetStorageByBrowserType("account",{account1:walletInfo});

        navigate('/wallet');
      }
    }

    const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickshowMnemonic = () => {
      setValues({
        ...values,
        showMnemonic: !values.showMnemonic,
      });
    };

    const handleMouseDownMnemonic = (event) => {
      event.preventDefault();
    };
    
    const validationPassword = () => {
      if(values.password.length <8 && values.password.length != 0) {
        return true;
      }
      return false;
    }

    const validationPasswordConfirm = () => {
      if(values.password.length >7 && values.password == values.password_confirm ) {
        return false;
      } else if(values.password_confirm.length == 0) {
        return false;
      }
      
      return true;
    }
    const checkVaildation = () => {
      if(values.mnemonic.length >12 && values.password.length >7 && values.password == values.password_confirm) {
        return false;
      }
      return true;
    }
    return <Container maxWidth="sm" style={{ marginTop: "10%" }}>
    <Stack alignItems="left" spacing={3}>
      <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
      <Stack direction={'row'} justifyContent="flex-start">
      
      <Button variant="text" style={{color:'gray'}} onClick={()=>navigate(-1)}>
        <ArrowBackIosIcon fontSize='small'/> ??????
        </Button>
      </Stack>
      <Typography variant="h4">?????? ?????? ???????????? ?????? ????????????</Typography>
      <Typography>????????? ??????????????? ?????? ????????? ????????? ???????????????.</Typography>
      <FormControl required sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-mnemonic">?????? ?????? ??????</InputLabel>
        <OutlinedInput
          id="mnemonic"
          type={values.showMnemonic ? 'text' : 'password'}
          value={values.mnemonic}
          onChange={handleChange('mnemonic')}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle mnemonic visibility"
                onClick={handleClickshowMnemonic}
                onMouseDown={handleMouseDownMnemonic}
                edge="end"
              >
                {values.showMnemonic ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label="Mnemonic"
        />
      </FormControl>
      <FormControl required error={validationPassword()} sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-password">??? ??????(8??? ??????)</InputLabel>
        <OutlinedInput
          id="password"
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Error"
        />
      <FormHelperText id="component-error-text">{validationPassword() ? "8??? ?????? ???????????????." : ""}</FormHelperText>
      </FormControl>
      <FormControl required error={validationPasswordConfirm()} sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-password_confirm">??? ?????? ??????(8??? ??????)</InputLabel>
        <OutlinedInput
          id="password_confirm"
          type={'password'}
          value={values.password_confirm}
          onChange={handleChange('password_confirm')}
          label="PasswordConfirm"
        />
      <FormHelperText id="component-error-text">{validationPasswordConfirm() ? "????????? ???????????? ????????????." : ""}</FormHelperText>
      </FormControl>
      <Button variant="contained" onClick={()=>onSubmit()} disabled={checkVaildation()} style={{width: '50ch',height:50}}>
        ????????????
      </Button>
    </Stack>
  </Container>
}

export default ImportWalletPage;