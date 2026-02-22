import { createContext } from "react";
import type { BudgetData, ExpenseData } from "./types";

// Context type
export interface ExpenseContextType {
    data: {
        token: string,
        budgets: BudgetData[];
        expenses: ExpenseData[];
    };
    setData: React.Dispatch<
        React.SetStateAction<{
            token: string,
            budgets: BudgetData[];
            expenses: ExpenseData[];
        }>
    >;
}

export const ExpenseContextData = createContext<ExpenseContextType>({
    data: { token: "", budgets: [], expenses: [] },
    setData: () => {}
});