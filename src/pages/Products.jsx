import { useEffect, useState } from "react";
import useStockCalls from "../hooks/useStockCalls";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import ProductModal from "../components/modals/ProductModal";
import ProductsTable from "../components/tables/ProductsTable";
import MultiSelect from "../components/MultiSelect";

const Products = () => {
  const { getProCatBrands } = useStockCalls();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    getProCatBrands();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Products
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>

      <MultiSelect
        data={products}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        setSelectedProducts={setSelectedProducts}
      />

      <ProductModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {products?.length > 0 && (
        <ProductsTable
          setOpen={setOpen}
          setInfo={setInfo}
          selectedProducts={selectedProducts}
          selectedBrands={selectedBrands}
        />
      )}
    </Box>
  );
};

export default Products;
