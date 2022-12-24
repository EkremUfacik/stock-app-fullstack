import { Alert, Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FirmCard from "../components/FirmCard";
import useStockCalls from "../hooks/useStockCalls";
import FirmModal from "../components/modals/FirmModal";
import { flexCenter } from "../styles/globalStyle";

const Firms = () => {
  const { getFirms } = useStockCalls();
  const { firms, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getFirms();
    // eslint-disable-next-line
  }, []);

  return (
    <Box>
      <Typography variant="h4" mb={4}>
        Firms
      </Typography>

      <Button
        variant="contained"
        onClick={() => {
          setOpen(true);
        }}
      >
        New Firm
      </Button>

      <FirmModal open={open} setOpen={setOpen} info={info} setInfo={setInfo} />

      {!loading && !firms?.length && (
        <Alert severity="warning" sx={{ mt: 4, width: "50%" }}>
          There is no firms to show
        </Alert>
      )}

      {firms?.length > 0 && (
        <Grid container sx={flexCenter} mt={3}>
          {firms?.map((firm) => (
            <Grid item key={firm.id}>
              <FirmCard firm={firm} setOpen={setOpen} setInfo={setInfo} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Firms;
