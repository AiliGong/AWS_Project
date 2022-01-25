import * as React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import DateFnsUtils from "@date-io/date-fns";
// MUI
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@material-ui/data-grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
//Icons
import DeleteIcon from "@material-ui/icons/Delete";
import DownloadIcon from "@material-ui/icons/CloudDownload";
import EditIcon from "@material-ui/icons/Edit";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

function PayDialog({ open, handleClose, data, getBills }) {
  const [payDate, setPayDate] = React.useState(new Date());
  const { enqueueSnackbar } = useSnackbar();
  const payBill = async () => {
    await axios
      .post("/api/paybill", {
        ...data,
        date: payDate,
      })
      .then((response) => {
        enqueueSnackbar("The bill is paid.", {
          variant: "success",
        });
        getBills();
      })
      .catch((error) => {
        console.log(error);
        enqueueSnackbar("Something is wrong, please try again.", {
          variant: "error",
        });
      });
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Pay Date</DialogTitle>
      <DialogContent>
        <DialogContentText>Plase select pay date:</DialogContentText>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            value={payDate}
            onChange={setPayDate}
            disableToolbar
            variant="inline"
            format="dd/MM/yyyy"
            margin="dense"
            color="secondary"
            label="Date"
          />
        </MuiPickersUtilsProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            payBill();
            handleClose();
          }}
          color="default"
        >
          Pay
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default function ContactsTable({
  bills,
  onEdit,
  contacts,
  accounts,
  getBills,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [openPayDialog, setOpenPayDialog] = React.useState(false);
  const [onPayRow, setOnPayRow] = React.useState(null);

  if (!bills) {
    return null;
  }

  const deleteBill = (id) => {
    axios
      .delete("/api/bills", { data: { id } })
      .then((response) => {
        enqueueSnackbar("Bill has been deleted.", {
          variant: "success",
        });
        getBills();
      })
      .catch((error) => {
        enqueueSnackbar("Something is wrong, please try again.", {
          variant: "error",
        });
        console.log(error);
      });
  };

  const columns = () => {
    return [
      { field: "id", hide: true },
      { field: "reference", headerName: "Ref", width: 150, editable: true },
      {
        field: "from",
        headerName: "From",
        width: 120,
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
        width: 120,
        valueGetter: (params) =>
          new Date(params.row.date).toISOString().split("T")[0],
      },
      {
        field: "due_date",
        headerName: "Due Date",
        width: 120,
        valueGetter: (params) =>
          new Date(params.row.due_date).toISOString().split("T")[0],
      },
      {
        field: "amount",
        headerName: "Amount",
        width: 120,
        valueFormatter: ({ value }) => currencyFormatter.format(Number(value)),
      },
      {
        field: "is_paid",
        headerName: "Status",
        width: 120,
        valueGetter: (params) => (params.row.is_paid ? "Paid" : "Unpaid"),
      },
      {
        field: "account",
        headerName: "Account",
        width: 120,
        valueGetter: (params) => {
          const result = accounts.find(
            (account) =>
              account && account.id && account.id === params.row.account
          );
          return (result && result.name) || "";
        },
      },
      {
        field: "Action",
        width: 100,
        renderCell: (params) => (
          <>
            <IconButton
              size="small"
              onClick={() => {
                window.open(params.row.attachmentSignedUrl, "_blank");
              }}
              disabled={!params.row.attachmentSignedUrl}
            >
              <Tooltip title="Download" aria-label="download">
                <DownloadIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                onEdit(params.row);
              }}
              disabled={params.row.is_paid == true}
            >
              <Tooltip title="Edit" aria-label="edit">
                <EditIcon />
              </Tooltip>
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                deleteBill(params.row.id);
              }}
              disabled={params.row.is_paid == true}
            >
              <Tooltip title="Delete" aria-label="delete">
                <DeleteIcon />
              </Tooltip>
            </IconButton>
          </>
        ),
      },
      {
        field: "Pay",
        width: 100,
        renderCell: (params) => (
          <>
            <Tooltip title="Pay Bill" aria-label="pay-bill">
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={() => {
                  setOnPayRow(params.row);
                  setOpenPayDialog(true);
                }}
                disabled={params.row.is_paid == true}
              >
                Pay
              </Button>
            </Tooltip>
          </>
        ),
      },
    ];
  };

  return (
    <>
      <div
        style={{
          height: 400,
          backgroundColor: "#FFFAFA",
        }}
      >
        <DataGrid
          rows={bills}
          columns={columns()}
          hideFooterSelectedRowCount
          pageSize={10}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
      <PayDialog
        data={onPayRow}
        open={openPayDialog}
        getBills={getBills}
        handleClose={() => {
          // Cloes the pay date dialog and clean up current selected pay row
          setOnPayRow(null);
          setOpenPayDialog(false);
        }}
      />
    </>
  );
}
const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
