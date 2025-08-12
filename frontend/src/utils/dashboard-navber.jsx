
import React from "react";
import {MessageSquare} from 'lucide-react'
const DashboardNavber = ()=>{
return(
    <nav
    className="bg-white/95 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-50 w-full h-14 py-2 flex justify-between items-center px-8"
  >
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-slate-800">EduFeedback</span>
        </div>
        <div className="hidden md:flex items-center space-x-8">
         <h3 className="userName">Paramjit Saikia</h3>
         <div className="role bg-green-600 rounded-full w-10 h-10">

         </div>
        </div>

  </nav>
)
}

export default DashboardNavber;