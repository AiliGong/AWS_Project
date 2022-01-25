import React from "react";
import { useForm, Controller } from "react-hook-form";
import DateFnsUtils from "@date-io/date-fns";
import moment from "moment";
// MUI
import { DropzoneDialog } from "material-ui-dropzone";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// components
import CustomNumberFormat from "../general/CustomNumberFormat";
import SelectAccount from "../accounts/SelectAccount";
import SelectContact from "../contacts/SelectContact";
//Icons
import SaveIcon from "@material-ui/icons/Save";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 40,
  },
}));

export default function ExpenseForm({ onSubmitForm, expense }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...expense,
      date: expense && expense.date ? new Date(expense.date) : new Date(),
    },
  });

  const classes = useStyles();
  const onSubmit = handleSubmit((data) => {
    onSubmitForm({
      ...data,
      category: "expense",
    });
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Controller
              name="contact"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectContact
                  onSelectContact={field.onChange}
                  selectedContact={field.value}
                  error={errors.contact}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="date"
              control={control}
              render={({ field }) => (
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    {...field}
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="dense"
                    color="secondary"
                    label="Date"
                  />
                </MuiPickersUtilsProvider>
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="reference"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Reference"
                  color="secondary"
                  margin="dense"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="amount"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  margin="dense"
                  label="Amount"
                  error={errors.amount}
                  InputProps={{
                    inputComponent: CustomNumberFormat,
                  }}
                />
              )}
            />
          </Grid>
          <hr />
          <Grid item xs={12}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  color="secondary"
                  margin="dense"
                  label="Description"
                />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              name="account"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <SelectAccount
                  onSelectAccount={field.onChange}
                  selectedAccount={field.value}
                  error={errors.account}
                />
              )}
            />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Save
          </Button>
          <Button
            variant="contained"
            // color="primary"
            color="inherit"
            onClick={() => {
              reset();
            }}
          >
            Reset
          </Button>
        </Grid>
      </Container>
    </form>
  );
}
