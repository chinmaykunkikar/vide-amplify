import React from "react";
import { Auth } from "aws-amplify";
import { Button } from "@material-ui/core";

async function logOut() {
  await Auth.signOut()
    .then(window.location.reload())
    .catch((error) => console.log(error));
}

const Logout = ({ ...rest }) => {
  return (
    <>
      <Button onClick={logOut} {...rest}>
        Logout
      </Button>
    </>
  );
};

export default Logout;
