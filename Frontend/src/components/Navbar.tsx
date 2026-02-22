import { NavLink, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { ExpenseContextData } from "../Context/ExpenseContextTypes";
import axios from "../utils/axiosConfig"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {setData} = useContext(ExpenseContextData);
  const navigate = useNavigate();
  const handleLogout = async()=>{
  await axios.get("/auth/logout");

setData(prev => ({
  ...prev,
  user: null,
  isAuthenticated: false,
  
}));
navigate("/login");
  }
  return (
    <nav className="w-full bg-white shadow-md px-6 sm:px-8 py-4 relative">
      
      <div className="flex items-center justify-between">
        
        <div className="font-medium text-xl sm:text-2xl text-sky-500 tracking-tight">
          ExpensesDiary
        </div>

        <div className="hidden md:flex items-center gap-10">
          <NavLink
            className={({ isActive }) =>
              `font-semibold text-lg transition ${
                isActive
                  ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                  : "text-zinc-600 hover:text-sky-600"
              }`
            }
            to="/"
          >
            Dashboard
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `font-semibold text-lg transition ${
                isActive
                  ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                  : "text-zinc-600 hover:text-sky-600"
              }`
            }
            to="/budgets"
          >
            Budgets
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `font-semibold text-lg transition ${
                isActive
                  ? "text-sky-600 border-b-2 border-sky-600 pb-1"
                  : "text-zinc-600 hover:text-sky-600"
              }`
            }
            to="/expenses"
          >
            Expenses
          </NavLink>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <div onClick={handleLogout} className="w-fit h-fit p-2 text-zinc-50 rounded-full cursor-pointer hover:bg-red-600 bg-red-500">Logout</div>
        </div>

        <button
          className="md:hidden text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col gap-4 bg-white border-t pt-4">
          <NavLink
            onClick={() => setIsOpen(false)}
            className="font-semibold text-lg text-zinc-600 hover:text-sky-600"
            to="/dashboard"
          >
            Dashboard
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(false)}
            className="font-semibold text-lg text-zinc-600 hover:text-sky-600"
            to="/budgets"
          >
            Budgets
          </NavLink>

          <NavLink
            onClick={() => setIsOpen(false)}
            className="font-semibold text-lg text-zinc-600 hover:text-sky-600"
            to="/expenses"
          >
            Expenses
          </NavLink>

          <div className="flex items-center gap-3 pt-2 border-t">
            <div className="w-8 h-8 rounded-full bg-red-500"></div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;