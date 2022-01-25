import axios from "axios";
import React from "react";
import { useState } from "react";

// MUI
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
// Icons
import AddIcon from "@material-ui/icons/Add";

import CreateContact from "./CreateContact";

export default function SelectContact({ onSelectContact, selectedContact, error }) {
  const [contacts, setContacts] = React.useState(null);
  const [onCreateDialog, setOnCreateDialog] = useState(false);

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
  React.useEffect(getContacts, []);

  if (!contacts) {
    return null;
  }

  return (
    <>
      <FormControl required fullWidth>
        <InputLabel color="secondary">From</InputLabel>
        <Select
          onChange={(e) => {
            onSelectContact(e.target.value);
          }}
          value={selectedContact}
          error={error}
        >
          {contacts.map((data) => {
            return (
              <MenuItem key={`${data.id}_contact`} value={data.id}>
                {data.name}
              </MenuItem>
            );
          })}
          <MenuItem>
            <Button
              startIcon={<AddIcon sytle={{ paddingTop: 5 }} />}
              onClick={() => {
                setOnCreateDialog(true);
              }}
            >
              Add more
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
      <CreateContact
        open={onCreateDialog}
        setOpen={setOnCreateDialog}
        getContacts={getContacts}
      />
    </>
  );
}
