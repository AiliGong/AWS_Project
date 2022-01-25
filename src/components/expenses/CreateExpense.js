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
import Slide from "@material-ui/core/Slide";
//Icons
import CloseIcon from "@material-ui/icons/Close";
//component
import ExpenseForm from "./ExpenseForm";

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

export default function CreateExpense({ open, setOpen, getExpenses }) {
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
            Add New Expense
          </Typography>
        </Toolbar>
      </AppBar>
      <ExpenseForm
        onSubmitForm={(data) => {
          axios
            .post("/api/transactions", data)
            .then((response) => {
              setOpen(false); 
              enqueueSnackbar("New expense has been added successfully.", {
                variant: "success",
              });
              getExpenses();
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
