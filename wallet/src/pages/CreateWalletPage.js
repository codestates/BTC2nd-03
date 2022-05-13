import {
  Container,
  Button,
  Typography,
  Stack,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import React, { useRef, useContext } from "react";
import { InfoContext } from "../store/InfoContext";
import { createMnemonic } from "../api/WalletApi";

const CreatewalletPage = () => {
  const navigate = useNavigate();

  const passwordInput = useRef();
  const checkPasswordInput = useRef();
  const { info, setInfo } = useContext(InfoContext);

  const handleChangeState = (e) => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (info.password.length < 7) {
      alert("비밀번호는 8자 이상 입력해주세요");
      return;
    } else if (info.checkPassword.length < 7) {
      alert("비밀번호는 8자 이상 입력해주세요");

      return;
    }
  
    const formData = new FormData();
    formData.append("password", info.password);
    formData.append("checkPassword", info.checkPassword);
    const {data, status} = await createMnemonic(formData).catch((err)=>console.log(err));
    
    if (status === 200) {
      const {data:mnemonicData} = data;
      SetStorageByBrowserType("mnemonic",values.mnemonic);
      SetStorageByBrowserType("account",{account1:walletInfo});

      navigate('/viewmnemonicpage',{state:mnemonicData});
    }
    
  };
  return (
    <Container style={{ marginTop: "2%", marginLeft: "25%" }}>
      <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
      <Stack spacing={3}>
        <Button
          onClick={() => navigate(-1, { replace: true })}
          sx={{
            width: "3rem",
            height: "2.3rem",
            marginTop: "15px",
            whiteSpace: "nowrap",
          }}
        >
          <ArrowBackIosNewIcon fontSize="4px" sx={{ marginRight: "5px" }} />
          뒤로가기
        </Button>
        <Typography variant="h3" component="div">
          비밀번호 만들기
        </Typography>
      </Stack>
      <Stack spacing={1} marginTop={5}>
        <Typography variant="body2" component="div">
          새 비밀번호(8자 이상)
        </Typography>
        <TextField
          ref={passwordInput}
          type="password"
          name="password"
          value={info.password}
          onChange={handleChangeState}
          sx={{ width: "22rem" }}
        />
      </Stack>
      <Stack spacing={1} marginTop={3}>
        <Typography variant="body2" component="div">
          비밀번호 확인
        </Typography>
        <TextField
          ref={checkPasswordInput}
          type="password"
          name="checkPassword"
          value={info.checkPassword}
          onChange={handleChangeState}
          sx={{ width: "22rem" }}
        />
      </Stack>
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="이용 약관의 내용을 읽고 이에 동의합니다."
        sx={{ marginTop: "20px" }}
      />
      <Stack>
        <Button
          variant="contained"
          size="large"
          onClick={handleSubmit}
          sx={{ borderRadius: "20px", width: "15%", marginTop: "20px" }}
        >
          생성
        </Button>
      </Stack>
    </Container>
  );
};

export default CreatewalletPage;
