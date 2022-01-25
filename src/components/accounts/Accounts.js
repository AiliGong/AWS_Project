import axios from "axios";
import React from "react";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import AddIcon from "@material-ui/icons/Add";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
// Components
import CreateAccount from "./CreateAccount";
import AccountsTable from "./AccountsTable";
import EditAccount from "./EditAccount";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "50%",
    height: "100%",
  },
  fab: {
    margin: 0,
    top: "auto",
    right: 40,
    bottom: 40,
    left: "auto",
    position: "fixed",
  },
  title: {
    display: "flex",
    margin: 20,
    alignItems: "center",
  },
}));

export default function Accounts() {
  const classes = useStyles();
  const [onCreateDialog, setOnCreateDialog] = React.useState(false);
  const [onUpdateDialog, setOnUpdateDialog] = React.useState(false);
  const [editingAccount, setEditingAccount] = React.useState(null);
  const [accounts, setAccounts] = React.useState(null);
  const getAccounts = async () => {
    axios
      .get(`/api/accounts`)
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(getAccounts, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <PermContactCalendarIcon fontSize="large" />
        <Typography variant="h4">Accounts</Typography>
      </div>

      <Tooltip title="Add new account" aria-label="add">
        <Fab
          color="secondary"
          aria-label="add"
          className={classes.fab}
          onClick={() => {
            setOnCreateDialog(true);
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <AccountsTable
        accounts={accounts}
        onEdit={(account) => {
          setEditingAccount(account);
          setOnUpdateDialog(true);
        }}
        getAccounts = {getAccounts}
      />
      <CreateAccount open={onCreateDialog} setOpen={setOnCreateDialog} getAccounts={getAccounts} />
      <EditAccount
        open={onUpdateDialog}
        setOpen={setOnUpdateDialog}
        account={editingAccount}
        getAccounts={getAccounts}
      />
    </div>
  );
}

