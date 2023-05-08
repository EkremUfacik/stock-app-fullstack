import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useStockCalls from "../hooks/useStockCalls";
import MultiSelect from "../components/MultiSelect";
import SaleModal from "../components/modals/SaleModal";
import SalesTable from "../components/tables/SalesTable";

const Sales = () => {
  const { sales, products } = useSelector((state) => state.stock);
  console.log(products);
  console.log(sales);
  const { getProCatBrands, getSales } = useStockCalls();
  // const { getAllStockData } = useStockCalls();

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getProCatBrands();
    getSales();
    // getAllStockData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Typography variant="h4" mb={4}>
        Sales
      </Typography>
      <Button
        variant="contained"
        onClick={() => {
          setInfo({});
          setOpen(true);
        }}
      >
        New Sale
      </Button>

      <SaleModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={() => setOpen(false)}
      />

      {sales?.length > 0 && (
        <>
          <MultiSelect
            data={sales}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            setSelectedProducts={setSelectedProducts}
          />

          <SalesTable
            setOpen={setOpen}
            setInfo={setInfo}
            selectedProducts={selectedProducts}
            selectedBrands={selectedBrands}
          />
        </>
      )}
    </>
  );
};

export default Sales;
