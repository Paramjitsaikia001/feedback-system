import React from 'react'
import DashboardNavber from '../../utils/dashboard-navber'
import Left_Navbar from '../../utils/left-navber'
const feedbackAnalytics = () => {
  return (
    <section className='w-full h-[100%] flex flex-col items-center justify-center'>
      <DashboardNavber />
      <div className="maincontent flex  w-full h--[100%]">
        <Left_Navbar />
        <div className='w-[80%]'>
          <h1 className=' text-2xl border-b-1 border-[#8b8b8b] py-4 px-4 '>Feedback analysis</h1>
          <div className="overallstatics h-[40%] flex mt-5">
            <div className="pieChart border-1 border-[#8b8b8b] m-4 rounded-2xl w-1/2 shadow-md"></div>
            <div className="barChart border-1 border-[#8b8b8b] m-4 rounded-2xl w-1/2 shadow-md"></div>
          </div>
          <div className="barChart border-1 border-[#8b8b8b] m-4 rounded-2xl w-auto h-full shadow-md"></div>

        </div>
      </div>
    </section>
  )
}

export default feedbackAnalytics