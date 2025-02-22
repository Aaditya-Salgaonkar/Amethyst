import React from "react";
import SideNavBar from "../components/SideNavBar";
import { Add, Pageview, Payments } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Rent", value: 400 },
  { name: "Groceries", value: 300 },
  { name: "Entertainment", value: 200 },
  { name: "Utilities", value: 100 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ExpensesDashboard = () => {
  return (
    <div className="flex h-screen">
      <div className="w-80 h-screen">
        <SideNavBar />
      </div>

      <div className="flex-1 w-full h-full flex items-center justify-center">
        <div className="flex p-10 w-full h-full flex-col items-center justify-center gap-4">
          <div className="bg-white  text-center w-full h-full border-white bg-opacity-5 rounded-3xl text-2xl flex items-center justify-center">
            <PieChart width={400} height={400}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          <div className="p-5 bg-white w-full bg-opacity-5 h-full gap-4 rounded-3xl flex flex-row justify-between items-center">
            <Link to="/addexpense" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-green-200 transition-all p-4  hover:text-green-500">
                <Add sx={{ color: "green", fontSize: 40 }} />
                <h3 className="text-center">Add an Expense</h3>
              </div>
            </Link>

            <Link to="/viewexpenses" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-orange-200 transition-all p-4 hover:text-orange-600">
                <Pageview sx={{ color: "orange", fontSize: 40 }} />
                <h3 className="text-center">View Expenses</h3>
              </div>
            </Link>

            <Link to="/planbudgets" className="h-full w-1/3">
              <div className="bg-white bg-opacity-5 w-full h-full rounded-3xl flex justify-center gap-4 items-center text-xl cursor-pointer hover:bg-purple-200 transition-all p-4  hover:text-purple-800">
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
