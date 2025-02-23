import React, { useEffect, useState } from "react";
import SideNavBar from "../components/SideNavBar";
import { supabase } from "../client";

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error fetching user:", authError);
        return;
      }

      const user = data?.user;
      if (!user) {
        console.error("No authenticated user found.");
        return;
      }

      const { data: expensesData, error } = await supabase
        .from("expenses")
        .select(
          "id, expense_title, date, amount, category, project_id, projects(name)"
        )
        .eq("freelancer_id", user.id);

      if (error) {
        console.error("Error fetching expenses:", error);
      } else {
        setExpenses(expensesData || []);
      }
    };

    fetchExpenses();
  }, []);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80">
        <SideNavBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center p-10 overflow-auto">
        <h3 className="text-4xl font-semibold mb-5 tracking-wider text-white">
          Recent Expenses
        </h3>

        <div className="w-full max-w-4xl space-y-4 px-6">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-slate-800 text-white p-5 rounded-lg shadow-md border-l-4 border-orange-500"
              >
                <h3 className="text-2xl font-semibold">
                  {expense.expense_title}
                </h3>
                <p className="text-gray-400">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
                <p className="text-gray-300">{expense.category}</p>
                <p className="text-sm text-gray-500">
                  Project: {expense.projects?.name || "N/A"}
                </p>
                <div className="text-lg font-bold text-green-400">
                  ₹{expense.amount}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No expenses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewExpenses;
