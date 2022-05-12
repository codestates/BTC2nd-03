import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";

import { Tcolumns } from "./Constatns";
import { Trows } from "./Constatns";

const TransactionPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
      }}
    >
      <div style={{ height: 1200, width: "112%", marginTop: "5rem" }}>
        <DataGrid
          rows={Trows}
          columns={Tcolumns}
          pageSize={25}
          rowsPerPageOptions={[5]}
        />
      </div>
    </Box>
  );
};

export default TransactionPage;
