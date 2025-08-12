import { useState, useEffect } from "react";
import axios from "axios";

export default function FeedbackPage({ studentId }) {
  const [questions, setQuestions] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [rating, setRating] = useState(1);
  const [message, setMessage] = useState("");

  // Fetch questions from backend
  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/questions")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/v1/feedback", {
        questionId: selectedQuestion,
        rating,
        studentId
      });
      setMessage("✅ Feedback submitted successfully!");
    } catch (err) {
      setMessage("❌ Error submitting feedback",err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Give Feedback</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Question Select */}
        <label>Question:</label>
        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(e.target.value)}
          required
        >
          <option value="">-- Select Question --</option>
          {questions.map((q) => (
            <option key={q._id} value={q._id}>
              {q.tittle}
            </option>
          ))}
        </select>

        {/* Rating */}
        <label>Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />

        {/* Submit Button */}
        <button type="submit">Submit Feedback</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}