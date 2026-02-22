export type BudgetData = {
  _id: string;
  category: string;
  month: string;
  amount: number;
  spent: number;
  emoji: string;
  ExpenseItems: number;
  createdAt: string | Date;
};

export interface ExpenseData {
    _id: string;
    name: string;
    category: string;
    budgetId: string;
    amount: number;
    description: string;
    createdAt: Date;
    month: string;
}