import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute(props) {
  const {children, ...rest} = props;
  return (
    <Route>
      {() =>
        props.loggedIn ? (
          <>{React.cloneElement(children, { ...rest })}</>
        ) : (
          <Redirect to="./sign-in" />
        )
      }
    </Route>
  );
};

export default ProtectedRoute;
