import React, {useState, useEffect} from 'react';
import Button from "@mui/material/Button";
import { Container, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';

function WelcomePage() {
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:650px)');
  const [isAddress, setAddress] = useState(false);

  const GetStorageByBrowserType = (key) => {
    if(process.env.REACT_APP_BROWSER_TYPE === 'extension') {
        /*global chrome*/
        chrome.storage.local.get([key],function(result){
          console.log(result);
          if(result[key]) {
            setAddress(true);
          }
         
        });
    } else {
        const getAddress = sessionStorage.getItem(key);
        if(getAddress) {
          setAddress(true);
        }
    }
  }
  useEffect(()=>{
    GetStorageByBrowserType('account');
  },[])

  return (
    isAddress ? navigate('/wallet',{replace:true}):
    <Container style={{ marginTop: "10%" }}>
      <Stack alignItems="center" spacing={2}>
        <img
          src="./logo.png"
          alt="no img"
          width="100px"
          height="100px"
          style={{ marginBottom: "40px" }}
        />
        <Typography variant={matches ? "h4" : "h5"}>Roly Poly 방문을 환영합니다.</Typography>
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
