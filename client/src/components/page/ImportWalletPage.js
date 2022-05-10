import React from 'react';
import { Container, Button, Stack, Typography, TextField  } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImportWalletPage = () => {
    const navigate = useNavigate();

    return <Container maxWidth="sm" style={{ marginTop: "10%" }}>
    <Stack alignItems="left" spacing={2}>
    <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
       
      <Typography variant="h4">비밀 복구 구문으로 계정 가져오기</Typography>
      <Typography>지갑을 복구하려면 비밀 구문을 여기에 입력하세요.</Typography>
      <TextField
          required
          id="outlined-required"
          label="Required"
        />
      <Button variant="contained">
        시작하기
      </Button>
    </Stack>
  </Container>
}

export default ImportWalletPage;