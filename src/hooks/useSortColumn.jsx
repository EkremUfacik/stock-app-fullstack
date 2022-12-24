import { useEffect, useState } from "react";

const useSortColumn = (data, columnObj) => {
  //? Siralanacak local state (sutun verilerinin local state hali)
  const [sortedData, setSortedData] = useState(data);
  const [order, setOrder] = useState(columnObj);

  //! data state'i her guncellendiginde local state'i de guncelle
  useEffect(() => {
    setSortedData(data);
  }, [data]);

  const handleSort = (arg) => {
    setOrder({ ...order, [arg]: order[arg] * -1 });
    console.log(order);

    const sortFunc = (a, b) => {
      if (isNaN(a[arg] * 1)) {
        if (a[arg] < b[arg]) {
          return order[arg];
        } else if (a[arg] > b[arg]) {
          return order[arg] * -1;
        } else return 0;
      } else {
        return (b[arg] - a[arg]) * order[arg];
      }
    };

    setSortedData([...data].sort(sortFunc));
    console.log(data);
    console.log(sortedData);
  };

  return { sortedData, handleSort, order };
};

export default useSortColumn;
