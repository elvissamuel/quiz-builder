"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface QuizPlayerProps {
  quiz: any
}

export function QuizPlayer({ quiz }: QuizPlayerProps) {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100

  const handleAnswerChange = (questionId: string, answerId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answerId }))
  }

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/quizzes/${quiz.id}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: Object.entries(answers).map(([questionId, answerId]) => ({
            questionId,
            answerId,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit quiz")
      }

      const result = await response.json()
      router.push(`/quiz/${quiz.id}/result?result=${result.resultId}`)
    } catch (error) {
      console.error("Error submitting quiz:", error)
    } finally {
      setLoading(false)
    }
  }

  const currentQuestionData = quiz.questions[currentQuestion]
  const isLastQuestion = currentQuestion === quiz.questions.length - 1
  const canProceed = answers[currentQuestionData.id]

  // Define answer button colors and icons
  const answerConfigs = [
    { color: "bg-red-500 hover:bg-red-600", icon: "▲", letter: "A" },
    { color: "bg-blue-500 hover:bg-blue-600", icon: "◆", letter: "B" },
    { color: "bg-gold-500 hover:bg-gold-600", icon: "●", letter: "C" },
    { color: "bg-teal-500 hover:bg-teal-600", icon: "■", letter: "D" },
  ]

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{quiz.title}</h1>
            {quiz.creatorName && (
              <p className="text-sm text-teal-100 mt-1">
                Created by: {quiz.creatorName}
              </p>
            )}
          </div>
          <div className="flex items-center space-x-4 text-sm">
            <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
            <div className="w-32 bg-white/20 rounded-full h-2">
              <div 
                className="h-full bg-gold-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        {/* Question Section */}
        <div className="flex-1 flex flex-col justify-center mb-8">
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">{currentQuestion + 1}</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {currentQuestionData.text}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Answer Options Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {currentQuestionData.answers.map((answer: any, index: number) => {
            const config = answerConfigs[index] || answerConfigs[0]
            const isSelected = answers[currentQuestionData.id] === answer.id
            
            return (
              <button
                key={answer.id}
                onClick={() => handleAnswerChange(currentQuestionData.id, answer.id)}
                className={`
                  ${config.color} 
                  ${isSelected 
                    ? 'ring-4 ring-white shadow-xl scale-105' 
                    : 'ring-2 ring-white/30 hover:ring-4 hover:ring-white/50'
                  }
                  text-white font-bold text-xl p-8 rounded-xl shadow-lg transition-all duration-200 transform hover:scale-102
                  flex flex-col items-center justify-center space-y-3 min-h-[120px] relative
                `}
              >
                {/* Clean selection indicator */}
                {isSelected && (
                  <div className="absolute top-3 right-3 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                  </div>
                )}
                
                <div className="text-3xl">
                  {config.icon}
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-80 mb-1">
                    {config.letter}
                  </div>
                  <div className="text-lg leading-tight">
                    {answer.text}
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center">
          <Button 
            onClick={handlePrevious} 
            disabled={currentQuestion === 0} 
            variant="outline" 
            className="border-teal-300 text-teal-700 hover:bg-teal-50 disabled:opacity-50 px-6 py-3"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Previous
          </Button>

          {isLastQuestion ? (
            <Button 
              onClick={handleSubmit} 
              disabled={!canProceed || loading}
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-teal-900 font-semibold shadow-lg disabled:opacity-50 px-8 py-3 text-lg"
            >
              {loading ? "Submitting..." : "Get Results"}
            </Button>
          ) : (
            <Button 
              onClick={handleNext} 
              disabled={!canProceed}
              className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white shadow-lg disabled:opacity-50 px-8 py-3 text-lg"
            >
              Next
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
