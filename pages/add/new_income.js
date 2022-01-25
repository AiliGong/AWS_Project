import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Components
import IncomeForm from "../../src/components/incomes/IncomeForm";

export default function Contacts() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6">Add New Income</Typography>
        <IncomeForm
          onSubmitForm={(data) => {
            axios
              .post("/api/incomes/add", data)
              .then((response) => {
                Router.push("/incomes");
                enqueueSnackbar("New income has been added successfully.", {
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
