import { Button, Grid } from "@material-ui/core";
import { signIn, useSession } from "next-auth/client";
import React from "react";
import Router from "next/router";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 700,
    margin: theme.spacing(4),
  },
}));

export default function Login() {
  const [session, loading] = useSession();
  const classes = useStyles();

  if (session) {
    Router.push("/");
  }
  return (
    <>
      <Grid
        className={classes.root}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Typography variant="h3">
          Welcome to Kaikei !
        </Typography>
        <br/>

        <Typography variant="h6">Please login</Typography>

        <Button
          size="large"
          variant="contained"
          onClick={() => {
            signIn({
              callbackUrl: `${window.location.origin}`,
            });
          }}
        >
          Login
        </Button>
      </Grid>
    </>
  );
}
