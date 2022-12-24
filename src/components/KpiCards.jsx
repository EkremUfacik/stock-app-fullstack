import { Grid, Paper, Typography, Avatar, Box } from "@mui/material";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PaymentsIcon from "@mui/icons-material/Payments";
import { indigo, amber, green } from "@mui/material/colors";
import { useSelector } from "react-redux";

const KpiCards = () => {
  const { sales, purchases } = useSelector((state) => state.stock);

  const total = (data) =>
    data?.reduce((acc, val) => acc + Number(val.price_total), 0);

  const totalProfit = total(sales) - total(purchases);

  const data = [
    {
      title: "sales",
      metric: `$${total(sales) || "0"}`,
      icon: <MonetizationOnIcon sx={{ fontSize: "3rem" }} />,
      color: indigo[900],
      bgColor: indigo[100],
    },
    {
      title: "profit",
      metric: `$${totalProfit || "0"}`,
      icon: <PaymentsIcon sx={{ fontSize: "3rem" }} />,
      color: green[900],
      bgColor: green[100],
    },
    {
      title: "purchases",
      metric: `$${total(purchases) || "0"}`,
      icon: <ShoppingCartIcon sx={{ fontSize: "3rem" }} />,
      color: amber[900],
      bgColor: amber[100],
    },
  ];

  return (
    <Grid container justifyContent="center" alignItems="center" spacing={1}>
      {data.map((item) => (
        <Grid
          item
          key={item.title}
          xs={8}
          // sm={10}
          md={6}
          lg={4}
          sx={{ minWidth: "300px" }}
        >
          <Paper sx={{ p: 2 }} elevation={10}>
            <Box sx={{ display: "flex" }}>
              <Avatar
                sx={{
                  width: "4rem",
                  height: "4rem",
                  color: item.color,
                  backgroundColor: item.bgColor,
                  my: "auto",
                  mx: 2,
                }}
              >
                {item.icon}
              </Avatar>
              <Box sx={{ mx: 3 }}>
                <Typography variant="button">{item.title}</Typography>
                <Typography variant="h4">{item.metric}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default KpiCards;
