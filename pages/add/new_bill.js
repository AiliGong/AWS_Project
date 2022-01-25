import axios from "axios";
import Router from "next/router";
import { useSnackbar } from "notistack";
//MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//Components
import BillForm from "../../src/components/bills/BillForm";

export default function Contacts() {
  const { enqueueSnackbar } = useSnackbar();

  return (
    <>
      <Grid container direction="column" justify="center" alignItems="center">
        <Typography variant="h6">Add New Bill</Typography>
        <BillForm
          onSubmitForm={(data) => {
            axios
              .post("/api/bills/add", data)
              .then((response) => {
                Router.push("/bills");
                enqueueSnackbar("New bill has been added successfully.", {
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
