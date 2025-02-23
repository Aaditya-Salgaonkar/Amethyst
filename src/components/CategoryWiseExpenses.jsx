import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { supabase } from "../../src/client";
import { ThemeProvider, createTheme, Box, Typography } from "@mui/material";
import { theme } from "../../src/components/Theme";
import { Margin } from "@mui/icons-material";
// Dark Mode Theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212",
      paper: "#1E1E1E",
    },
    text: {
      primary: "#ffffff",
      secondary: "#b0b0b0",
    },
  },
});

const COLORS = ["#F72585",  "#7209B7", "#560BAD", "#480CA8","#B5179E"];



const CategoryWiseExpenses = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchCategoryWiseExpenses = async () => {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        console.error("Error while accessing db", authError);
        return;
      }

      const { data, error } = await supabase
        .from("expenses")
        .select("category, amount")
        .eq("freelancer_id", user.id);

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
        value: categoryMap[category],
      }));

      setChartData(formattedData);
    };

    fetchCategoryWiseExpenses();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          px: 5,
          m:2,
          pt:2
        }}
      >
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Expenses
        </Typography>
        {chartData.length > 0 ? (
          <PieChart width={500} height={500}>
            <Pie
              data={chartData}
              cx={250}
              cy={250}
              outerRadius={150}
              dataKey="value"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
         
            <Legend />
           
          </PieChart>
        ) : (
          <Typography variant="h6" color="text.secondary">
            No expense data available.
          </Typography>
        )}
      </Box>
    </ThemeProvider>
  );
};

export default CategoryWiseExpenses;
