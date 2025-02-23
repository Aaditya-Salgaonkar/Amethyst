import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../client";


const ProductivityTracker = () => {
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
        .select("p_id, name, due_date, payment_status") // Include payment_status in selection
        .eq("freelancerId", user.id)
        .eq("status", false); // Only fetch projects where status is false

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="flex justify-center items-center gap-4 p-8 bg-white bg-opacity-5 w-screen h-screen">
      {/* Left Sidebar with Projects */}
      <div className="w-1/3 h-full bg-opacity-10 rounded-xl overflow-auto p-5 space-y-4 shadow-sm shadow-orange-500">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project.p_id}
              className="w-full p-4 rounded-md bg-gradient-to-tr from-orange-500 to-red-600 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm opacity-80">
                Due: {new Date(project.due_date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Payment Status:{" "}
                <span className={project.payment_status ? "text-green-400" : "text-red-400"}>
                  {project.payment_status ? "Paid" : "Pending"}
                </span>
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center opacity-50">No pending projects</p>
        )}
      </div>

      {/* Right Section (Can be used for more content later) */}
      <div className="w-full h-full bg-white bg-opacity-10 rounded-xl">
        

      </div>
    </div>
  );
};

export default ProductivityTracker;
