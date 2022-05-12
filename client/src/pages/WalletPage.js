import React from 'react';
import { Card, Stack,Avatar  } from "@mui/material";
import {Visibility,VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import {createWallet} from "../api/WalletApi";

const WalletHeader = () => {
    return <Stack direction={"row"} justifyContent={"space-between"}>
    <img src="/logo_2.png" alt="no img" width="190px" height="60px" />
    <Stack alignItems="center" justifyContent={"center"}>
        <Stack direction={"row"}>
        <Avatar>H</Avatar>
        </Stack>
    </Stack>
    </Stack>
}

const WalletPage = () => {
    return <Card variant="outlined" style={{padding:10}}>
        <Stack alignItems="left" spacing={3}>
            <WalletHeader/>
        </Stack>
    </Card>
}
export default WalletPage;