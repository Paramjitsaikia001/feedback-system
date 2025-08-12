import React from "react";
import { MessageSquare } from 'lucide-react'
import { useNavigate } from "react-router-dom";
const Registration = () => {
    const navigate =useNavigate()
    return (
        <section className="flex items-center justify-center h-screen w-full ">
            <div className="registration-form w-[50%] flex flex-col items-center justify-center">
                <h1 className='text-6xl font-bold text-blue-600 pb-12 font-serif'>Registration</h1>
                <form className='flex flex-col items-center justify-center w-full'>
                    <div className="email flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">email Id :</label>
                        <div className="email-verification w-[50%] items-center flex justify-center mb-3 gap-1">
                            <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-full ' type="text" name="fullname" id="" placeholder="Enter Email Id" />
                        </div>
                    </div>
                    <div className="fullname flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">Fullname :</label>
                        <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' type="text" name="fullname" id="" placeholder="Full Name" />
                    </div>
                    <div className="universityName flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">Name of University/School:</label>
                        <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' type="text" name="fullname" id="" placeholder="Name of University/School" />
                    </div>

                    <div className="password flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">Set Password:</label>
                        <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' type="text" name="fullname" id="" placeholder="Set password" />
                    </div>

                    <div className="password flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">Confirm Password:</label>
                        <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' type="text" name="fullname" id="" placeholder="Confirm password" />
                    </div>

                    <div className="role flex flex-col w-full items-center">
                        <label className="w-[50%] text-gray-700 font-semibold" htmlFor="email">Role:</label>
                        <select className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' name="role" id="role">
                            <option value="student">Student</option>
                            <option value="teacher">Teacher</option>
                        </select>
                    </div>

<button 
className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2 text-lg cursor-pointer rounded-md mt-4"
type="submit">Register</button>

                </form>
                <p className="text-sm mt-2 w-[50%]">I have register already 
                    <span
                    className="text-blue-600 hover:underline ml-1 cursor-pointer"
                    onClick={()=>navigate('/login')}
                >login.</span>
                
                </p>
            </div>

            <div className="showcase w-[50%] bg-blue-600 h-screen flex flex-col items-center justify-center py-4 px-3">
                <div className="flex items-center space-x-2 pb-5">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-500 rounded-lg flex items-center justify-center">
                        <MessageSquare className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold text-slate-800">EduFeedback</span>
                </div>
                <h1 className="text-3xl md:text-6xl font-bold text-slate-800 mb-6">
                    Empowering Education Through{' '}
                    <span className="bg-gradient-to-r from-white to-green-500 bg-clip-text text-transparent">
                        Student Feedback
                    </span>
                </h1>
                <p
                    className="text-xl text-white mb-8 max-w-3xl mx-auto"
                >
                    A secure, easy-to-use platform for collecting and analyzing teacher feedback.
                    Transform your educational experience with meaningful insights.
                </p>
            </div>
        </section>
    )
}

export default Registration;