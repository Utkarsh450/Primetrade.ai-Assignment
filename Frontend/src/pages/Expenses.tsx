import { useContext, useMemo, useState } from "react";
import { ExpenseContextData } from "../Context/ExpenseContextTypes";
import type { ExpenseData, BudgetData } from "../Context/types";

const Expenses = () => {
  const { data, setData } = useContext(ExpenseContextData);
  const [query, setquery] = useState<string>("");
  const [priceRange, setpriceRange] = useState<[number, number] | null>(null);
  const [isOpen, setisOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("all");

  const category = [
    ...new Set(data.budgets.map((elem: BudgetData) => elem.category)),
  ];

  const budgetAmount = data.expenses.map((elem: ExpenseData) => elem.amount);
  const maxBudget = budgetAmount.length > 0 ? Math.max(...budgetAmount) : 0;

  const deleteHandler = (ExpenseId: string) => {
    const expenseToDelete = data.expenses.find(
      (e: ExpenseData) => e.id === ExpenseId
    );
    if (!expenseToDelete) return;

    const updatedExpenses = data.expenses.filter(
      (e: ExpenseData) => e.id !== ExpenseId
    );

    const updatedBudgets = data.budgets.map((b: BudgetData) => {
      if (b.id === expenseToDelete.budgetId) {
        return {
          ...b,
          spent: b.spent - expenseToDelete.amount,
          ExpenseItems: b.ExpenseItems - 1,
        };
      }
      return b;
    });

    setData((prev) => ({
      ...prev,
      expenses: updatedExpenses,
      budgets: updatedBudgets,
    }));
  };

  const filterByMonth = useMemo(() => {
    return (items: ExpenseData[]) => {
      if (selectedMonth === "all") return items;
      return items.filter(
        (elem) => elem.month === selectedMonth.toLowerCase()
      );
    };
  }, [selectedMonth]);

  const filteredExpenses: ExpenseData[] = useMemo(() => {
    const monthFiltered = filterByMonth(data.expenses);

    return monthFiltered.filter((elem) => {
      const matchesSearch =
        elem.name.toLowerCase().includes(query.toLowerCase()) ||
        elem.amount.toString().includes(query);

      const matchesCategory = selectedCategory
        ? elem.category === selectedCategory
        : true;

      const matchesPrice = priceRange
        ? elem.amount >= priceRange[0] &&
          elem.amount <= priceRange[1]
        : true;

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [query, selectedCategory, priceRange, data.expenses, filterByMonth]);

  return (
    <div className="w-full min-h-screen bg-zinc-50 p-4 sm:p-8">

      <p className="font-semibold text-2xl sm:text-3xl mb-6">
        Latest Expenses
      </p>

      {/* Filters Section */}
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center mb-6 relative">

        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="outline-none bg-white border rounded-lg h-10 px-4 font-semibold"
        >
          <option value="all">All</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>

        <button
          onClick={() => setisOpen(!isOpen)}
          className="bg-zinc-200 hover:bg-zinc-300 rounded-lg px-4 h-10 font-semibold"
        >
          Filter
        </button>

        <input
          value={query}
          onChange={(e) => setquery(e.target.value)}
          className="w-full sm:flex-1 outline-none bg-white border rounded-lg h-10 px-4"
          type="text"
          placeholder="Search your Expenses..."
        />

        {/* Filter Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 w-full sm:w-96 bg-white shadow-lg rounded-lg p-4 z-20">

            <div className="flex flex-wrap gap-2 mb-4">
              {[
                { label: "₹10 - ₹50", range: [10, 50] },
                { label: "₹60 - ₹140", range: [60, 140] },
                { label: "₹150 - ₹200", range: [150, 200] },
                { label: "₹300+", range: [300, maxBudget] },
              ].map((item) => (
                <div
                  key={item.label}
                  onClick={() =>
                    setpriceRange(item.range as [number, number])
                  }
                  className={`cursor-pointer px-3 py-1 text-sm rounded-full font-semibold border ${
                    priceRange?.[0] === item.range[0]
                      ? "bg-blue-500 text-white"
                      : "bg-zinc-100"
                  }`}
                >
                  {item.label}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-2">
              {category.map((cat) => (
                <div
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`cursor-pointer px-3 py-1 text-sm rounded-full font-semibold border ${
                    selectedCategory === cat
                      ? "bg-green-500 text-white"
                      : "bg-zinc-100"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block bg-white rounded-lg shadow">
        <div className="grid grid-cols-5 bg-zinc-200 p-3 font-semibold">
          <p>Name</p>
          <p>Amount</p>
          <p>Category</p>
          <p>Month</p>
          <p>Action</p>
        </div>

        {filteredExpenses.map((elem) => (
          <div
            key={elem.id}
            className="grid grid-cols-5 p-3 border-t"
          >
            <p>{elem.name}</p>
            <p>₹{elem.amount}</p>
            <p>{elem.category}</p>
            <p>{elem.month}</p>
            <button
              onClick={() => deleteHandler(elem.id)}
              className="text-red-500 font-semibold"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden flex flex-col gap-4">
        {filteredExpenses.map((elem) => (
          <div
            key={elem.id}
            className="bg-white rounded-lg shadow p-4"
          >
            <div className="flex justify-between">
              <p className="font-semibold">{elem.name}</p>
              <p className="font-semibold">₹{elem.amount}</p>
            </div>
            <p className="text-sm text-zinc-500">
              {elem.category} • {elem.month}
            </p>
            <button
              onClick={() => deleteHandler(elem.id)}
              className="text-red-500 font-semibold mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Expenses;