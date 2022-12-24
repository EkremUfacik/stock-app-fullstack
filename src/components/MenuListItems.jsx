import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const icons = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/stock/",
  },
  {
    title: "Purchase",
    icon: <ShoppingCartIcon />,
    url: "/stock/purchases/",
  },
  {
    title: "Sales",
    icon: <AttachMoneyIcon />,
    url: "/stock/sales/",
  },
  {
    title: "Firms",
    icon: <StoreIcon />,
    url: "/stock/firms/",
  },
  {
    title: "Brands",
    icon: <StarsIcon />,
    url: "/stock/brands/",
  },
  {
    title: "Products",
    icon: <InventoryIcon />,
    url: "/stock/products/",
  },
];

const iconStyle = {
  color: "#eee",
  "& .MuiSvgIcon-root": { color: "#eee" },
  "&:hover": { color: "red" },
  "&:hover .MuiSvgIcon-root": { color: "red" },
};

const MenuListItems = () => {
  const navigate = useNavigate();
  return (
    <List>
      {icons?.map((item, index) => (
        <ListItem key={index} disablePadding sx={iconStyle}>
          {item.url.includes("http") ? (
            <ListItemButton to={item?.url}>
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={() => navigate(item?.url)}>
              <ListItemIcon>{item?.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default MenuListItems;
