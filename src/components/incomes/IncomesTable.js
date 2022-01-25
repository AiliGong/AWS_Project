import * as React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
// MUI
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import IconButton from "@material-ui/core/IconButton";
import { Tooltip } from "@material-ui/core";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function IncomesTable({
  contacts,
  incomes,
  onEdit,
  getIncomes,
}) {
  const { enqueueSnackbar } = useSnackbar();

  if (!incomes) {
    return null;
  }

  const deleteExpense = (id) => {
    axios
      .delete("/api/transactions", { data: { id } })
      .then((response) => {
        enqueueSnackbar("Income has been deleted.", {
          variant: "success",
        });
        getIncomes()
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
        height: 400,
        backgroundColor: "#FFFAFA",
      }}
    >
      <DataGrid
        rows={incomes}
        columns={columns(onEdit, deleteExpense, contacts)}
        hideFooterSelectedRowCount
        pageSize={5}
        components={{
          Toolbar: CustomToolbar,
        }}
      />
    </div>
  );
}
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const columns = (onEdit, deleteExpense,contacts) => {
  return [
    { field: "id", hide: true },
    { field: "reference", headerName: "Ref", width: 150, editable: true },
    {
      field: "from",
      headerName: "From",
      width: 200,
      valueGetter: (params) => {
        const result = contacts.find(
          (contact) =>
            contact && contact.id && contact.id === params.row.contact
        );
        return (result && result.name) || "";
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
      valueGetter: (params) =>
        new Date(params.row.date).toISOString().split("T")[0],
    },
    {
      field: "amount",
      headerName: "Amount",
      width: 120,
      valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
    },
    {
      field: "a",
      width: 50,
      headerName: "Edit",
      renderCell: (params) => (
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
      ),
    },
    {
      field: "cta",
      width: 50,
      headerName: "Delete",
      renderCell: (params) => (
        <IconButton
          size="small"
          onClick={() => {
            deleteExpense(params.row.id);
          }}
        >
          <Tooltip title="Delete" aria-label="delete">
            <DeleteIcon />
          </Tooltip>
        </IconButton>
      ),
    },
  ];
};
