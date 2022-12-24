import { useEffect, useState } from "react";
import useStockCalls from "../hooks/useStockCalls";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import PurchaseModal from "../components/modals/PurchaseModal";
import PurchasesTable from "../components/tables/PurchasesTable";
import MultiSelect from "../components/MultiSelect";

const Purchases = () => {
  const { getProCatBrands } = useStockCalls();
  const { purchases } = useSelector((state) => state.stock);
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
        Purchases
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New Product
      </Button>

      {/* <Box sx={flexCenter} mt={3}>
        <MultiSelectBox
          handleSelect={(item) => setSelectedBrands(item)}
          placeholder="Select Brand"
        >
          {brands?.map((item) => (
            <MultiSelectBoxItem
              key={item.name}
              value={item.name}
              text={item.name}
            />
          ))}
        </MultiSelectBox>

        <MultiSelectBox
          handleSelect={(item) => setSelectedProducts(item)}
          placeholder="Select Product"
        >
          {filtredProducts?.map((item) => (
            <MultiSelectBoxItem key={item} value={item} text={item} />
          ))}
        </MultiSelectBox>
      </Box> */}

      <MultiSelect
        data={purchases}
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        setSelectedProducts={setSelectedProducts}
      />

      <PurchaseModal
        open={open}
        setOpen={setOpen}
        info={info}
        setInfo={setInfo}
      />

      {purchases?.length > 0 && (
        <PurchasesTable
          setOpen={setOpen}
          setInfo={setInfo}
          selectedProducts={selectedProducts}
          selectedBrands={selectedBrands}
        />
      )}
    </Box>
  );
};

export default Purchases;
