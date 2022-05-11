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
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Fourthpage = () => {
  const navigate = useNavigate();

  const [data, setData] = useState();

  useEffect(() => {
    const fetchPosts = async () => {
      await axios
        .get(`http://localhost:5005/wallet/newMnemonic`)
        .then((res) => {
          console.log(res);
          setData(res.data.data);
          console.log("res.data.data", res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    fetchPosts();
  }, []);

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
          비밀 복구 구문
        </Typography>
        <Typography variant="body2" component="p">
          비밀 백업 구문을 이용하면 계정을 쉽게 백업하고 복구할 수 있습니다.
        </Typography>
        <Typography
          variant="body2"
          component="p"
          sx={{ whiteSpace: "pre-wrap" }}
        >
          경고: 비밀 복구 구문은 절대로 공개하지 마세요.
          <br />이 구문이 있는 사람은 귀하의 Ether를 영원히 소유할 수 있습니다.
        </Typography>
      </Stack>
    </Container>
  );
};

export default Fourthpage;
