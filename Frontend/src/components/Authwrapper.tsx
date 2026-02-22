import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ExpenseContextData } from "../Context/ExpenseContextTypes";

interface Props {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<Props> = ({ children }) => {
  const { data } = useContext(ExpenseContextData)!;

  // If no token → redirect to login
  if (!data.token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default AuthWrapper;