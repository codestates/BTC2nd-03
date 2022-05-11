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
import React, { useRef, useState } from "react";
import axios from "axios";

const Thirdpage = () => {
  const navigate = useNavigate();

  const passwordInput = useRef();
  const checkPasswordInput = useRef();

  const [state, setState] = useState({
    password: "",
    checkPassword: "",
  });

  const handleChangeState = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (state.password.length < 7) {
      alert("비밀번호는 8자 이상 입력해주세요");
      return;
    } else if (state.checkPassword.length < 7) {
      alert("비밀번호는 8자 이상 입력해주세요");

      return;
    }

    const formData = new FormData();
    formData.append("password", state.password);
    formData.append("checkPassword", state.checkPassword);

    const post = await axios
      .post("http://localhost:5005/wallet/newMnemonic", formData)
      .then((res) => console.log("res", res))
      .catch((err) => console.log(err));
    console.log("post", post);
    navigate("/fourthpage");
  };

  return (
    <Container maxwidth="sm" style={{ marginTop: "2%", marginLeft: "25%" }}>
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
        <Typography variant="h3" component="p">
          비밀번호 만들기
        </Typography>
      </Stack>
      <Stack spacing={1} marginTop={5}>
        <Typography variant="body2" component="p">
          새 비밀번호(8자 이상)
        </Typography>
        <TextField
          ref={passwordInput}
          type="password"
          name="password"
          value={state.password}
          onChange={handleChangeState}
          sx={{ width: "22rem" }}
        />
      </Stack>
      <Stack spacing={1} marginTop={3}>
        <Typography variant="body2" component="p">
          비밀번호 확인
        </Typography>
        <TextField
          ref={checkPasswordInput}
          type="password"
          name="checkPassword"
          value={state.checkPassword}
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

export default Thirdpage;
