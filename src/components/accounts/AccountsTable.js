import * as React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
//MUI
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
// Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function AccountsTable({ accounts, onEdit, getAccounts }) {
  const { enqueueSnackbar } = useSnackbar();

  if (!accounts) {
    return null;
  }
  const deleteAccount = (id) => {
    axios
      .delete("/api/accounts", { data: { id } })
      .then((response) => {
        enqueueSnackbar("Account has been deleted.", {
          variant: "success",
        });
        getAccounts();
      })
      .catch((error) => {
        enqueueSnackbar("Something is wrong, please try again.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  return (
    <div
      style={{
        height: 500,
        width: 400,
        backgroundColor: "#FFFAFA",
      }}
    >
      <DataGrid
        rows={accounts}
        columns={columns(onEdit, deleteAccount)}
        hideFooterSelectedRowCount
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

const columns = (onEdit, deleteAccount) => {
  return [
    { field: "name", headerName: "Name", width: 200 },
   
    {
      field: "Action",
      width: 200,
      headerName: "",
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              onEdit(params.row);
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              deleteAccount(params.row.id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];
};
