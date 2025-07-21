"use client"

import { useState } from "react"
import { ArrowLeft, Check, X, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PersonalizedQuizProps {
  onComplete: (score: number) => void
  onBack: () => void
}

const questions = [
  {
    id: 1,
    question: "What's Mitali's favorite hobby?",
    options: ["Reading", "Singing", "Dancing", "All of the above"],
    correct: 3,
    explanation: "Mitali loves reading, singing, AND dancing! She's multi-talented! 📚🎤💃",
  },
  {
    id: 2,
    question: "When is Mitali's birthday?",
    options: ["July 21, 2002", "July 22, 2002", "July 23, 2002", "July 24, 2002"],
    correct: 1,
    explanation: "July 22, 2002 - the day an angel was born! 👼",
  },
  {
    id: 3,
    question: "What's Mitali's favorite color?",
    options: ["Blue", "Pink", "Purple", "Red"],
    correct: 1,
    explanation: "Pink, just like her beautiful personality! 🌸",
  },
  {
    id: 4,
    question: "What's one of our favorite romantic activities?",
    options: ["Movie nights", "Bike rides in the rain", "Shopping", "Gaming"],
    correct: 1,
    explanation: "Those magical bike rides in the rain are unforgettable! 🌧️🚲",
  },
  {
    id: 5,
    question: "Which city did we explore together?",
    options: ["Delhi", "Mumbai", "Jaipur", "Bangalore"],
    correct: 2,
    explanation: "Jaipur, the Pink City - perfect for our pink princess! 🏰",
  },
  {
    id: 6,
    question: "How old is Mitali turning?",
    options: ["22", "23", "24", "25"],
    correct: 1,
    explanation: "23 years of pure magic and beauty! ✨",
  },
]

export default function PersonalizedQuiz({ onComplete, onBack }: PersonalizedQuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState(0)
  const [answers, setAnswers] = useState<boolean[]>([])

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex)
  }

  const handleNextQuestion = () => {
    if (selectedAnswer === null) return

    const isCorrect = selectedAnswer === questions[currentQuestion].correct
    const newAnswers = [...answers, isCorrect]
    setAnswers(newAnswers)

    if (isCorrect) {
      setScore(score + 1)
    }

    setShowResult(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setSelectedAnswer(null)
        setShowResult(false)
      } else {
        onComplete(score + (isCorrect ? 1 : 0))
      }
    }, 2000)
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen p-4 flex items-center justify-center">
      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-pink-200 shadow-xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" onClick={onBack} className="text-pink-600 hover:text-pink-700">
              <ArrowLeft className="mr-2" size={20} />
              Back
            </Button>
            <div className="text-pink-600 font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-pink-100 rounded-full h-2 mb-6">
            <div
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Quiz content */}
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-pink-700 mb-2 font-serif">How Well Do You Know Mitali?</h2>
              <div className="flex justify-center gap-1 mb-4">
                {Array.from({ length: score }).map((_, i) => (
                  <Heart key={i} className="text-pink-500 fill-current" size={16} />
                ))}
              </div>
            </div>

            <Card className="p-6 bg-pink-50 border-pink-200 relative overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 bg-cover bg-center"
                style={{ backgroundImage: `url(/assets/images/${1003 + currentQuestion}.jpg)` }}
              />
              <div className="relative z-10">
                <h3 className="text-xl font-semibold text-pink-700 mb-4 text-center">{question.question}</h3>

                <div className="space-y-3">
                  {question.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      disabled={showResult}
                      className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                        selectedAnswer === index
                          ? showResult
                            ? index === question.correct
                              ? "border-green-500 bg-green-50 text-green-700"
                              : "border-red-500 bg-red-50 text-red-700"
                            : "border-pink-500 bg-pink-100 text-pink-700"
                          : showResult && index === question.correct
                            ? "border-green-500 bg-green-50 text-green-700"
                            : "border-pink-200 bg-white hover:border-pink-300 hover:bg-pink-50"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showResult && (
                          <div>
                            {index === question.correct ? (
                              <Check className="text-green-600" size={20} />
                            ) : selectedAnswer === index ? (
                              <X className="text-red-600" size={20} />
                            ) : null}
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                {showResult && (
                  <div className="mt-4 p-4 bg-pink-100 rounded-lg border border-pink-200 animate-in slide-in-from-bottom duration-500">
                    <p className="text-pink-700 font-medium text-center">{question.explanation}</p>
                  </div>
                )}
              </div>
            </Card>

            {!showResult && (
              <div className="text-center">
                <Button
                  onClick={handleNextQuestion}
                  disabled={selectedAnswer === null}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-2"
                >
                  {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
