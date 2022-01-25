import axios from "axios";
import React from "react";
// MUI
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
// Icons
import AddIcon from "@material-ui/icons/Add";
//Components
import CreateAccount from "./CreateAccount";

export default function SelectAccount({
  onSelectAccount,
  selectedAccount,
  error,
}) {
  const [accounts, setAccounts] = React.useState(null);
  const [onCreateDialog, setOnCreateDialog] = React.useState(false);

  const getAccounts = async () => {
    axios
      .get(`/api/accounts`)
      .then((res) => {
        setAccounts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  React.useEffect(getAccounts, []);
  return (
    <>
      <FormControl required fullWidth>
        <InputLabel color="secondary">Account</InputLabel>
        <Select
          onChange={(e) => {
            onSelectAccount(e.target.value);
          }}
          error={error}
          value={selectedAccount}
        >
          {accounts &&
            accounts.map((data) => {
              return (
                <MenuItem key={`${data.id}_account`} value={data.id}>
                  {data.name}
                </MenuItem>
              );
            })}
          <MenuItem>
            <Button
              startIcon={<AddIcon sytle={{ paddingTop: 5 }} />}
              onClick={() => {
                setOnCreateDialog(true);
              }}
            >
              Add more
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
      <CreateAccount
        open={onCreateDialog}
        setOpen={setOnCreateDialog}
        getAccounts={getAccounts}
      />
    </>
  );
}
