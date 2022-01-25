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
import AccountsForm from "./AccountsForm";

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

export default function EditAccount({ open, setOpen, account, getAccounts }) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  if (!account) {
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
      {account && (
        <AccountsForm
          account={account}
          onSubmitForm={(data) => {
            axios
              .patch("/api/accounts", data)
              .then((response) => {
                setOpen(false);
                enqueueSnackbar("Save successfully.", {
                  variant: "success",
                });
                getAccounts();
              })
              .catch((error) => {
                enqueueSnackbar("Something is wrong. Please try again.", {
                  variant: "error",
                });
                setOpen(false);
              });
          }}
        />
      )}
    </Dialog>
  );
}
