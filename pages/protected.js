import Head from "next/head";
import Link from "next/link";
import { getSession } from "next-auth/client";

function Protected() {
  return (
    <div>Protected</div>
  );
}

export default Protected;

export async function getServerSideProps(context) {
  const { res } = context;
  const session = await getSession(context);

  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    return res.end();
  }

  return {
    props: { session },
  };
}
