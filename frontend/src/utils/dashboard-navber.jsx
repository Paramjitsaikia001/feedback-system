
import React from "react";
import { MessageSquare } from 'lucide-react'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const DashboardNavber = () => {
  const [fullname, setFullname] = useState("")

  useEffect(()=>{
    const fetchData = async()=>{
      try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`,
                    { withCredentials: true }
                );
                setFullname(res.data.message.fullname);
            } catch (error) {
                console.log("error in fetching data", error)
            }
    };
    fetchData()
  },[])

  return (

    <nav
      className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 w-full h-14 py-2 flex justify-between items-center px-8"
    >
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
          <MessageSquare className="w-5 h-5 text-white" />
        </div>
        <span className="text-xl font-bold text-slate-800">EduFeedback</span>
      </div>
      <div className="hidden md:flex items-center space-x-2">
        <h3 className="userName font-semibold">{fullname}</h3>
        <div className="role bg-green-600 rounded-full w-10 h-10">

        </div>
      </div>

    </nav>
  )
}

export default DashboardNavber;