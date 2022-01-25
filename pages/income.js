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
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
// Components
import CreateIncome from "../src/components/incomes/CreateIncome";
import EditIncome from "../src/components/incomes/EditIncome";
import IncomesTable from "../src/components/incomes/IncomesTable";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "60%",
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

export default function Incomes() {
  const classes = useStyles();
  const [onCreateDialog, setOnCreateDialog] = React.useState(false);
  const [onUpdateDialog, setOnUpdateDialog] = React.useState(false);
  const [editingIncome, setEditingIncome] = React.useState(null);
  const [incomes, setIncomes] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);

  const getIncomes = async () => {
    axios
      .get(`/api/transactions`, { params: { type: "income" } })
      .then((res) => {
        setIncomes(res.data);
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

  React.useEffect(() => {
    getContacts();
    getIncomes();
  }, []);
  
  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <AccountBalanceWalletIcon fontSize="large" />
        <Typography variant="h4">Incomes</Typography>
      </div>

      <Tooltip title="Add a new income" aria-label="add">
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

      <IncomesTable
        incomes={incomes}
        onEdit={(income) => {
          setEditingIncome(income);
          setOnUpdateDialog(true);
        }}
        getIncomes={getIncomes}
        contacts={contacts}
      />
      <CreateIncome
        open={onCreateDialog}
        setOpen={setOnCreateDialog}
        getIncomes={getIncomes}
      />

      <EditIncome
        open={onUpdateDialog}
        setOpen={setOnUpdateDialog}
        income={editingIncome}
        getIncomes={getIncomes}
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
