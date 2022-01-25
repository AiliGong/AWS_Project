import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Components
import ExpenseForm from "../../src/components/expenses/ExpenseForm";

export default function Contacts() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6">Add New Expense</Typography>
        <ExpenseForm
          onSubmitForm={(data) => {
            axios
              .post("/api/transactions", data)
              .then((response) => {
                Router.push("/expense");
                enqueueSnackbar("New expense has been added successfully.", {
                  variant: "success",
                });
              })
              .catch((error) => {
                enqueueSnackbar("Something is wrong, please try again.", {
                  variant: "error",
                });
                console.log(error);
              });
          }}
        />
      </Grid>
    </>
  );
}
