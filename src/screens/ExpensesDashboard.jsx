import React from "react";
import SideNavBar from "../components/SideNavBar";
import { Add, Pageview, Payments } from "@mui/icons-material";
import { Link } from "react-router-dom";
import CategoryWiseExpenses from "../components/CategoryWiseExpenses";

const ExpensesDashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed width) */}
      <div className="w-80 h-screen">
        <SideNavBar />
      </div>

      {/* Main Content (takes remaining space) */}
      <div className="flex-1 w-full h-full flex items-center justify-center">
        <div className="flex p-10 w-full h-full flex-col items-center justify-center gap-4">
          
          {/* Placeholder for Graph */}
          <div className="bg-white p-5 text-center w-full h-auto border-white bg-opacity-5 rounded-3xl text-2xl shadow-md shadow-orange-500"><CategoryWiseExpenses></CategoryWiseExpenses></div>

          {/* Navigation Boxes */}
          <div className="p-5 bg-white w-full bg-opacity-5 h-full gap-4 rounded-3xl flex flex-row justify-between items-center shadow-md shadow-orange-500">
            
            {/* Add Expense */}
            <Link to="/addexpense" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-green-200 transition-all p-4  hover:text-green-500 shadow-sm shadow-white">
                <Add sx={{ color: "green", fontSize: 40 }} />
                <h3 className="text-center">Add an Expense</h3>
              </div>
            </Link>

            {/* View Expenses */}
            <Link to="/viewexpenses" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-orange-200 transition-all p-4 hover:text-orange-600 shadow-sm shadow-white">
                <Pageview sx={{ color: "orange", fontSize: 40 }} />
                <h3 className="text-center">View Expenses</h3>
              </div>
            </Link>

            {/* Plan Budgets */}
            <Link to="/planbudgets" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-purple-200 transition-all p-4  hover:text-purple-800 shadow-sm shadow-white">
                <Payments sx={{ color: "purple", fontSize: 40 }} />
                <h3 className="text-center">Plan Your Budgets</h3>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpensesDashboard;
