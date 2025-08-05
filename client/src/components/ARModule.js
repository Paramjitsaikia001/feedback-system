"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"

const ARModule = () => {
  const [currentModule, setCurrentModule] = useState("physics")
  const [progress, setProgress] = useState(65)
  const navigate = useNavigate()

  const modules = {
    physics: {
      title: "Physics in AR",
      description: "Explore physics concepts through augmented reality",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      topics: ["Newton's Laws", "Gravity", "Motion", "Energy"],
    },
    chemistry: {
      title: "Chemistry Lab AR",
      description: "Virtual chemistry experiments in augmented reality",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      topics: ["Molecular Structure", "Chemical Reactions", "Periodic Table", "Lab Safety"],
    },
    biology: {
      title: "Biology AR Explorer",
      description: "Discover biological systems through AR visualization",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      topics: ["Cell Structure", "DNA", "Ecosystems", "Human Body"],
    },
  }

  const handleModuleComplete = () => {
    setProgress(Math.min(progress + 10, 100))
    alert("Module completed! +10 XP earned")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">AR Learning Modules</h1>
            <button onClick={() => navigate("/student")} className="text-blue-600 hover:text-blue-500">
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {/* Progress Bar */}
          <div className="mb-8 bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium text-gray-900">Learning Progress</h3>
              <span className="text-sm font-medium text-blue-600">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Module Selection */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Available Modules</h3>
                  <div className="space-y-2">
                    {Object.entries(modules).map(([key, module]) => (
                      <button
                        key={key}
                        onClick={() => setCurrentModule(key)}
                        className={`w-full text-left p-3 rounded-md transition-colors ${
                          currentModule === key
                            ? "bg-blue-100 text-blue-700 border-blue-200"
                            : "hover:bg-gray-50 text-gray-700"
                        }`}
                      >
                        <div className="font-medium">{module.title}</div>
                        <div className="text-sm text-gray-500">{module.description}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Gamification Elements */}
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Achievements</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-yellow-600">🏆</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Quick Learner</div>
                        <div className="text-xs text-gray-500">Complete 3 modules</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-purple-600">⭐</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">AR Explorer</div>
                        <div className="text-xs text-gray-500">Use AR features 10 times</div>
                      </div>
                    </div>
                    <div className="flex items-center opacity-50">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                        <span className="text-gray-400">🎯</span>
                      </div>
                      <div>
                        <div className="text-sm font-medium">Perfect Score</div>
                        <div className="text-xs text-gray-500">Score 100% on quiz</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">{modules[currentModule].title}</h2>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                        🥽 AR Mode
                      </button>
                      <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                        🎮 Game Mode
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{modules[currentModule].description}</p>

                  {/* Video/AR Content Placeholder */}
                  <div className="aspect-video bg-gray-900 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="text-6xl mb-4">🥽</div>
                      <h3 className="text-xl font-semibold mb-2">AR Content Placeholder</h3>
                      <p className="text-gray-300 mb-4">
                        This would display interactive AR content for {modules[currentModule].title}
                      </p>
                      <div className="space-x-4">
                        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                          Start AR Experience
                        </button>
                        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-md transition-colors">
                          Watch Demo
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Topics Covered */}
                  <div className="mb-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Topics Covered</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {modules[currentModule].topics.map((topic, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                          <span className="text-sm text-gray-700">{topic}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Elements */}
                  <div className="border-t pt-6">
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                          Take Quiz
                        </button>
                        <button
                          onClick={handleModuleComplete}
                          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      </div>
                      <div className="text-sm text-gray-500">Estimated time: 15-20 minutes</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interactive Quiz Section */}
              <div className="mt-6 bg-white rounded-lg shadow">
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Quick Knowledge Check</h3>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <p className="font-medium mb-3">What is Newton's First Law of Motion?</p>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="radio" name="quiz1" className="mr-2" />
                          <span className="text-sm">An object at rest stays at rest</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="quiz1" className="mr-2" />
                          <span className="text-sm">Force equals mass times acceleration</span>
                        </label>
                        <label className="flex items-center">
                          <input type="radio" name="quiz1" className="mr-2" />
                          <span className="text-sm">Every action has an equal and opposite reaction</span>
                        </label>
                      </div>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                      Submit Answer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ARModule
