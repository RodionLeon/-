import { Navigate } from "react-router-dom";
import { useUserContext } from "./userContext";

export const ProtectedRoute = ({ child }) => {
  const { user: { email },} = useUserContext();
  if (!email) {return <Navigate to="/login" />;}
  return child;
};
