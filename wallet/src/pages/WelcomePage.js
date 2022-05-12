import Button from "@mui/material/Button";
import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: "10%" }}>
      <Stack alignItems="center" spacing={2}>
        <img
          src="./logo.png"
          alt="no img"
          width="100px"
          height="100px"
          style={{ marginBottom: "40px" }}
        />
        <Typography variant="h4">roly-poly 방문을 환영합니다.</Typography>
        <Typography>폴리곤 및 분산형 웹에 연결합니다.</Typography>
        <Typography>반갑습니다.</Typography>
        <Button variant="contained" onClick={()=>navigate('/selectpage')}>
            시작하기
        </Button>
      </Stack>
    </Container>
  );
}

export default WelcomePage;
