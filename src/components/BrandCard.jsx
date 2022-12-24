import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardMedia from "@mui/material/CardMedia";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { CardHeader } from "@mui/material";
import useStockCalls from "../hooks/useStockCalls";
import { btnHoverStyle, flex } from "../styles/globalStyle";
import { Box } from "@mui/system";

const BrandCard = ({ brand, setOpen, setInfo }) => {
  const { deleteBrand } = useStockCalls();

  return (
    <Card
      elevation={10}
      sx={{
        p: 2,
        width: "300px",
        height: "350px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <CardHeader sx={{ width: "100%" }} title={brand?.name} />

      <Box sx={{ width: "250px", height: "200px", textAlign: "center" }}>
        <CardMedia
          image={brand?.image}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
          component="img"
          alt="brand-img"
        />
      </Box>

      <CardActions sx={flex}>
        <EditIcon
          sx={btnHoverStyle}
          onClick={() => {
            setInfo(brand);
            setOpen(true);
          }}
        />
        <DeleteOutlineIcon
          sx={btnHoverStyle}
          onClick={() => deleteBrand(brand.id)}
        />
      </CardActions>
    </Card>
  );
};

export default BrandCard;
