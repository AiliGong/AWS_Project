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
import DescriptionIcon from "@material-ui/icons/Description";
// Components
import CreateBill from "../src/components/bills/CreateBill";
import BillsTable from "../src/components/bills/BillsTable";
import EditBill from "../src/components/bills/EditBill";

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

export default function Contacts() {
  const classes = useStyles();
  const [onCreateDialog, setOnCreateDialog] = React.useState(false);
  const [onUpdateDialog, setOnUpdateDialog] = React.useState(false);
  const [editingBill, setEditingBill] = React.useState(null);
  const [bills, setBills] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const [accounts, setAccounts] = React.useState([]);

  const getBills = async () => {
    axios
      .get(`/api/bills`)
      .then((res) => {
        setBills(res.data);
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
    getBills();
    getContacts();
    getAccounts();
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <DescriptionIcon fontSize="large" />
        <Typography variant="h4">Bills To Pay</Typography>
      </div>

      <Tooltip title="Add a new contact" aria-label="add">
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

      <BillsTable
        bills={bills}
        onEdit={(bill) => {
          setEditingBill(bill);
          setOnUpdateDialog(true);
        }}
        getBills={getBills}
        contacts={contacts}
        accounts={accounts}
      />

      <CreateBill
        open={onCreateDialog}
        setOpen={setOnCreateDialog}
        getBills={getBills}
      />

      <EditBill
        open={onUpdateDialog}
        setOpen={setOnUpdateDialog}
        bill={editingBill}
        getBills={getBills}
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
