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
import Tooltip from "@material-ui/core/Tooltip";

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

export default function ContactsTable({ contacts, onEdit, deleteContact }) {
  if (!contacts) {
    return null;
  }
  return (
    <div
      style={{
        height: 500,
        width: 1200,
        backgroundColor: "#FFFAFA",
      }}
    >
      <DataGrid
        rows={contacts}
        columns={columns(onEdit, deleteContact)}
        hideFooterSelectedRowCount
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}

const columns = (onEdit, deleteContact) => {
  return [
    { field: "name", headerName: "Name", width: 150 },
    { field: "address", headerName: "address", width: 230 },
    {
      field: "email",
      headerName: "Email",
      width: 230,
    },
    {
      field: "contact_number",
      headerName: "Contact Number",
      width: 170,
    },
    {
      field: "bank_account",
      width: 150,
      headerName: "Bank Account",
    },
    {
      field: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              onEdit(params.row);
            }}
          >
            <Tooltip title="Edit" aria-label="edit">
              <EditIcon />
            </Tooltip>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              deleteContact(params.row.id);
            }}
          >
            <Tooltip title="Delete" aria-label="delete">
              <DeleteIcon />
            </Tooltip>
          </IconButton>
        </>
      ),
    },
  ];
};
