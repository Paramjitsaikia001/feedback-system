import React from 'react'
import DashboardNavber from '../../utils/dashboard-navber'
import Left_Navbar from '../../utils/left-navber'
import Teacherprofile from '../../assets/teacher-profile.png'

const TeacherDashboard = () => {
    return (
        <section className='w-full h-full flex flex-col items-center justify-center'>
            <DashboardNavber />
            <div className="maincontent flex  w-full">
                <Left_Navbar />
                <div className='w-[80%]'>
                    <div className="header h-[25%] w-full bg-[#8aa6fc] flex justify-end items-end pb-4 pr-4">
                        <h1 className='py-2 px-4 border-1 border-black rounded-full w-[20%] text-center'>Teacher</h1>

                    </div>
                    <div className="profile-pic bg-[#effafc] w-[12rem] h-[12rem] rounded-full p-2 absolute top-[22%] ml-4 overflow-hidden flex items-center justify-center outline-1 outline-offset-4 outline-white">
                        <img src={Teacherprofile} alt="teacher-profile" srcset="" className='w-[50%]' />
                    </div>

                    <div className="user-details flex flex-col mt-[8rem] ml-8 gap-2">
                        <div className="nameandrole flex items-center gap-3">

                        <h1 className='font-semibold text-3xl'>Paramjit Saikia</h1>
                        <h4 className='font-extralight'>Teacher</h4>
                        </div>
                        <h2>zyx@gmail.com</h2>
                        <p className='text-3xl font-extralight mt-2'>Lalit Chandra Bharali College</p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeacherDashboard