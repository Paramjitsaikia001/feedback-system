"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const FeedbackForm = () => {
  const [teachers, setTeachers] = useState([])
  const [formData, setFormData] = useState({
    teacherId: "",
    behavior: 5,
    delivery: 5,
    engagement: 5,
    comment: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchTeachers()
  }, [])

  const fetchTeachers = async () => {
    try {
      const response = await axios.get("/api/feedback/teachers")
      setTeachers(response.data)
    } catch (error) {
      setError("Failed to load teachers")
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: name === "behavior" || name === "delivery" || name === "engagement" ? Number.parseInt(value) : value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      await axios.post("/api/feedback/submit", formData)
      setSuccess("Feedback submitted successfully!")
      setTimeout(() => {
        navigate("/student")
      }, 2000)
    } catch (error) {
      setError(error.response?.data?.message || "Failed to submit feedback")
    } finally {
      setLoading(false)
    }
  }

  const getRatingLabel = (rating) => {
    const labels = {
      1: "Poor",
      2: "Fair",
      3: "Good",
      4: "Very Good",
      5: "Excellent",
    }
    return labels[rating]
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Submit Teacher Feedback</h2>
              <p className="mt-1 text-sm text-gray-600">Rate your teacher's performance in the following categories</p>
            </div>

            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">{error}</div>
            )}

            {success && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Teacher Selection */}
              <div>
                <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">
                  Select Teacher
                </label>
                <select
                  id="teacherId"
                  name="teacherId"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={formData.teacherId}
                  onChange={handleChange}
                >
                  <option value="">Choose a teacher...</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.username}
                    </option>
                  ))}
                </select>
              </div>

              {/* Behavior Rating */}
              <div>
                <label htmlFor="behavior" className="block text-sm font-medium text-gray-700 mb-2">
                  Behavior Rating: {formData.behavior}/5 ({getRatingLabel(formData.behavior)})
                </label>
                <input
                  type="range"
                  id="behavior"
                  name="behavior"
                  min="1"
                  max="5"
                  value={formData.behavior}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Delivery Rating */}
              <div>
                <label htmlFor="delivery" className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Rating: {formData.delivery}/5 ({getRatingLabel(formData.delivery)})
                </label>
                <input
                  type="range"
                  id="delivery"
                  name="delivery"
                  min="1"
                  max="5"
                  value={formData.delivery}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Engagement Rating */}
              <div>
                <label htmlFor="engagement" className="block text-sm font-medium text-gray-700 mb-2">
                  Engagement Rating: {formData.engagement}/5 ({getRatingLabel(formData.engagement)})
                </label>
                <input
                  type="range"
                  id="engagement"
                  name="engagement"
                  min="1"
                  max="5"
                  value={formData.engagement}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Poor</span>
                  <span>Fair</span>
                  <span>Good</span>
                  <span>Very Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Comment */}
              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  rows={4}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Share any specific feedback or suggestions..."
                  value={formData.comment}
                  onChange={handleChange}
                  maxLength={500}
                />
                <p className="mt-1 text-xs text-gray-500">{formData.comment.length}/500 characters</p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => navigate("/student")}
                  className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {loading ? "Submitting..." : "Submit Feedback"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackForm
