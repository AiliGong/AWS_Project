import axios from "axios";
import React from "react";
import { getSession } from "next-auth/client";
import { Typography } from "@material-ui/core";
import Skeleton from "@material-ui/lab/Skeleton";
import CashFlow from "../src/components/home/cashFlow";
import CurrencyInfo from "../src/components/home/CurrencyInfo";

export default function Home({ session }) {
  const [transactions, setTransactions] = React.useState(null);
  const [contacts, setContacts] = React.useState([]);
  const getTransactions = async () => {
    axios
      .get(`/api/transactions`)
      .then((res) => {
        setTransactions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getContacts = async () => {
    axios
      .get(`/api/contacts`)
      .then((res) => {
        setContacts(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    getContacts();
    getTransactions();
  }, []);

  return (
    <div>
      <div>
        <Typography variant="h3">Hi, {session.user.username}</Typography>
      </div>

      {transactions ? (
        <CashFlow transactions={transactions} contacts={contacts} />
      ) : (
        <div>
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="rect" height={250} />
        </div>
      )}

      <CurrencyInfo />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context);
  return {
    props: { session },
  };
}
