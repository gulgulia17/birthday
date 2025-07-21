"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface AdventureGameProps {
  onComplete: () => void
  onBack: () => void
}

const scenes = [
  {
    id: 1,
    title: "Romantic Bike Rides in the Rain",
    image: "/assets/images/1003.jpg?height=300&width=400",
    description:
      "Remember our magical rides through the rain, Mitali? Every drop felt like a blessing when I was with you.",
    hiddenMessage: "You're my favorite adventure in every weather 💕",
    clickableItems: [
      { x: 60, y: 40, icon: "🌧️", message: "Each raindrop reminded me how lucky I am to have you" },
      { x: 30, y: 60, icon: "🚲", message: "Our bike rides are my favorite kind of therapy" },
    ],
  },
  {
    id: 2,
    title: "Jaipur Wandering Adventures",
    image: "/assets/images/1027.jpg?height=300&width=400",
    description:
      "Those endless walks through Jaipur's pink streets, just like your favorite color! Every corner held a new memory with you.",
    hiddenMessage: "You make every city feel like home 🏰",
    clickableItems: [
      { x: 45, y: 30, icon: "🏰", message: "Like a princess in her pink palace city" },
      { x: 70, y: 70, icon: "👫", message: "Hand in hand, heart to heart, always" },
    ],
  },
  {
    id: 3,
    title: "Memorable Food Dates",
    image: "/assets/images/1012.jpg?height=300&width=400",
    description: "From cozy cafés to street food adventures, every meal tasted better when shared with you, my love.",
    hiddenMessage: "You're the sweetest thing on every menu 🍰",
    clickableItems: [
      { x: 50, y: 45, icon: "🍰", message: "Sweeter than any dessert we've shared" },
      { x: 25, y: 65, icon: "☕", message: "You're my daily dose of happiness" },
    ],
  },
]

export default function AdventureGame({ onComplete, onBack }: AdventureGameProps) {
  const [currentScene, setCurrentScene] = useState(0)
  const [discoveredMessages, setDiscoveredMessages] = useState<string[]>([])
  const [showHiddenMessage, setShowHiddenMessage] = useState(false)

  const handleItemClick = (message: string) => {
    if (!discoveredMessages.includes(message)) {
      setDiscoveredMessages([...discoveredMessages, message])
    }
  }

  const handleNextScene = () => {
    if (currentScene < scenes.length - 1) {
      setCurrentScene(currentScene + 1)
      setShowHiddenMessage(false)
    } else {
      onComplete()
    }
  }

  const handlePrevScene = () => {
    if (currentScene > 0) {
      setCurrentScene(currentScene - 1)
      setShowHiddenMessage(false)
    }
  }

  const revealHiddenMessage = () => {
    setShowHiddenMessage(true)
  }

  const scene = scenes[currentScene]

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
              Scene {currentScene + 1} of {scenes.length}
            </div>
          </div>

          {/* Scene content */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-pink-700 text-center font-serif">{scene.title}</h2>

            {/* Interactive image */}
            <div className="relative group">
              <img
                src={scene.image || "/assets/images/1001.jpg"}
                alt={scene.title}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />

              {/* Clickable items overlay */}
              {scene.clickableItems.map((item, index) => (
                <button
                  key={index}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 text-2xl hover:scale-125 transition-transform duration-200 animate-pulse"
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  onClick={() => handleItemClick(item.message)}
                >
                  {item.icon}
                </button>
              ))}

              {/* Hidden message trigger */}
              <button
                onClick={revealHiddenMessage}
                className="absolute bottom-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full shadow-lg transform hover:scale-110 transition-all duration-200"
              >
                <Heart size={16} />
              </button>
            </div>

            {/* Scene description */}
            <p className="text-pink-600 text-lg text-center italic leading-relaxed">{scene.description}</p>

            {/* Hidden message */}
            {showHiddenMessage && (
              <div className="bg-pink-50 border-2 border-pink-200 rounded-lg p-4 text-center animate-in slide-in-from-bottom duration-500">
                <p className="text-pink-700 font-medium text-lg">💕 {scene.hiddenMessage} 💕</p>
              </div>
            )}

            {/* Discovered messages */}
            {discoveredMessages.length > 0 && (
              <div className="space-y-2">
                <h3 className="text-pink-600 font-medium">Discovered Messages:</h3>
                {discoveredMessages.map((message, index) => (
                  <div key={index} className="bg-pink-50 border border-pink-200 rounded-lg p-3">
                    <p className="text-pink-700 text-sm">{message}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handlePrevScene}
                disabled={currentScene === 0}
                className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
              >
                <ArrowLeft className="mr-2" size={16} />
                Previous
              </Button>

              <div className="flex gap-2">
                {scenes.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full ${index === currentScene ? "bg-pink-500" : "bg-pink-200"}`}
                  />
                ))}
              </div>

              <Button onClick={handleNextScene} className="bg-pink-500 hover:bg-pink-600 text-white">
                {currentScene === scenes.length - 1 ? "Complete" : "Next"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
