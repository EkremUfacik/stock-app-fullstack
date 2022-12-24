import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import UpgradeIcon from "@mui/icons-material/Upgrade";
import VerticalAlignBottomIcon from "@mui/icons-material/VerticalAlignBottom";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";

import useSortColumn from "../../hooks/useSortColumn";
import { arrowStyle, btnHoverStyle } from "../../styles/globalStyle";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const ProductsTable = ({
  selectedProducts,
  selectedBrands,
  setInfo,
  setOpen,
}) => {
  const { deletePurchase } = useStockCalls();
  const { purchases } = useSelector((state) => state.stock);

  const columnObj = {
    created: 1,
    quantity: 1,
    price_total: 1,
    firm: 1,
    price: 1,
    brand: 1,
    product: 1,
  };

  const { sortedData, order, handleSort } = useSortColumn(purchases, columnObj);

  //? Verilen item secilen brand'larin icerisinde varsa true dondurur
  //? VEYA hic brand secilmemisse true dondurur.aksinde false dondurur.
  //? bu fonksiyon filter() icerisinde yazilacagi icin false dondurmesi
  //? durumunda filter bir suzme yapmamis olur.

  const filtredData = sortedData
    ?.filter(
      (item) => selectedBrands.includes(item.brand) || !selectedBrands.length
    )
    .filter(
      (item) =>
        selectedProducts.includes(item.product) || !selectedProducts.length
    );

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("created")}>
                <Typography variant="body" noWrap>
                  Date
                </Typography>
                {order.created === 1 && <UpgradeIcon />}
                {order.created !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("firm")}>
                <Typography variant="body" noWrap>
                  Firm Name
                </Typography>
                {order.firm === 1 && <UpgradeIcon />}
                {order.firm !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                <Typography variant="body" noWrap>
                  Brand Name
                </Typography>
                {order.brand === 1 && <UpgradeIcon />}
                {order.brand !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("product")}>
                <Typography variant="body" noWrap>
                  Product Name
                </Typography>
                {order.product === 1 && <UpgradeIcon />}
                {order.product !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("quantity")}>
                <Typography variant="body" noWrap>
                  Quantity
                </Typography>
                {order.quantity === 1 && <UpgradeIcon />}
                {order.quantity !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>

            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                <Typography variant="body" noWrap>
                  Amount
                </Typography>
                {order.price === 1 && <UpgradeIcon />}
                {order.price !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell>
              <Box sx={arrowStyle} onClick={() => handleSort("price_total")}>
                <Typography variant="body" noWrap>
                  Amount
                </Typography>
                {order.price_total === 1 && <UpgradeIcon />}
                {order.price_total !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtredData?.map((item) => (
            <TableRow
              key={item.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{item.createds}</TableCell>
              <TableCell align="center">{item.category[0]?.name}</TableCell>
              <TableCell align="center">{item.firm}</TableCell>
              <TableCell align="center">{item.brand}</TableCell>
              <TableCell align="center">{item.product}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{`$${item.price}`}</TableCell>
              <TableCell align="center">{`$${item.price_total}`}</TableCell>
              <TableCell align="center">
                <EditIcon
                  sx={{ ...btnHoverStyle, mr: 1 }}
                  onClick={() => (setOpen(true), setInfo(item))}
                />
                <DeleteForeverIcon
                  sx={btnHoverStyle}
                  onClick={() => deletePurchase(item.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductsTable;
