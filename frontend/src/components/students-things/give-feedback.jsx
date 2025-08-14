import { useState, useEffect } from "react";
import axios from "axios";
import DashboardNavber from "../../utils/dashboard-navber";
import Left_Navbar from "../../utils/left-navber";
import { Columns } from "lucide-react";
export default function FeedbackPage({ studentId }) {
  const [questions, setQuestions] = useState([]);
  const [ratings, setRatings] = useState({});
  const [message, setMessage] = useState("");

  // Fetch questions from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleRatingChange = (questionId, value) => {
    setRatings(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleFinalSubmit = async () => {
    try {
      const feedbacks = Object.entries(ratings).map(([questionId, rating]) => ({
        questionId,
        rating,
        studentId
      }));
      for (const feedback of feedbacks) {
        await axios.post("http://localhost:3000/api/v1/feedback", feedback,{
          withCredentials:true
        });
      }
      setMessage("✅ Feedback submitted successfully!");
      setRatings({});
    } catch (err) {
      console.log("❌ Error submitting feedback",err);
    }
  };

  return (
    <section className='w-full h-[100%] flex flex-col items-center justify-center'>
      <DashboardNavber />
      <div className="maincontent flex  w-full h--[100%]">
        <Left_Navbar />
        <div className='w-[80%] pb-48'>
          <div className="max-w-full m-auto flex flex-col items-center">
            <h2 className="text-start text-4xl border-b-1 border-[#8b8b8b] py-8 pl-12 w-full font-extralight">Give Feedback</h2>
            {questions.map((q, index) => (
              <div key={q._id} className="h-full pl-12 flex flex-col gap-8 py-8">
                <label className="text-4xl font-light font-sans ">{index + 1}. {q.tittle}</label>
                <div className="bg-[#f0f0f0] rounded-2xl h-auto w-auto px-12 py-8 flex flex-col justify-start mx-4 items-start gap-8">
                  {[
                    { value: 5, label: "Very Good" },
                    { value: 4, label: "Good" },
                    { value: 3, label: "Average" },
                    { value: 2, label: "Bad" },
                    { value: 1, label: "Very Bad" }
                  ].map(option => (
                    <label key={option.value}  className="cursor-pointer  text-2xl flex gap-4 items-center">
                      <input
                        type="radio"
                        name={`rating-${q._id}`}
                        value={option.value}
                        checked={ratings[q._id] === option.value}
                        onChange={() => handleRatingChange(q._id, option.value)}
                        required
                        className="appearance-none w-6 h-6 border-2 border-gray-400 rounded-full checked:bg-blue-500 checked:border-blue-500 transition-all duration-200 cursor-pointer"
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              </div>
            ))}
            <button onClick={handleFinalSubmit} disabled={Object.keys(ratings).length === 0} className="h-18 bg-blue-500 px-12 font-semibold rounded-lg text-white cursor-pointer hover:bg-blue-700 flex items-center">
              Submit All Feedback
            </button>
            {message && <p>{message}</p>}
          </div>
        </div>
      </div>
    </section>
  )
}