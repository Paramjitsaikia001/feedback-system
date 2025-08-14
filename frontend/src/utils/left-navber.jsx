import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useEffect } from 'react';

const LeftNavbar = () => {
    const [role, setRole] = useState("")

    useEffect(() => {
        const fetchUserole = async () => {
            try {
                // const token = localStorage.getItem("token");
                // console.log(token)
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/users/me`, {
                    withCredentials: true
                });
                console.log(res.data)
                setRole(res.data.message.role

                )

            } catch (error) {
                console.log("Error fetching role:", error)
            };
        }
        fetchUserole();
    }, []);

    if (!role) return <div>Loading.....</div>;
    return (
        <section className='min-h-screen border-r-1 border-[#8b8b8b] flex flex-col items-center justify-start gap-4 w-[20%] py-8'>
            {role == "teacher" ?
                (<>
                    <Link
                        to="/teacher-dashboard/profile"
                        className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-b-2 py-5 cursor-pointer hover:border-[#8b8b8b]'>Profile</Link>
                    <Link
                        to="/teacher-dashboard/feedback-analytics"
                        className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-y-2 py-5 cursor-pointer hover:border-[#8b8b8b] '>Feedback analytics</Link>
                </>
                ) : (
                    <>
                        <Link
                            to="/student-dashboard/profile"
                            className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-b-2 py-5 cursor-pointer hover:border-[#8b8b8b]'>  Profile</Link>
                        <Link
                            to="/student-dashboard/give-feedback"
                            className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-y-2 py-5 cursor-pointer hover:border-[#8b8b8b] '>Give Feedback
                        </Link>
                    </>
                )
            }
            <Link
                to="/"
                className='text-start w-full pl-12 hover:shadow-lg h-[3rem] text-lg flex items-center hover:border-y-2 py-5 cursor-pointer hover:border-[#8b8b8b] hover:text-red-500 '> Logout</Link>
        </section >
    )
}

export default LeftNavbar;