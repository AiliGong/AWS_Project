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
//component
import BillForm from "./BillForm";

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

export default function CreateContact({ open, setOpen, getBills }) {
  const { enqueueSnackbar } = useSnackbar();
  const classes = useStyles();
  
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
            Add New Bill
          </Typography>
        </Toolbar>
      </AppBar>
      <BillForm
        onSubmitForm={(data) => {
          axios
            .post("/api/bills", data)
            .then((response) => {
              setOpen(false); 
              enqueueSnackbar("New bill has been added successfully.", {
                variant: "success",
              });
              getBills()
            })
            .catch((error) => {
              enqueueSnackbar("Something is wrong, please try again.", {
                variant: "error",
              });
              console.log(error);
            });
        }}
      />
    </Dialog>
  );
}
