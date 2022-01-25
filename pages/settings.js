import { getSession } from "next-auth/client";
import React from "react";
import Router from "next/router";
import PropTypes from "prop-types";
//Components
import Accounts from "../src/components/accounts/Accounts";
import Contacts from "../src/components/contacts/Contacts";
import UserInfo from "../src/components/user/userInfo"
//MUI
import AppBar from "@material-ui/core/AppBar";
import Box from "@material-ui/core/Box";
import { Button } from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: index,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: "80%"
  },
}));

export default function Index({ session }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs
            value={value}
            onChange={handleChange}
          >
            <Tab label="Setting" {...a11yProps(0)} />
            <Tab label="Accounts" {...a11yProps(1)} />
            <Tab label="Contacts" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
        <UserInfo session={session} />

        </TabPanel>
        <TabPanel value={value} index={1}>
          <Accounts />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <Contacts />
        </TabPanel>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context);

  return {
    props: { session },
  };
}

