import React from 'react'
import { useNavigate } from 'react-router-dom'

const leftNavbar = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();
    return (
        <section className='min-h-screen border-r-1 border-[#8b8b8b] flex flex-col items-center justify-start gap-4 w-[20%] py-8'>
            <div
            onClick={()=> navigate("/teacher-dashboard/profile")}
            className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-b-2 py-5 cursor-pointer hover:border-[#8b8b8b]'>Profile</div>
            <div
            onClick={()=>navigate("/teacher-dashboard/feedback-analytics")}
            className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-y-2 py-5 cursor-pointer hover:border-[#8b8b8b] '>Feedback analytics</div>
            <div
            onClick={()=>navigate("/")}
            className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-y-2 py-5 cursor-pointer hover:border-[#8b8b8b] hover:text-red-500 '> Logout</div>
        </section>
    )
}

export default leftNavbar;