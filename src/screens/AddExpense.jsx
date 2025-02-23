import React, { useState, useEffect } from "react";
import SideNavBar from "../components/SideNavBar";
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
    clientName: "",
    projectId: ""
  });

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error fetching user:", authError);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("p_id, name,spent")
        .eq("freelancerId", user.id);

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError) {
      console.error("Error fetching user:", authError);
      return;
    }
    if (!formData.projectId) {
      alert("Please select a project.");
      return;
    }

 // Fetch current spent amount for the selected project
 const { data: projectData, error: projectError } = await supabase
 .from("projects")
 .select("spent")
 .eq("p_id", formData.projectId)
 .single();

if (projectError) {
 console.error("Error fetching project data:", projectError);
 return;
}

const currentSpent = projectData?.spent || 0;
const newSpent = currentSpent + parseFloat(formData.amount);


    const { error } = await supabase.from("expenses").insert([
      {
        expense_title: formData.title,
        amount: formData.amount,
        date: formData.date,
        category: formData.category,
        freelancer_id: user.id,
        project_id: formData.projectId
      }
    ]);

    if (error) {
      console.error("Error submitting expense:", error);
    } else {
       // Update the spent value in the projects table
    const { error: updateError } = await supabase
    .from("projects")
    .update({ spent: newSpent })
    .eq("p_id", formData.projectId);

  if (updateError) {
    console.error("Error updating spent amount:", updateError);
    return;
  }
      alert("Expense added successfully!");
      setFormData({
        title: "",
        amount: "",
        date: "",
        category: "",
        clientName: "",
        projectId: ""
      });
      navigate(-1);
    }
  };

  return (
    <div className="flex h-screen">
      

      <div className="flex-1 h-full flex items-center justify-center p-20">
        <div className="bg-white p-10 rounded-lg shadow-lg shadow-orange-500 bg-opacity-5 w-1/3 h-auto">
          <h2 className="text-xl bg-gradient-to-r from-orange-500 to-red-800 font-semibold mb-4 text-transparent bg-clip-text">Add Expense</h2>
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
              className="p-2 border rounded-xl hover:border-green-400"
            />
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              placeholder="Client Name"
              className="p-2 border rounded-xl hover:border-green-400"
            />

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="p-2 border rounded-xl hover:border-green-400"
            >
              <option value="" disabled>Select Category</option>
              <option value="Subscriptions">Subscriptions</option>
              <option value="Licenses">Licenses</option>
              <option value="AI">AI tools</option>
              <option value="Stationery">Stationery</option>
              <option value="Travel">Travel</option>
              <option value="Other">Other</option>
            </select>

            <select
              name="projectId"
              value={formData.projectId}
              onChange={handleChange}
              className="p-2 border rounded-xl hover:border-green-400"
            >
              <option value="" disabled>Select Project</option>
              {projects.map((project) => (
                <option key={project.p_id} value={project.p_id}>{project.name}</option>
              ))}
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