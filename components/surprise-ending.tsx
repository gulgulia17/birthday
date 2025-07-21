"use client"

import { useState, useEffect } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface SurpriseEndingProps {
  gameProgress: {
    adventureComplete: boolean
    quizComplete: boolean
    memoryComplete: boolean
    hobbyComplete: boolean
    totalScore: number
  }
  onRestart: () => void
}

export default function SurpriseEnding({ gameProgress, onRestart }: SurpriseEndingProps) {
  const [showFireworks, setShowFireworks] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)

  const birthdayMessages = [
    "Happy 23rd Birthday, Mitali! 🎂",
    "You are my sunshine on cloudy days ☀️",
    "Every moment with you is a treasure 💎",
    "Your smile lights up my entire world 🌟",
    "Thank you for being my favorite adventure 🚲",
    "Here's to many more memories together 💕",
    "You make every day feel like magic ✨",
    "Forever grateful for your love 💖",
  ]

  useEffect(() => {
    // Start fireworks animation
    setShowFireworks(true)

    // Show messages with delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    return () => clearTimeout(messageTimer)
  }, [])

  useEffect(() => {
    if (showMessage && currentMessageIndex < birthdayMessages.length - 1) {
      const timer = setTimeout(() => {
        setCurrentMessageIndex(currentMessageIndex + 1)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [showMessage, currentMessageIndex, birthdayMessages.length])

  const createFirework = () => {
    const colors = ["#ff69b4", "#ff1493", "#ffc0cb", "#ff6347", "#ffd700"]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="min-h-screen p-4 flex items-center justify-center relative overflow-hidden">
      {/* Fireworks background */}
      {showFireworks && (
        <div className="fixed inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-ping"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: "2s",
              }}
            >
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: createFirework() }} />
            </div>
          ))}
        </div>
      )}

      <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-pink-200 shadow-2xl relative z-10">
        <div className="p-8 text-center space-y-8">
          {/* Celebration header */}
          <div className="space-y-4">
            <div className="text-6xl animate-bounce">🎉</div>
            <h1 className="text-4xl font-bold text-pink-700 font-serif">Surprise!</h1>
            <div className="flex justify-center gap-2 text-2xl">
              <span className="animate-pulse">🎂</span>
              <span className="animate-pulse" style={{ animationDelay: "0.2s" }}>
                🎈
              </span>
              <span className="animate-pulse" style={{ animationDelay: "0.4s" }}>
                🎊
              </span>
              <span className="animate-pulse" style={{ animationDelay: "0.6s" }}>
                🎁
              </span>
              <span className="animate-pulse" style={{ animationDelay: "0.8s" }}>
                ✨
              </span>
            </div>
          </div>

          {/* Game completion summary */}
          <Card className="p-6 bg-pink-50 border-pink-200">
            <h2 className="text-xl font-bold text-pink-700 mb-4">Your Adventure Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${gameProgress.adventureComplete ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Romantic Adventure</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${gameProgress.quizComplete ? "bg-green-500" : "bg-gray-300"}`} />
                <span>Personal Quiz</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${gameProgress.memoryComplete ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Memory Lane</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${gameProgress.hobbyComplete ? "bg-green-500" : "bg-gray-300"}`}
                />
                <span>Hobby Games</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-pink-200">
              <p className="text-pink-700 font-semibold">Quiz Score: {gameProgress.totalScore} / 6 ❤️</p>
            </div>
          </Card>

          {/* Birthday messages */}
          {showMessage && (
            <Card className="p-6 bg-gradient-to-r from-pink-100 to-rose-100 border-pink-300 animate-in slide-in-from-bottom duration-1000">
              <div className="space-y-4">
                <div className="text-4xl">💖</div>
                <p className="text-2xl font-bold text-pink-700 font-serif">{birthdayMessages[currentMessageIndex]}</p>
                {currentMessageIndex === birthdayMessages.length - 1 && (
                  <div className="mt-6 space-y-4">
                    <div className="text-lg text-pink-600 italic">
                      "Every day with you feels like a celebration, but today is extra special. Happy 23rd Birthday to
                      the most amazing person in my world!"
                    </div>
                    <div className="text-pink-500 font-medium">
                      With all my love,
                      <br />
                      Your Forever Adventure Partner 💕
                    </div>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Action buttons */}
          {currentMessageIndex === birthdayMessages.length - 1 && (
            <div className="space-y-4">
              <div className="flex justify-center gap-4">
                <Button
                  onClick={onRestart}
                  variant="outline"
                  className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                >
                  <RotateCcw className="mr-2" size={16} />
                  Replay Adventure
                </Button>
              </div>

              <div className="text-pink-500 text-sm">Thank you for celebrating with us! 🎂✨</div>
            </div>
          )}

          {/* Floating hearts */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="absolute animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  fontSize: `${Math.random() * 20 + 10}px`,
                }}
              >
                💖
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
