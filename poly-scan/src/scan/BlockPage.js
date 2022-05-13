import { Box, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { columns } from "./Constatns";
import { rows } from "./Constatns";

const BlockPage = () => {
  return (
    <Container maxWidth="lg">
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <div
          style={{
            height: 1200,
            width: "112%",
            marginTop: "5rem",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[25]}
          />
        </div>
      </Box>
    </Container>
  );
};

export default BlockPage;
