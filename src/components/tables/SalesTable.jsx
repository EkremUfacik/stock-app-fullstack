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
import {
  arrowStyle,
  btnHoverStyle,
  editHoverStyle,
  flex,
} from "../../styles/globalStyle";
import useStockCalls from "../../hooks/useStockCalls";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";

const SalesTable = ({ setOpen, setInfo, selectedProducts, selectedBrands }) => {
  const { deleteSale } = useStockCalls();
  const { sales } = useSelector((state) => state.stock);

  const columnObj = {
    created: 1,
    quantity: 1,
    price_total: 1,
    price: 1,
    product: 1,
    brand: 1,
  };

  const { sortedData, handleSort, order } = useSortColumn(sales, columnObj);

  const filtredData = sortedData
    ?.filter(
      (item) => selectedBrands.includes(item.brand) || !selectedBrands.length
    )
    .filter(
      (item) =>
        selectedProducts.includes(item.product) || !selectedProducts.length
    );

  return (
    <TableContainer component={Paper} elevation={10} sx={{ mt: 4 }}>
      <Table>
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
              <Box sx={arrowStyle} onClick={() => handleSort("brand")}>
                <Typography variant="body" noWrap>
                  Brand
                </Typography>
                {order.brand === 1 && <UpgradeIcon />}
                {order.brand !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("product")}>
                <Typography variant="body" noWrap>
                  Product
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

            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("price")}>
                <Typography variant="body" noWrap>
                  Price
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
                {order.amount === 1 && <UpgradeIcon />}
                {order.amount !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filtredData?.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{item.createds}</TableCell>
              <TableCell align="center">{item.category[0].name}</TableCell>
              <TableCell align="center">{item.brand}</TableCell>
              <TableCell align="center">{item.product}</TableCell>
              <TableCell align="center">{item.quantity}</TableCell>
              <TableCell align="center">{`$${item.price}`}</TableCell>
              <TableCell align="center">{`$${item.price_total}`}</TableCell>
              <TableCell>
                <Box sx={flex}>
                  <EditIcon
                    sx={{ ...editHoverStyle, mr: 1 }}
                    onClick={() => {
                      setOpen(true);
                      setInfo(item);
                    }}
                  />

                  <DeleteForeverIcon
                    onClick={() => deleteSale(item.id)}
                    sx={btnHoverStyle}
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default SalesTable;
