import * as React from "react";
// MUI
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

export default function CashFlow({ contacts, transactions }) {
  if (!transactions) {
    return null;
  }

  return (
    <div
      style={{
        height: 400,
        width: 800,
        backgroundColor: "#FFFAFA",
      }}
    >
      <DataGrid
        rows={transactions}
        columns={columns(contacts)}
        hideFooterSelectedRowCount
        pageSize={10}
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

const columns = (contacts) => {
  return [
    { field: "id", hide: true },
    {
      field: "from",
      headerName: "From",
      width: 120,
      valueGetter: (params) => {
        if (params.row.category == "expense") {
          return "";
        } else {
          const result = contacts.find(
            (contact) =>
              contact && contact.id && contact.id === params.row.contact
          );
          return (result && result.name) || "";
        }
      },
    },
    {
      field: "to",
      headerName: "To",
      width: 120,
      valueGetter: (params) => {
        if (params.row.category == "income") {
          return "";
        } else {
          const result = contacts.find(
            (contact) =>
              contact && contact.id && contact.id === params.row.contact
          );
          return (result && result.name) || "";
        }
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
      field: "income",
      headerName: "Income",
      width: 150,
      valueGetter: (params) => {
        if (params.row.category == "income") {
          return currencyFormatter.format(Number(params.row.amount));
        }
      },
    },
    {
      field: "amount",
      headerName: "Expense",
      width: 150,
      valueGetter: (params) => {
        if (params.row.category == "expense") {
          return currencyFormatter.format(Number(params.row.amount));
        }
      },
    },
  ];
};
