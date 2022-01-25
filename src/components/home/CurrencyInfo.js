import React from "react";
import useSWR from "swr";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export default function CurrencyInfo() {
  const { data: results } = useSWR("/api/currency");
  if (!results) {
    return null;
  }
  return (
    <Grid container spacing={2} style={{ marginTop: 24 }}>
      <Grid item xs={12}>
        <Typography variant="h4">Today's Currency Rate</Typography>
      </Grid>
      <Grid item xs={12}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          style={{ backgroundColor: "white", padding: 16 }}
        >
          {results.map((result) => {
            return (
              <Grid item>
                <Grid container direction="column">
                  <Grid item>
                    <Typography>{result.key}</Typography>
                  </Grid>
                  <Grid item>
                    <Typography>{result.value}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
