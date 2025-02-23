import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "../client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import HomeNavbar from "../components/HomeNavbar";
const ProductivityTracker = ({token}) => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [timerActive, setTimerActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerStart, setTimerStart] = useState(null);
  const [selectedSubtask, setSelectedSubtask] = useState("");
 const [freelancerName, setFreelancerName] = useState(null);

    useEffect(() => {
      const fetchFreelancerName = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        console.log(user)
        if (user) {
          setFreelancerName(user.email || "Freelancer");
        }
      };
      fetchFreelancerName();
    }, []);
  useEffect(() => {
    const fetchProjects = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError) {
        console.error("Error fetching user:", authError);
        return;
      }

      const { data, error } = await supabase
        .from("projects")
        .select("p_id, name, due_date, payment_status, subtasks")
        .eq("freelancerId", user.id)
        .eq("status", false);

      if (error) {
        console.error("Error fetching projects:", error);
      } else {
        setProjects(data);
      }
    };

    fetchProjects();
  }, []);

  // Timer Functionality
  useEffect(() => {
    let timerInterval;
    if (timerActive) {
      timerInterval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - timerStart) / 1000));
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }
    return () => clearInterval(timerInterval);
  }, [timerActive, timerStart]);

  const handleTimerToggle = () => {
    if (timerActive) {
      setTimerActive(false);
    } else {
      setTimerStart(Date.now());
      setElapsedTime(0);
      setTimerActive(true);
    }
  };

  const handleSubmitTime = async () => {
    if (!selectedProject || !selectedSubtask) {
      alert("Please select a subtask before submitting time.");
      return;
    }

    const updatedSubtasks = selectedProject.subtasks.map((task) => {
      if (task.name === selectedSubtask) {
        return {
          ...task,
          status: (task.status || 0) + elapsedTime / 3600, // Convert seconds to hours
        };
      }
      return task;
    });

    const { error } = await supabase
      .from("projects")
      .update({ subtasks: updatedSubtasks })
      .eq("p_id", selectedProject.p_id);

    if (error) {
      console.error("Error updating time:", error);
    } else {
      alert("Time successfully logged!");
      setSelectedProject((prev) => ({
        ...prev,
        subtasks: updatedSubtasks,
      }));
      setElapsedTime(0);
      setTimerActive(false);
    }
  };

  return (
    <div>
        <HomeNavbar token={token} freelancerName={freelancerName} />
    <div className="flex justify-center items-center gap-4 p-8 bg-white bg-opacity-5 w-screen h-screen mt-20">
       
      {/* Left Sidebar with Projects */}
      <div className="w-1/3 h-full bg-opacity-10 rounded-xl overflow-auto p-5 space-y-4 shadow-sm shadow-orange-500">
        {projects.length > 0 ? (
          projects.map((project) => (
            <motion.div
              key={project.p_id}
              className={`w-full p-4 rounded-md bg-gradient-to-tr from-orange-500 to-red-300 text-white cursor-pointer ${
                selectedProject?.p_id === project.p_id
                  ? "border-2 border-white"
                  : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => {
                setSelectedProject({
                  ...project,
                  subtasks:
                    typeof project.subtasks === "string"
                      ? JSON.parse(project.subtasks)
                      : Array.isArray(project.subtasks)
                        ? project.subtasks
                        : [],
                });
                setSelectedSubtask("");
                setElapsedTime(0);
                setTimerActive(false);
              }}
            >
              <h2 className="text-lg font-semibold">{project.name}</h2>
              <p className="text-sm opacity-80">
                Due: {new Date(project.due_date).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Payment Status:{" "}
                <span
                  className={
                    project.payment_status ? "text-green-700 font-bold" : "text-red-700 font-bold"
                  }
                >
                  {project.payment_status ? "Paid" : "Pending"}
                </span>
              </p>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-center opacity-50">
            No pending projects
          </p>
        )}
      </div>

      {/* Right Section - Subtasks Display */}
      <div className="w-full h-full rounded-xl p-6 flex flex-col justify-between border border-orange-500">
  {selectedProject ? (
    <div className="text-white flex-grow">
      <h2 className="text-2xl font-semibold mb-4 bg-gradient-to-tr from-orange-500 to-red-800 text-transparent bg-clip-text">
        {selectedProject.name} - Time Spent
      </h2>
      {Array.isArray(selectedProject?.subtasks) && selectedProject.subtasks.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={selectedProject.subtasks}>
            <XAxis dataKey="name" stroke="#ffffff" />
            <YAxis stroke="#ffffff" />
            <Tooltip />
            <Bar dataKey="status" fill="#ff7300" name="Hours Worked" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="opacity-60">No subtasks available</p>
      )}
    </div>
  ) : (
    <p className="text-white opacity-50 text-center flex-grow">
      Select a project to view subtasks
    </p>
  )}

        {/* Bottom Div with Timer & Subtask Selection */}
        <div className="flex justify-evenly items-center bg-gray-900 bg-opacity-50 border-orange-500 border rounded-md p-2">
          {/* Timer Section */}
          <div className="bg-gray-800 bg-opacity-75 p-4 rounded-md text-white mt-2 flex flex-col items-center shadow-md shadow-orange-500">
            <h3 className="text-lg font-semibold text-orange-400">
              Task Timer
            </h3>
            <p className="text-2xl font-bold mt-2 text-orange-300">
              {Math.floor(elapsedTime / 60)}m {elapsedTime % 60}s
            </p>
            <button
              className={`mt-3 px-6 py-2 rounded-md font-semibold transition-all ${
                timerActive
                  ? "bg-red-600 hover:bg-red-700 text-white"
                  : "bg-orange-500 hover:bg-orange-600 text-white"
              }`}
              onClick={handleTimerToggle}
            >
              {timerActive ? "Stop Timer" : "Start Timer"}
            </button>
          </div>

          {/* Subtask Selection & Submit Button */}
          <div className="bg-gray-800 w-3/4 h-auto mt-2 rounded-md p-4 mb-2 shadow-md shadow-orange-500">
            <h1 className="text-orange-300 text-xl mb-2">Select a Subtask</h1>
            <select
              className="w-full p-2 bg-gray-700 text-white border border-orange-500 rounded-md focus:ring-2 focus:ring-orange-400"
              onChange={(e) => setSelectedSubtask(e.target.value)}
              value={selectedSubtask}
            >
              <option value="">-- Choose a subtask --</option>
              {selectedProject?.subtasks?.map((task, index) => (
                <option
                  key={index}
                  value={task.name}
                  className="bg-gray-800 text-white"
                >
                  {task.name}
                </option>
              ))}
            </select>
            <button
              className="mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md w-full transition-all"
              onClick={handleSubmitTime}
            >
              Submit Time
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductivityTracker;