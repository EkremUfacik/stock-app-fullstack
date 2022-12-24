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
  const { deleteProduct } = useStockCalls();
  const { products } = useSelector((state) => state.stock);

  const columnObj = {
    brand: 1,
    name: 1,
    stock: 1,
    id: 1,
  };

  const { sortedData, order, handleSort } = useSortColumn(products, columnObj);

  //? Verilen item secilen brand'larin icerisinde varsa true dondurur
  //? VEYA hic brand secilmemisse true dondurur.aksinde false dondurur.
  //? bu fonksiyon filter() icerisinde yazilacagi icin false dondurmesi
  //? durumunda filter bir suzme yapmamis olur.

  const filtredData = sortedData
    ?.filter(
      (item) => selectedBrands.includes(item.brand) || !selectedBrands.length
    )
    .filter(
      (item) => selectedProducts.includes(item.name) || !selectedProducts.length
    );

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }} elevation={10}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("id")}>
                <Typography variant="body" noWrap>
                  #
                </Typography>
                {order.id === 1 && <UpgradeIcon />}
                {order.id !== 1 && <VerticalAlignBottomIcon />}
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
              <Box sx={arrowStyle} onClick={() => handleSort("name")}>
                <Typography variant="body" noWrap>
                  Name
                </Typography>
                {order.name === 1 && <UpgradeIcon />}
                {order.name !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">
              <Box sx={arrowStyle} onClick={() => handleSort("stock")}>
                <Typography variant="body" noWrap>
                  Stock
                </Typography>
                {order.stock === 1 && <UpgradeIcon />}
                {order.stock !== 1 && <VerticalAlignBottomIcon />}
              </Box>
            </TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filtredData?.map((product) => (
            <TableRow
              key={product.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                {product.id}
              </TableCell>
              <TableCell align="center">{product.category}</TableCell>
              <TableCell align="center">{product.brand}</TableCell>
              <TableCell align="center">{product.name}</TableCell>
              <TableCell align="center">{product.stock}</TableCell>
              <TableCell align="center">
                <EditIcon
                  sx={{ ...btnHoverStyle, mr: 2 }}
                  onClick={() => {
                    setOpen(true);
                    setInfo(product);
                  }}
                />
                <DeleteForeverIcon
                  sx={btnHoverStyle}
                  onClick={() => deleteProduct(product.id)}
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
