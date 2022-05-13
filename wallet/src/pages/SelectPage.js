import { Container, Grid, Typography, Paper, Box, Button } from "@mui/material";
import { GetApp, Add } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SelectPage = () => {
  const navigate = useNavigate();
  return (
    <Container style={{ marginTop: "2%" }}>
      <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
      <Grid container sx={{ justifyContent: "center", marginTop: "60px" }}>
        <Typography variant="h5" component="div">
          roly-poly가 처음이세요?
        </Typography>
      </Grid>
      <Grid
        container
        sx={{
          justifyContent: "space-around",
          marginTop: "60px",
        }}
      >
        <Grid item xs={5}>
          <Paper elevation={3} sx={{ borderRadius: "10px" }}>
            <Box padding={5} sx={{ textAlign: "center" }}>
              <GetApp fontSize="large" />
              <Typography variant="h6" component="div">
                아니요. 이미 비밀 복구 구문이 있습니다.
              </Typography>
              <Box paddingTop={1} paddingBottom={5}>
                <Typography variant="body2" component="div">
                  비밀 복구 구문을 사용하여 기존 지갑 가져오기
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: "20px", width: "50%" }}
                onClick={() => navigate("/import-with-seed-pharse")}
              >
                지갑 가져오기
              </Button>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={5} sx={{ borderRadius: "10px" }}>
          <Paper elevation={3} sx={{ borderRadius: "20px" }}>
            <Box padding={5} sx={{ textAlign: "center" }}>
              <Add fontSize="large" />
              <Typography variant="h6" component="div">
                설정을 시작하죠!
              </Typography>
              <Box paddingTop={1} paddingBottom={5}>
                <Typography variant="body2" component="div">
                  지갑 생성을 하면 새 지갑과 비밀 복구 구문이 만들어집니다.
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{ borderRadius: "20px", width: "50%" }}
                onClick={() => navigate("/createwalletpage")}
              >
                지갑 생성
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SelectPage;
