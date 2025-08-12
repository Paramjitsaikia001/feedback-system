import React from 'react'
import { useNavigate } from 'react-router-dom'
import {MessageSquare} from 'lucide-react'
const Login = () => {
  const navigate = useNavigate();
  return (
    <div className='flex items-center justify-center h-screen w-full '>


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


      <div className="login-form w-[50%] flex flex-col items-center justify-center gap-4">
        <h1 className='text-6xl font-bold text-blue-600 pb-12 font-serif'>Login</h1>
        <form className='flex flex-col items-center justify-center w-full'>
          <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%] mb-3' type="text" placeholder="Username" />
          <input className='border-2 border-gray-300 rounded-md px-2 py-3 h-12 w-[50%]' type="password" placeholder="Password" />
          <button className='text-start w-[50%] text-blue-800 cursor-pointer hover:underline text-sm'>Forget password</button>
          <button 
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-2 text-lg cursor-pointer rounded-md mt-4"
          type="submit">Login</button>
        </form>
        <p className='w-[50%] text-sm'>
          <span>If you don't register yet,</span>
          <button
          className='text-blue-600 cursor-pointer hover:underline'
            onClick={() => navigate('/registration')}
          >Register Now</button>
        </p>
      </div>
    </div>
  )
}

export default Login