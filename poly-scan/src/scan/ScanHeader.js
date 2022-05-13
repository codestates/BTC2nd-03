import NativeSelect from "@mui/material/NativeSelect";
import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";

const ScanHeader = () => {
  return (
    <Box component="form">
      <img
        src="/logo_transparent.png"
        alt="no img"
        width="180px"
        height="150px"
        style={{ position: "relative", top: "-2.8rem", marginLeft: "2rem" }}
      />
      <FormControl
        sx={{
          m: 1,
          minWidth: 120,
          position: "relative",
          right: "-32rem",
          marginTop: "1rem",
        }}
      >
        <NativeSelect
          defaultValue={"none"}
          inputProps={{
            name: "category",
            id: "uncontrolled-native",
          }}
        >
          <option value={"none"}>All Filters</option>
          <option value={"Addresses"}>Addresses</option>
          <option value={"Name Tags"}>Name Tags</option>
          <option value={"Labels"}>Labels</option>
          <option value={"Websites"}>Websites</option>
        </NativeSelect>
      </FormControl>
      <TextField
        id="standard-search"
        type="search"
        variant="outlined"
        size="small"
        sx={{
          position: "relative",
          right: "-32rem",
          marginTop: "0.7rem",
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default ScanHeader;
