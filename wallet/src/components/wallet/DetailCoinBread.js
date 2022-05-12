import React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useNavigate } from "react-router-dom";
import {IconButton,Button, Stack} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function DetailCoinBread({prev, name}) {
    const navigate = useNavigate();  
    return (
        <Stack direction={'row'} onClick={handleClick}>
        <IconButton style={{color:'gray',padding:'0 0 0 15px'}} onClick={()=>navigate(-1)}>
            <ArrowBackIosIcon fontSize='small'/>
        </IconButton>
        <Breadcrumbs aria-label="breadcrumb">
            <Button variant="text" style={{color:'gray'}} onClick={()=>navigate(-1)}>{prev}</Button>
            <Typography color="text.primary">{name}</Typography>
        </Breadcrumbs>
        </Stack>
    );
}