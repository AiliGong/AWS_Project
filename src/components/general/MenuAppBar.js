import React from "react";
import { signIn, signOut, useSession } from "next-auth/client";
import clsx from "clsx";
// Material UI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
// Icons
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import AdjustIcon from "@material-ui/icons/Adjust";
import DescriptionIcon from "@material-ui/icons/Description";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import SettingsIcon from "@material-ui/icons/Settings";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function MenuAppBar() {
  const classes = useStyles();
  const [session, loading] = useSession();
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="secondary"
            aria-label="menu"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Grid container justify="space-between" alignItems="center" direction="row">
            <Typography variant="h6" className={classes.title}>
              Kaikei Accounting System
            </Typography>
            <Button
              variant="outlined"
              onClick={handleClick}
            >
              ADD
            </Button>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <ListItemLink href="/add/new_income">
                <ListItemText primary="New Income" />
              </ListItemLink>
              <ListItemLink href="/add/new_expense">
                <ListItemText primary="New Expense" />
              </ListItemLink>
              <ListItemLink href="/add/new_bill">
                <ListItemText primary="New Bill" />
              </ListItemLink>
            </Menu>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItemLink href="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText secondary="Home" />
          </ListItemLink>

          <ListItemLink href="/income">
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText secondary="Income" />
          </ListItemLink>

          <ListItemLink href="/expense">
            <ListItemIcon>
              <MonetizationOnIcon />
            </ListItemIcon>
            <ListItemText secondary="Expense" />
          </ListItemLink>

          <ListItemLink href="/bills">
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText secondary="Bills" />
          </ListItemLink>

          <ListItemLink href="/settings">
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText secondary="Setting" />
          </ListItemLink>
        </List>
        <Divider />
        <List>
          {session && (
            <ListItem
              button
              onClick={() => {
                signOut("cognito", {
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText secondary="Logout" />
            </ListItem>
          )}
          {!session && !loading && (
            <ListItem
              button
              onClick={() => {
                signIn({
                  callbackUrl: `${window.location.origin}`,
                });
              }}
            >
              <ListItemIcon>
                <AdjustIcon />
              </ListItemIcon>
              <ListItemText secondary="Login" />
            </ListItem>
          )}
        </List>
      </Drawer>
    </div>
  );
}
