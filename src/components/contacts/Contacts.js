import React from "react";
import axios from "axios";
import { useState } from "react";
import { useSnackbar } from "notistack";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import Tooltip from "@material-ui/core/Tooltip";
// Icons
import AddIcon from "@material-ui/icons/Add";
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";

// Components
import CreateContact from "./CreateContact";
import ContactsTable from "./ContactsTable";
import EditContact from "./EditContact";

const useStyles = makeStyles((theme) => ({
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
  const [onCreateDialog, setOnCreateDialog] = useState(false);
  const [onUpdateDialog, setOnUpdateDialog] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [contacts, setContacts] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  const getContacts = async () => {
    axios
      .get("/api/contacts/")
      .then((res) => {
        const data = res.data;
        setContacts(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(getContacts, []);

  // Function should be moved here as it is easier to manage the state and rerender component
  const deleteContact = (id) => {
    axios
      .delete("/api/contacts", { data: { id } })
      .then((response) => {
        enqueueSnackbar("Contact has been deleted.", {
          variant: "success",
        });
        getContacts();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className={classes.title}>
        <PermContactCalendarIcon fontSize="large" />
        <Typography variant="h4">Contacts</Typography>
      </div>

      <Tooltip title="Add new contact" aria-label="add">
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

      <ContactsTable
        contacts={contacts}
        onEdit={(contact) => {
          setEditingContact(contact);
          setOnUpdateDialog(true);
        }}
        deleteContact={deleteContact}
      />
      <CreateContact open={onCreateDialog} setOpen={setOnCreateDialog} getContacts={getContacts} />
      <EditContact
        open={onUpdateDialog}
        setOpen={setOnUpdateDialog}
        contact={editingContact}
        getContacts={getContacts}
      />
    </div>
  );
}
