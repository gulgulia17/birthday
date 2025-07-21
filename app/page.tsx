"use client"

import { useState, useEffect } from "react"
import { Heart, Music, Sparkles, Gift } from "lucide-react"
import LandingPage from "@/components/landing-page"
import AdventureGame from "@/components/adventure-game"
import PersonalizedQuiz from "@/components/personalized-quiz"
import MemoryLane from "@/components/memory-lane"
import HobbyGames from "@/components/hobby-games"
import SurpriseEnding from "@/components/surprise-ending"

export default function MitaliBirthdayAdventure() {
  const [currentScene, setCurrentScene] = useState("landing")
  const [gameProgress, setGameProgress] = useState({
    adventureComplete: false,
    quizComplete: false,
    memoryComplete: false,
    hobbyComplete: false,
    totalScore: 0,
  })
  const [showFloatingHearts, setShowFloatingHearts] = useState(true)

  useEffect(() => {
    // Create floating hearts animation
    const interval = setInterval(() => {
      if (showFloatingHearts) {
        createFloatingHeart()
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [showFloatingHearts])

  const createFloatingHeart = () => {
    const heart = document.createElement("div")
    heart.innerHTML = "💖"
    heart.className = "floating-heart"
    heart.style.cssText = `
      position: fixed;
      font-size: 20px;
      pointer-events: none;
      z-index: 1000;
      left: ${Math.random() * 100}vw;
      top: 100vh;
      animation: floatUp 4s ease-out forwards;
    `
    document.body.appendChild(heart)

    setTimeout(() => {
      heart.remove()
    }, 4000)
  }

  const handleSceneChange = (scene: string, progress?: any) => {
    setCurrentScene(scene)
    if (progress) {
      setGameProgress((prev) => ({ ...prev, ...progress }))
    }
  }

  const renderCurrentScene = () => {
    switch (currentScene) {
      case "landing":
        return <LandingPage onStart={() => handleSceneChange("adventure")} />
      case "adventure":
        return (
          <AdventureGame
            onComplete={() => handleSceneChange("quiz", { adventureComplete: true })}
            onBack={() => handleSceneChange("landing")}
          />
        )
      case "quiz":
        return (
          <PersonalizedQuiz
            onComplete={(score) => handleSceneChange("memory", { quizComplete: true, totalScore: score })}
            onBack={() => handleSceneChange("adventure")}
          />
        )
      case "memory":
        return (
          <MemoryLane
            onComplete={() => handleSceneChange("hobbies", { memoryComplete: true })}
            onBack={() => handleSceneChange("quiz")}
          />
        )
      case "hobbies":
        return (
          <HobbyGames
            onComplete={() => handleSceneChange("ending", { hobbyComplete: true })}
            onBack={() => handleSceneChange("memory")}
          />
        )
      case "ending":
        return <SurpriseEnding gameProgress={gameProgress} onRestart={() => handleSceneChange("landing")} />
      default:
        return <LandingPage onStart={() => handleSceneChange("adventure")} />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-pink-200 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-pink-300 opacity-30">
          <Sparkles size={24} />
        </div>
        <div className="absolute top-20 right-20 text-pink-300 opacity-30">
          <Heart size={20} />
        </div>
        <div className="absolute bottom-20 left-20 text-pink-300 opacity-30">
          <Music size={22} />
        </div>
        <div className="absolute bottom-10 right-10 text-pink-300 opacity-30">
          <Gift size={26} />
        </div>
      </div>

      {/* Main content */}
      <main className="relative z-10">{renderCurrentScene()}</main>

      {/* Global styles for animations */}
      <style jsx global>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes sparkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .sparkle-animation {
          animation: sparkle 2s ease-in-out infinite;
        }
        
        .heartbeat-animation {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .floating-petals {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }
        
        .petal {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle, #fce7f3, #f9a8d4);
          border-radius: 50% 0 50% 0;
          animation: fall 8s linear infinite;
        }
        
        @keyframes fall {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
