"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../context/AuthContext"
import axios from "axios"

const TeacherDashboard = () => {
  const { user, logout } = useAuth()
  const [feedbackData, setFeedbackData] = useState({
    feedbacks: [],
    averages: { behavior: 0, delivery: 0, engagement: 0 },
    totalFeedbacks: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`/api/feedback/teacher/${user.id}`)
      setFeedbackData(response.data)
    } catch (error) {
      console.error("Error fetching feedback:", error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getRatingColor = (rating) => {
    if (rating >= 4) return "text-green-600"
    if (rating >= 3) return "text-yellow-600"
    return "text-red-600"
  }

  const getRatingBg = (rating) => {
    if (rating >= 4) return "bg-green-100"
    if (rating >= 3) return "bg-yellow-100"
    return "bg-red-100"
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold">AR Feedback System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.username}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Teacher Dashboard</h2>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Total Feedback</dt>
                      <dd className="text-lg font-medium text-gray-900">{feedbackData.totalFeedbacks}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${getRatingBg(feedbackData.averages.behavior)}`}
                    >
                      <span className={`text-sm font-bold ${getRatingColor(feedbackData.averages.behavior)}`}>B</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg Behavior</dt>
                      <dd className={`text-lg font-medium ${getRatingColor(feedbackData.averages.behavior)}`}>
                        {feedbackData.averages.behavior.toFixed(1)}/5
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${getRatingBg(feedbackData.averages.delivery)}`}
                    >
                      <span className={`text-sm font-bold ${getRatingColor(feedbackData.averages.delivery)}`}>D</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg Delivery</dt>
                      <dd className={`text-lg font-medium ${getRatingColor(feedbackData.averages.delivery)}`}>
                        {feedbackData.averages.delivery.toFixed(1)}/5
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-8 h-8 rounded-md flex items-center justify-center ${getRatingBg(feedbackData.averages.engagement)}`}
                    >
                      <span className={`text-sm font-bold ${getRatingColor(feedbackData.averages.engagement)}`}>E</span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Avg Engagement</dt>
                      <dd className={`text-lg font-medium ${getRatingColor(feedbackData.averages.engagement)}`}>
                        {feedbackData.averages.engagement.toFixed(1)}/5
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Feedback List */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Recent Feedback</h3>
              {feedbackData.feedbacks.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No feedback received yet.</p>
              ) : (
                <div className="space-y-4">
                  {feedbackData.feedbacks.map((feedback) => (
                    <div key={feedback._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="text-sm font-medium text-gray-900">From: {feedback.studentId.username}</h4>
                          <p className="text-xs text-gray-500">{formatDate(feedback.createdAt)}</p>
                        </div>
                        <div className="flex space-x-4 text-sm">
                          <span
                            className={`px-2 py-1 rounded ${getRatingBg(feedback.behavior)} ${getRatingColor(feedback.behavior)}`}
                          >
                            Behavior: {feedback.behavior}/5
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${getRatingBg(feedback.delivery)} ${getRatingColor(feedback.delivery)}`}
                          >
                            Delivery: {feedback.delivery}/5
                          </span>
                          <span
                            className={`px-2 py-1 rounded ${getRatingBg(feedback.engagement)} ${getRatingColor(feedback.engagement)}`}
                          >
                            Engagement: {feedback.engagement}/5
                          </span>
                        </div>
                      </div>
                      {feedback.comment && (
                        <div className="bg-gray-50 rounded p-3">
                          <p className="text-sm text-gray-700">{feedback.comment}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TeacherDashboard
