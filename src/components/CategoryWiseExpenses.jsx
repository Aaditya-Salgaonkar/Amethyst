import React, { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { supabase } from '../client'

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#d88484"];

const CategoryWiseExpenses = () => {
    const[chartData,setChartData]=useState([])
    useEffect(()=>{
        const fetchCategoryWiseExpenses= async()=>{
            const { data:{user},error: authError} =await supabase.auth.getUser();
            if(authError)
            {
                console.error("Error whiel accessing db",authError);
                return;
            }
            const{data, error}=await supabase.from("expenses").select("category, amount").eq("freelancer_id",user.id);


       if (error) {
        console.error("Error fetching expenses:", error);
        return;
        }
        const categoryMap = {};
        data.forEach(({ category, amount }) => {
          categoryMap[category] = (categoryMap[category] || 0) + amount;
        });
  
        // Convert to chart data format
        const formattedData = Object.keys(categoryMap).map((category) => ({
          name: category,
          value: categoryMap[category]
        }));
  
        setChartData(formattedData);
      }; fetchCategoryWiseExpenses();
    }            
, []
    )
  return (
    <div >
        <div className="flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-2">Category-wise Expenses</h2>
      {chartData.length > 0 ? (
        <PieChart width={400} height={400}>
          <Pie
            data={chartData}
            cx={200}
            cy={200}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend  />
        </PieChart>
      ) : (
        <h1 className="text-xl text-gray-500">No expense data available.</h1>
      )}
    </div>
      
    </div>
  )
}

export default CategoryWiseExpenses
