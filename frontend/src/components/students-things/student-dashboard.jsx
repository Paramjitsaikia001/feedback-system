import React from 'react'
import DashboardNavber from '../../utils/dashboard-navber'
import Left_Navbar from '../../utils/left-navber'
import Teacherprofile from '../../assets/teacher-profile.png'
import StudentProfile from '../../assets/student.svg'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const StudentDashboard = () => {
    const [role, setRole] = useState("")
    const [fullname, setFullname] = useState("")
    const [universityName, setUN] = useState("")
    const [email, setemail] = useState("")
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`,
                    { withCredentials: true }
                );
                console.log(res.data)
                setRole(res.data.message.role);
                setFullname(res.data.message.fullname);
                setUN(res.data.message.universityName);
                setemail(res.data.message.email);
            } catch (error) {
                console.log("error in fetching data", error)
            }

        };
        fetchData();
    }, []);

    const teacher = [
        {
            name: "John doe",
            subject: "Mathematic"
        },
        {
            name: "Rita Sinha",
            subject: "Computer Science"
        },
        {
            name: "Rahul Sharma",
            subject: "Physics"
        }
    ]
    return (
        <section className='w-full h-full flex flex-col items-center justify-center'>
            <DashboardNavber />
            <div className="maincontent flex  w-full">
                <Left_Navbar />
                <div className='w-[80%]'>

                    <div className="studetn-details w-full h-full border-b-1 border-[#8aa6fc]">

                        <div className="header h-[25%] w-full bg-[#8aa6fc] flex justify-end items-end pb-4 pr-4">
                            <h1 className='py-2 px-4 border-1 border-black rounded-full w-[20%] text-center'>{role}</h1>

                        </div>
                        <div className="profile-pic bg-[#effafc] w-[12rem] h-[12rem] rounded-full p-2 absolute top-[22%] ml-4 overflow-hidden flex items-center justify-center outline-1 outline-offset-4 outline-white">
                            <img src={StudentProfile} alt="teacher-profile" srcSet="" className='w-[50%]' />
                        </div>

                        <div className="user-details flex flex-col mt-[8rem] ml-8 gap-2">
                            <div className="nameandrole flex items-center gap-3">

                                <h1 className='font-semibold text-3xl'>{fullname}</h1>
                                <h4 className='font-extralight'>{role}</h4>
                            </div>
                            <h2>{email}</h2>
                            <p className='text-3xl font-extralight mt-2'>{universityName}</p>
                        </div>
                        <div className="give-feedback my-12 flex flex-wrap justify-evenly ">
                            {
                                teacher.map((t, index) => (
                                    <div
                                        key={index}
                                        className="teacher-one border-1 border-[#8aa6fc] py-12 px-8 rounded-lg">

                                        <h1 className='text-2xl font-semibold'>{t.name}</h1>
                                        <h3 className='text-xl '>Subject teacher : {t.subject}</h3>
                                        <Link
                                        to="/student-dashboard/give-feedback"
                                        className='bg-blue-500 py-2 px-3 text-white cursor-pointer rounded-md mt-4 inline-block'>
                                            Give feedback for {t.name}</Link>
                                    </div>
                                ))
                            }
                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}

export default StudentDashboard