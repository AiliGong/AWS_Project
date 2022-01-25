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

export default function ContactForm({ onSubmitForm, contact }) {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: contact,
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
                  placeholder="Harry Porter"
                  error={errors.name}
                  required
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Address"
                  placeholder="124 La Trobe St, Melbourne VIC 3000"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Email"
                  placeholder="aili.elly.gong@gmail.com"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="contact_number"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  fullWidth
                  label="Contact number"
                  placeholder="61451933511"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="bank_account"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  name="bank_account"
                  fullWidth
                  label="Bank Account"
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
