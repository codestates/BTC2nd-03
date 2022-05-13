import React from 'react';
import {  Stack,Avatar,Typography} from "@mui/material";
import { transBalance } from '../../config/Utils';

const TokenItem = ({name,value=0}) => {
    return <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
    <Stack direction={"row"} >
        <Avatar src="/matic.png"/>
        <div style={{padding:'0 10px'}}/>
        <Stack>
            <Typography variant='body2'>{transBalance(value)} {name}</Typography>
            <Typography variant='body2'>$0.00 USD</Typography>
        </Stack>
    </Stack>
</Stack>
}

export default TokenItem;