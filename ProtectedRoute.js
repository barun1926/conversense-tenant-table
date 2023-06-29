import React from "react";
import { Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isLoggedIn = sessionStorage.getItem("responseData");
  const userId = isLoggedIn ? JSON.parse(isLoggedIn).userId : null;
  console.log('userId',userId)
  if (!userId) {
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Element />} />;
};

export default ProtectedRoute;
