import { MultiSelectBox, MultiSelectBoxItem } from "@tremor/react";
import { flexCenter } from "../styles/globalStyle";
import Box from "@mui/material/Box";

const MultiSelect = ({
  data,
  selectedBrands,
  setSelectedBrands,
  setSelectedProducts,
}) => {
  const filtredProducts = [
    ...new Set(
      data
        ?.filter((item) => selectedBrands.includes(item.brand))
        .map((item) => item.name || item.product)
    ),
  ];

  console.log(filtredProducts);

  const brandsList = [...new Set(data?.map((item) => item.brand))];

  return (
    <Box sx={flexCenter} mt={3}>
      <MultiSelectBox
        handleSelect={(item) => setSelectedBrands(item)}
        placeholder="Select Brand"
      >
        {brandsList?.map((item) => (
          <MultiSelectBoxItem key={item} value={item} text={item} />
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
    </Box>
  );
};

export default MultiSelect;
