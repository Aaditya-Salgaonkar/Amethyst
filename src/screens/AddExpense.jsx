import React, { useState } from "react";
import SideNavBar from "../components/SideNavBar";
import { motion } from "framer-motion";

const AddExpense = () => {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date:" ",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form has been submitted")
    console.log("Expense Submitted:", formData);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar (fixed width) */}
      <div className="w-80 h-screen">
        <SideNavBar />
      </div>

      {/* Main Content (Form) */}
      <div className="flex-1 w-full h-full flex items-center justify-center p-20">
        <div className="bg-white p-10 rounded-lg shadow-lg shadow-orange-500 bg-opacity-5 w-full h-96">
          <h2 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 font-semibold mb-4 bg text-transparent bg-clip-text">Add Expense</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense Title"
              className="p-2 border rounded-xl hover:border-green-400"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="p-2 border rounded-xl hover:border-green-400"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date of Expense"
              className="p-2 border rounded-xl hover:border-green-400"
            />

            {/* Dropdown for selecting category */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border rounded-xl hover:border-green-400"
            >
              <option value="" disabled>Select Category</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Licencses">Licenses</option>
              <option value="AI">AI tools</option>
              <option value="Stationery">Stationery</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 bg-orange-500 text-white rounded"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
