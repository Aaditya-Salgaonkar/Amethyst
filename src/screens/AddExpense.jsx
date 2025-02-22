import React, { useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../client";
import { useNavigate } from "react-router-dom";
const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  const { title, amount, date, category } = formData;

  if (!title || !amount || !date || !category) {
    alert("Please fill in all fields");
    return;
  }

  const { data, error } = await supabase
    .from("expenses") // Table name
    .insert([
      {
        expense_title: title,
        amount: parseFloat(amount),
        date: date,
        category: category,
        created_at: new Date().toISOString(), // Automatically set timestamp
      },
    ]);

  if (error) {
    console.error("Error inserting expense:", error);
    alert("Failed to add expense");
  } else {
    alert("Expense added successfully!");
    console.log("Expense inserted:", data);
    setFormData({ title: "", amount: "", date: "", category: "" }); // Reset form
    navigate(-1)
  }
};


  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white p-10 rounded-lg shadow-lg shadow-orange-500 bg-opacity-5 h-[80%] w-[60%]  flex justify-center items-center"
      >
        <div className="h-[100%] w-[90%]">
          <h2 className="mt-8 mb-8 ml-4 text-2xl bg-gradient-to-r from-orange-500 to-red-800 font-semibold text-transparent bg-clip-text">
            Add Expense
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Expense Title"
              className="pl-5 border rounded-2xl hover:border-orange-400 h-14"
            />
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Amount"
              className="pl-5 border rounded-2xl hover:border-orange-400 h-14"
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="Date of Expense"
              className="pl-5 border rounded-2xl hover:border-orange-400 h-14"
            />
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="pl-5 border rounded-2xl hover:border-orange-400 h-14"
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Licencses">Licenses</option>
              <option value="AI">AI tools</option>
              <option value="Stationery">Stationery</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 font-bold bg-orange-500 text-white rounded-xl"
            >
              Submit
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default AddExpense;
