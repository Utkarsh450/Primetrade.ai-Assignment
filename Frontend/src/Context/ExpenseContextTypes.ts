import { createContext } from "react";
import type { BudgetData, ExpenseData } from "./types";

export interface UserType {
  _id: string;
  username: string;
  email: string;
}

export interface ExpenseContextType {
  data: {
    user: UserType | null;
    isAuthenticated: boolean;
    loading: boolean;
    budgets: BudgetData[];
    expenses: ExpenseData[];
  };

  setData: React.Dispatch<
    React.SetStateAction<{
      user: UserType | null;
      isAuthenticated: boolean;
      loading: boolean;
      budgets: BudgetData[];
      expenses: ExpenseData[];
    }>
  >;
}

export const ExpenseContextData = createContext<ExpenseContextType>({
  data: {
    user: null,
    isAuthenticated: false,
    loading: true,
    budgets: [],
    expenses: [],
  },
  setData: () => {},
});