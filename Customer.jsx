import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
} from "@mui/material";
import Modal from "./Modal";
import "./Modal.css";
import { DataGrid } from "@mui/x-data-grid";
import IconButton from "@mui/material/IconButton";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import SearchIcon from "@mui/icons-material/Search";

const Customers = () => {
  const [customerData, setCustomerData] = useState([]);
  const [apps, setApps] = useState([]);
  const [open, setOpen] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const getCustomerData = async () => {
    setSpinner(true);
    const res = await axios.get(
      "https://owlapplicationbuilder.com/api/entities/customwebsiteclub/user_accounts/get_all_en?page_size="
    );
    const data = await res.data.data;
    setCustomerData(data);

    setSpinner(false);
  };

  const handleClick = async (token) => {
    setLoading(true);
    const res = await axios.get(
      `https://owlapplicationbuilder.com/api/entities/${token}/apps/get_all_en?page=1&page_size=15&fld=_id&srt=-1`
    );
    const data = await res.data.data;
    setApps(data);
    setLoading(false);
  };

  useEffect(() => {
    getCustomerData();
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredResults = customerData.filter((result) =>
    result.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "account_type",
      headerName: "Account Type",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "created_at",
      headerName: "Created at",
      width: 150,
      editable: true,
      flex: 1,
    },
    {
      field: "apps",
      headerName: "Apps",
      flex: 1,
      renderCell: (cellValues) => {
        return (
          <IconButton
            onClick={() => {
              setOpen(true);
              handleClick(cellValues.row.id);
            }}
          >
            <RemoveRedEyeIcon style={{ color: "#48bb78" }} />
          </IconButton>
        );
      },
    },
  ];

  const rows = filteredResults.map((row) => {
    return {
      id: row.token,
      title: row.title,
      account_type: row.account_type,
      created_at: row.created_at,
    };
  });

  return (
    <Container maxWidth={false}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center
      "
      >
        <Typography className="account_apps">Accounts & Apps</Typography>
        <FormControl
          sx={{ m: 1, width: "30ch" }}
          variant="outlined"
          size="small"
        >
          <InputLabel>Search Account</InputLabel>{" "}
          <OutlinedInput
            id="outlined-adornment-Search"
            type="text"
            value={searchTerm}
            onChange={handleChange}
            endAdornment={
              <InputAdornment position="end">
                <IconButton edge="end">
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            }
            label="Search Account"
          />
        </FormControl>
      </Box>
      <Box sx={{ width: "100%", height: 650 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={20}
          rowsPerPageOptions={[20]}
          checkboxSelection
          disableSelectionOnClick
          loading={spinner}
        />
        <Modal apps={apps} open={open} setOpen={setOpen} loading={loading} />
      </Box>
    </Container>
  );
};
export default Customers;
