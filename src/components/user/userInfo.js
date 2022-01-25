import Button from "@material-ui/core/Button";
import { signOut } from "next-auth/client";

export default function UserInfo({ session }) {
  return (
    <>
      <p>User Name: {session.user.username}</p>
      <div>
        <p>Email: {session.user.email}</p>
      </div>
      <p>Contact number: {session.user.phone_number}</p>
      <br />
      <Button
        variant="contained"
        onClick={() => {
          signOut("cognito", {
            callbackUrl: `${window.location.origin}`,
          });
        }}
      >
        Log Out
      </Button>
    </>
  );
}
