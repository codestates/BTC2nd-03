import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";

import { columns } from "./Constatns";
import { rows } from "./Constatns";
import Container from "./Container";

export default function DataGridDemo() {
  return (
    <>
      <Container />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          position: "relative",
          right: "-17rem",
          top: "5rem",
        }}
      >
        <div
          style={{
            height: 1200,
            width: "77%",
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={25}
            rowsPerPageOptions={[5]}
          />
        </div>
      </Box>
    </>
  );
}
