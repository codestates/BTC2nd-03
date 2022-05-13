import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

const menus = [
  { name: "Transaction", path: "/" },
  { name: "Txn Hash", path: "/txnhash" },
  { name: "Block", path: "/block" },
];

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menus.map((text, index) => (
          <ListItem key={text.name} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText onClick={() => navigate(text.path)}>
                {text.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Swap", "Create Wallet"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
