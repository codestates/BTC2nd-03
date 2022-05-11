import React from 'react';
import { IconButton, OutlinedInput, InputLabel,Container,InputAdornment, Button, Stack, Typography, TextField,FormControl  } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";


const ImportWalletPage = () => {
    const navigate = useNavigate();
    const [values, setValues] = React.useState({
      mnemonic: '',
      password: '',
      password_confirm: '',
      showMnemonic: false,
    });
    
    const onSubmit = async () => {
      const test = await createWallet(values);
      console.log('onSumit: ',test);
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

    return <Container maxWidth="sm" style={{ marginTop: "10%" }}>
    <Stack alignItems="left" spacing={3}>
    <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
      <Typography variant="h4">비밀 복구 구문으로 계정 가져오기</Typography>
      <Typography>지갑을 복구하려면 비밀 구문을 여기에 입력하세요.</Typography>
      <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-mnemonic">비밀 복구 문구</InputLabel>
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
      <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-password">새 암호(8자 이상)</InputLabel>
        <OutlinedInput
          id="password"
          type={'password'}
          value={values.password}
          onChange={handleChange('password')}
          label="Password"
        />
      </FormControl>
      <FormControl sx={{ m: 1, width: '45ch' }} variant="outlined">
        <InputLabel htmlFor="filled-adornment-password_confirm">새 암호(8자 이상)</InputLabel>
        <OutlinedInput
          id="password_confirm"
          type={'password'}
          value={values.password_confirm}
          onChange={handleChange('password_confirm')}
          label="PasswordConfirm"
        />
      </FormControl>
      <Button variant="contained" onClick={()=>onSubmit()}>
        가져오기
      </Button>
    </Stack>
  </Container>
}

export default ImportWalletPage;