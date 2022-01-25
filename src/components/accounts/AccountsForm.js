import React from "react";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
// MUI
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
// components

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 40,
  },
}));

export default function AccountForm({ onSubmitForm, account }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: account,
  });
  const classes = useStyles();
  const onSubmit = handleSubmit((data) => {
    onSubmitForm(data);
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container maxWidth="sm" className={classes.container}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="name"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Name"
                  placeholder="Food"
                  error={errors.name}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Grid container justify="space-between">
              <Grid item>
                <Button color="primary" variant="contained" onClick={onSubmit}>
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => {
                    reset();
                  }}
                >
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
}
