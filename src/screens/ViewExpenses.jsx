import React, { useState } from 'react'
import SideNavBar from '../components/SideNavBar'

const ViewExpenses = () => {
{/*This has ben hardcoded now but can be fetched from supabase */}
  
  const [expenses,setExpenses]= useState([
    {
      id:1,
      expense_title:"Office Supplies",
      date:"2025-02-20",
      amount:1500,
      category:"Stationery",
      client_name:"ABC Corp",
      project_id:"P123"

    },
    {
      id: 2,
      expense_title: "Software Subscription",
      date: "2025-02-18",
      amount: 2500,
      category:"Subscription",
      client_name: "XYZ Ltd",
      project_id: "P456"
    },
    {
      id: 3,
      expense_title: "Team Lunch",
      date: "2025-02-15",
      amount: 3000,
      category:"License",
      client_name: "LMN Pvt Ltd",
      project_id: "P789"
    },
    {
      id: 4,
      expense_title: "Documentation",
      date: "2025-02-15",
      amount: 3000,
      category:"Stationery",
      client_name: "L and T Pvt Ltd",
      project_id: "P789"
    }
  ])
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
                  <p className="text-sm text-gray-700">Client: {expense.client_name}</p>
                  <p className="text-sm text-gray-700">Project ID: {expense.project_id}</p>
               
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

