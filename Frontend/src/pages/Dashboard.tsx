import { useContext, useState } from "react";
import { ExpenseContextData } from "../Context/ExpenseContextTypes";
import type { BudgetData, ExpenseData } from "../Context/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Pie from "../components/Pie";

const Dashboard: React.FC = () => {
  const { data } = useContext(ExpenseContextData);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");

  const filterByMonth = (items: ExpenseData[] | BudgetData[]) => {
    if (selectedMonth === "all") return items;
    return items.filter(
      (elem) =>
        elem.month?.toLowerCase() === selectedMonth.toLowerCase()
    );
  };

  const filteredBudgets = filterByMonth(data.budgets) as BudgetData[];
  const filteredExpenses = filterByMonth(data.expenses) as ExpenseData[];

  const TotalBudget = filteredBudgets.reduce(
    (acc, b) => acc + b.amount,
    0
  );
  const TotalExpense = filteredExpenses.reduce(
    (acc, e) => acc + e.amount,
    0
  );

  const labels = [...new Set(data.budgets.map((b) => b.month))];

  const chartData = labels.map((month) => {
    const totalBudget = filteredBudgets
      .filter((b) => b.month === month)
      .reduce((sum, b) => sum + b.amount, 0);

    const totalExpense = filteredExpenses
      .filter((e) => e.month === month?.toLowerCase())
      .reduce((sum, e) => sum + e.amount, 0);

    return { month, budget: totalBudget, expense: totalExpense };
  });

  const sortedData = filteredExpenses
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )
    .slice(0, 6);

  const growthRate =
    TotalBudget > 0
      ? ((TotalBudget - TotalExpense) / TotalBudget) * 100
      : 0;

  return (
    <div className="w-full min-h-screen bg-zinc-50 p-4 sm:p-8 flex flex-col gap-6">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold">
            Welcome back, User!
          </h1>
          <p className="text-sm text-gray-500">
            It is the best time to manage your finances
          </p>
        </div>

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border p-2 rounded-lg outline-none text-sm w-full sm:w-auto"
        >
          <option value="all">All Time</option>
          {[
            "January","February","March","April","May","June",
            "July","August","September","October","November","December",
          ].map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: "Total Budget",
            amount: `₹${TotalBudget}`,
            change: "+12.1%",
            positive: true,
          },
          {
            title: "Expense",
            amount: `₹${TotalExpense}`,
            change: "-2.4%",
            positive: false,
          },
          {
            title: "Savings",
            amount: `₹${TotalBudget - TotalExpense}`,
            change: "+5.2%",
            positive: true,
          },
          {
            title: "Growth Rate",
            amount: `${growthRate.toFixed(2)}%`,
            change: "+2%",
            positive: true,
          },
        ].map((item, i) => (
          <div
            key={i}
            className="p-4 bg-white rounded-2xl shadow-sm"
          >
            <h3 className="text-sm text-gray-500">
              {item.title}
            </h3>
            <h2 className="text-xl sm:text-2xl font-semibold">
              {item.amount}
            </h2>
            <p
              className={`text-xs ${
                item.positive
                  ? "text-green-500"
                  : "text-red-500"
              }`}
            >
              {item.change}
            </p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Bar Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-semibold mb-4">
            Expense vs Budget
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="budget"
                fill="#4682B4"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                fill="#E0B0FF"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-white rounded-2xl p-4 shadow-sm flex flex-col items-center">
          <h3 className="font-semibold mb-4">
            Category Breakdown
          </h3>
          <div className="w-full h-64 flex items-center justify-center">
            <Pie filteredExpenses={filteredExpenses} />
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <h3 className="font-semibold mb-4">
          Recent Transactions
        </h3>

        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-4 font-semibold text-purple-600 bg-purple-100 p-3 rounded-lg">
            <p>Name</p>
            <p>Amount</p>
            <p>Category</p>
            <p>Date</p>
          </div>

          {sortedData.map((elem) => (
            <div
              key={elem.id}
              className="grid grid-cols-4 p-3 border-b"
            >
              <p>{elem.name}</p>
              <p>₹{elem.amount}</p>
              <p>{elem.category}</p>
              <p>
                {new Date(
                  elem.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-4">
          {sortedData.map((elem) => (
            <div
              key={elem.id}
              className="border rounded-lg p-3"
            >
              <div className="flex justify-between font-semibold">
                <span>{elem.name}</span>
                <span>₹{elem.amount}</span>
              </div>
              <p className="text-sm text-gray-500">
                {elem.category}
              </p>
              <p className="text-xs text-gray-400">
                {new Date(
                  elem.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;