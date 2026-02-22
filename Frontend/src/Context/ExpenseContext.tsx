import { useState, type ReactNode, useEffect } from "react";
import type { BudgetData, ExpenseData } from "./types";
import { ExpenseContextData } from "./ExpenseContextTypes";
import type { UserType } from "./ExpenseContextTypes";
import axios from "../utils/axiosConfig";

type ContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  loading: boolean;
  budgets: BudgetData[];
  expenses: ExpenseData[];
};

const ExpenseContext = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<ContextType>({
    user: null,
    isAuthenticated: false,
    loading: true,
    budgets: [],
    expenses: [],
  });

  useEffect(() => {
    const initializeApp = async () => {
      try {
        // 1️⃣ Check auth
        const userRes = await axios.get("/auth/me");

        // 2️⃣ Fetch budgets
        const budgetsRes = await axios.get("/budgets");

        // 3️⃣ Fetch expenses
        const expensesRes = await axios.get("/expenses");

        setData({
          user: userRes.data.user,
          isAuthenticated: true,
          loading: false,
          budgets: budgetsRes.data,
          expenses: expensesRes.data,
        });

      } catch (err: any) {
        setData({
          user: null,
          isAuthenticated: false,
          loading: false,
          budgets: [],
          expenses: [],
        });
      }
    };

    initializeApp();
  }, []);

  return (
    <ExpenseContextData.Provider value={{ data, setData }}>
      {children}
    </ExpenseContextData.Provider>
  );
};



export default ExpenseContext;