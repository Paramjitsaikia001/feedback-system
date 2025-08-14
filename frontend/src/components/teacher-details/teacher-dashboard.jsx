import React from 'react'
import DashboardNavber from '../../utils/dashboard-navber'
import Left_Navbar from '../../utils/left-navber'
import Teacherprofile from '../../assets/teacher-profile.png'
import { useEffect } from 'react'
import axios from 'axios'
import { useState } from 'react'

const TeacherDashboard = () => {
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


  const studentParticipate = [
    { name: "Alice Johnson", email: "alice.johnson@example.com" },
    { name: "Bob Smith", email: "bob.smith@example.com" },
    { name: "Charlie Brown", email: "charlie.brown@example.com" },
    { name: "Diana Evans", email: "diana.evans@example.com" },
    { name: "Ethan Wilson", email: "ethan.wilson@example.com" },
    { name: "Fiona Clark", email: "fiona.clark@example.com" },
    { name: "George Lewis", email: "george.lewis@example.com" },
    { name: "Hannah Walker", email: "hannah.walker@example.com" },
    { name: "Ian Scott", email: "ian.scott@example.com" },
    { name: "Julia Adams", email: "julia.adams@example.com" },
    { name: "Kevin Baker", email: "kevin.baker@example.com" },
    { name: "Laura Collins", email: "laura.collins@example.com" },
    { name: "Michael Reed", email: "michael.reed@example.com" },
    { name: "Nina Cooper", email: "nina.cooper@example.com" },
    { name: "Oliver Murphy", email: "oliver.murphy@example.com" },
    { name: "Paula Rogers", email: "paula.rogers@example.com" },
    { name: "Quentin Rivera", email: "quentin.rivera@example.com" },
    { name: "Rachel Peterson", email: "rachel.peterson@example.com" },
    { name: "Samuel Price", email: "samuel.price@example.com" },
    { name: "Tina Griffin", email: "tina.griffin@example.com" },
    { name: "Ulysses Hughes", email: "ulysses.hughes@example.com" },
    { name: "Victoria Perry", email: "victoria.perry@example.com" },
    { name: "William Sanders", email: "william.sanders@example.com" },
    { name: "Xena Coleman", email: "xena.coleman@example.com" },
    { name: "Yara Jenkins", email: "yara.jenkins@example.com" },
    { name: "Zachary Kelly", email: "zachary.kelly@example.com" },
    { name: "Aaron Foster", email: "aaron.foster@example.com" },
    { name: "Brenda Simmons", email: "brenda.simmons@example.com" },
    { name: "Caleb Bryant", email: "caleb.bryant@example.com" },
    { name: "Daisy Howard", email: "daisy.howard@example.com" },
    { name: "Eli Russell", email: "eli.russell@example.com" },
    { name: "Faith Barnes", email: "faith.barnes@example.com" },
    { name: "Gavin Price", email: "gavin.price@example.com" },
    { name: "Hailey Foster", email: "hailey.foster@example.com" },
    { name: "Isaac Gray", email: "isaac.gray@example.com" },
    { name: "Jasmine Hayes", email: "jasmine.hayes@example.com" },
    { name: "Kyle Patterson", email: "kyle.patterson@example.com" },
    { name: "Lila Coleman", email: "lila.coleman@example.com" },
    { name: "Mason Bryant", email: "mason.bryant@example.com" },
    { name: "Natalie Simmons", email: "natalie.simmons@example.com" },
    { name: "Owen Hughes", email: "owen.hughes@example.com" },
    { name: "Penelope Griffin", email: "penelope.griffin@example.com" },
    { name: "Quincy Perry", email: "quincy.perry@example.com" },
    { name: "Riley Sanders", email: "riley.sanders@example.com" },
    { name: "Sophia Jenkins", email: "sophia.jenkins@example.com" },
    { name: "Travis Kelly", email: "travis.kelly@example.com" },
    { name: "Uma Simmons", email: "uma.simmons@example.com" },
    { name: "Violet Bryant", email: "violet.bryant@example.com" },
    { name: "Wyatt Howard", email: "wyatt.howard@example.com" },
    { name: "Xavier Russell", email: "xavier.russell@example.com" },
    { name: "Yvonne Barnes", email: "yvonne.barnes@example.com" },
    { name: "Zane Gray", email: "zane.gray@example.com" }
];
    return (
        <section className='w-full h-full flex flex-col items-center justify-center'>
            <DashboardNavber />
            <div className="maincontent flex  w-full">
                <Left_Navbar />
                <div className='w-[80%]'>
                    <div className="header h-[15rem] w-full bg-[#8aa6fc] flex justify-end items-end pb-4 pr-4">
                        <h1 className='py-2 px-4 border-1 border-black rounded-full w-[20%] text-center'>{role}</h1>

                    </div>
                    <div className="profile-pic bg-[#effafc] w-[12rem] h-[12rem] rounded-full p-2 absolute top-[22%] ml-4 overflow-hidden flex items-center justify-center outline-1 outline-offset-4 outline-white">
                        <img src={Teacherprofile} alt="teacher-profile" srcSet="" className='w-[50%]' />
                    </div>

                    <div className="user-details flex flex-col mt-[8rem] ml-8 gap-2">
                        <div className="nameandrole flex items-center gap-3">

                            <h1 className='font-semibold text-3xl'>{fullname}</h1>
                            <h4 className='font-extralight'>{role}</h4>
                        </div>
                        <h2>{email}</h2>
                        <p className='text-3xl font-extralight mt-2'>{universityName}</p>
                    </div>

                    <div className="student-participate my-12 mx-8">
                        <h1 className='text-4xl border-b-1 border-[#8b8b8b]'>Student participate</h1>

                        {
                            studentParticipate.map((st,index)=>(
                            <div
                            key={index}
                            className="studets flex flex-col border-1 border-[#8b8b8b] rounded-xl my-8 py-2 px-8">
                                <h1 className='text-xl '>{st.name}</h1>
                                <p className='font-extralight'>{st.email}</p>
                            </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TeacherDashboard