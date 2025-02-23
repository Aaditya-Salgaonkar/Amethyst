import React, { useEffect, useState } from 'react'
import SideNavBar from '../components/SideNavBar'
import { supabase } from '../client'


const ViewExpenses = () => {

  
  const [expenses,setExpenses]= useState([])
  useEffect( ()=>{
    const fetchExpenses= async()=>{
      const {data :{user},error : authError} =await supabase.auth.getUser()
      if(authError){
        console.error("Error fetching user:", authError);
        return;
      }
      const{data,error}=await supabase.from("expenses").
      select("id, expense_title, date, amount, category, project_id, projects(name)")
      .eq("freelancer_id", user.id)
      
      if (error) {
        console.error("Error fetching expenses:", error);
      } 
      else{
        setExpenses(data)
      }
    };
    fetchExpenses();
  }

  ,[]);
  return (
    <>
    <div className=" flex  h-screen">
        <div className='w-80 '>
            <SideNavBar />

        </div>
        <div className="flex-1 w-full h-full flex flex-col items-center   p-20 overflow-auto">
          <h3 className='text-4xl font-semibold mb-5 tracking-wider'>Recent Expenses</h3>
          <div className='w-full space-y-4 px-40'>
            {
              expenses.length > 0 ? (
                expenses.map((expense)=>(
                  <div  key={expense.id} className="flex flex-col justify-between text-2xl bg-slate-400 bg-opacity-5 text-white p-5 w-auto shadow-lg shadow-orange-600">
                  
                  <h3 className="text-2xl font-semibold">{expense.expense_title}</h3>
                  <p className="text-gray-500 text-xl">{new Date(expense.date).toLocaleDateString()}</p>
                  <p className='text-gray-500 text-base'>{expense.category}</p>
                  <p className="text-sm text-gray-700">Project: {expense.projects?.name || "N/A"}</p>

               
                  <div className="text-lg font-bold text-green-600">₹{expense.amount}</div>
                 
                 
                </div>

                  

                ))

              ) : (<p className="text-gray-500">No expenses found.</p>)
            }
          </div>

          
            

        </div>
        


    </div>
    </>
  )
}

export default ViewExpenses

