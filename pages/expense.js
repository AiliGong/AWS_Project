import axios from "axios";
import React from "react";
import { getSession } from "next-auth/client";
// MUI
import Fab from "@material-ui/core/Fab";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import AddIcon from "@material-ui/icons/Add";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
// Components
import ExpensesTable from "../src/components/expenses/ExpensesTable";
import CreateExpense from "../src/components/expenses/CreateExpense";
import EditExpense from "../src/components/expenses/EditExpense";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "80%",
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

export default function Contacts({ session }) {
  const classes = useStyles();
  const [onCreateDialog, setOnCreateDialog] = React.useState(false);
  const [onUpdateDialog, setOnUpdateDialog] = React.useState(false);
  const [editingExpense, setEditingExpense] = React.useState(null);
  const [expenses, setExpenses] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  const getExpenses = async () => {
    axios
      .get(`/api/transactions`, { params: { type: "expense" } })
      .then((res) => {
        setExpenses(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getContacts = async () => {
    axios
      .get(`/api/contacts`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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

  React.useEffect(() => {
    getContacts();
    getAccounts();
    getExpenses();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <MonetizationOnIcon fontSize="large" />
        <Typography variant="h4">Expense</Typography>
      </div>

      <Tooltip title="Add a new bill" aria-label="add">
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

      <ExpensesTable
        expenses={expenses}
        onEdit={(expense) => {
          setEditingExpense(expense);
          setOnUpdateDialog(true);
        }}
        getExpenses={getExpenses}
        contacts={contacts}
        accounts={accounts}
      />
      <CreateExpense
        open={onCreateDialog}
        setOpen={setOnCreateDialog}
        getExpenses={getExpenses}
      />
      <EditExpense
        open={onUpdateDialog}
        setOpen={setOnUpdateDialog}
        expense={editingExpense}
        getExpenses={getExpenses}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context);

  return {
    props: { session },
  };
}
