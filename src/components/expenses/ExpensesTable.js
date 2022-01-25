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

export default function ExpensesTable({
  accounts,
  contacts,
  expenses,
  onEdit,
  getExpenses,
}) {
  const { enqueueSnackbar } = useSnackbar();
  if (!expenses) {
    return null;
  }

  const deleteExpense = (expense) => {
    //if transaction is related to a bill, mark the bill as unpaid after delete
    // const id = expense.id;
    axios
      .delete("/api/transactions", { data: expense })
      .then((response) => {
        enqueueSnackbar("Expense has been deleted.", {
          variant: "success",
        });
        getExpenses();
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
        backgroundColor: "#FFFAFA",
      }}
    >
      <DataGrid
        rows={expenses}
        columns={columns(onEdit, deleteExpense, contacts, accounts)}
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

const columns = (onEdit, deleteExpense, contacts, accounts) => {
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
        return (result && result.name) || null;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 150,
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
      field: "account",
      headerName: "Account",
      width: 150,
      valueGetter: (params) => {
        const result = accounts.find(
          (account) =>
            account && account.id && account.id === params.row.account
        );
        return (result && result.name) || "";
      },
    },
    {
      field: "edit",
      width: 50,
      headerName: "Edit",
      renderCell: (params) => (
        <IconButton
          disabled={!!params.row.bill}
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
            deleteExpense(params.row);
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
