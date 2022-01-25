import React from "react";
import axios from "axios";
import { useSnackbar } from "notistack";

// MUI
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
// Components
import ContactsForm from "./ContactsForm";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  container: {
    paddingTop: 40,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditContact({ open, setOpen, contact, getContacts }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (!contact) {
    return null;
  }

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => {
              setOpen(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit Contact
          </Typography>
        </Toolbar>
      </AppBar>
      {contact && (
        <ContactsForm
          contact={contact}
          onSubmitForm={async (data) => {
            try {
              let validPhone = true;
              if (data.contact_number) {
                const { data: phoneValidateData } = await axios.get(
                  "/api/validate-phone",
                  {
                    params: {
                      number: data.contact_number,
                    },
                  }
                );
                validPhone = phoneValidateData.valid;
              }
              if (validPhone) {
                await axios.patch("api/contacts", data);
                setOpen(false);
                enqueueSnackbar("New contact has been added successfully.", {
                  variant: "success",
                });
                getContacts();
              } else {
                enqueueSnackbar("Please enter a valid contact number!", {
                  variant: "Error",
                });
              }
            } catch (error) {
              console.log(error);
              enqueueSnackbar(
                "Something went wrong, please refresh the page and try again!",
                {
                  variant: "Error",
                }
              );
            }
          }}
        />
      )}
    </Dialog>
  );
}
