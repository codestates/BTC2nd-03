import React,{ useState } from 'react';
import {Stack,Avatar,Button, Dialog, DialogTitle,} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountMenu from './AccountMenu';

const SimpleDialog = (props) => {
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
      };
    
    // const handleListItemClick = (value) => {
    //     onClose(value);
    // };
    return <Dialog onClose={handleClose} open={open} >
        <DialogTitle>Set backup account</DialogTitle>
    </Dialog>
}

const WalletHeader = () => {
    const [open, setOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState(1);
    const matches = useMediaQuery('(min-width:650px)');
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = (value) => {
      setOpen(false);
      setSelectedValue(value);
    };

    return <Stack direction={"row"} justifyContent={"space-between"}>
                {matches ? <img src="/logo_2.png" alt="no img" width="190px" height="60px" /> : <img src="/logo.png" alt="no img" width="60px" height="60px" />}
                <Stack alignItems="center" justifyContent={"center"}>
                    <Stack direction={"row"}>
                        <Button variant="outlined" onClick={handleClickOpen} style={{margin:0,padding:'0 5px 0 10px'}}>
                            Polygon Testnet
                            <KeyboardArrowDownIcon fontSize="small" />
                        </Button>
                        <div style={{padding:'0 5px'}}/>
                        <SimpleDialog
                            selectedValue={selectedValue}
                            open={open}
                            onClose={handleClose}
                        />
                        <AccountMenu/>
                    </Stack>
                </Stack>
            </Stack>
}

export default WalletHeader