"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Heart, MapPin, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MemoryLaneProps {
  onComplete: () => void
  onBack: () => void
}

const memories = [
  {
    id: 1,
    title: "First Bike Ride Together",
    date: "A rainy evening in 2023",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "The rain couldn't dampen our spirits that day. Every drop felt like a blessing as we rode through the city, laughing and creating our first magical memory together.",
    location: "City Streets",
    emoji: "🌧️",
  },
  {
    id: 2,
    title: "Jaipur Adventure",
    date: "Summer 2023",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "Exploring the Pink City with my pink princess! Every corner of Jaipur seemed to reflect your beautiful personality. Hand in hand, we discovered not just the city, but more of each other.",
    location: "Jaipur, Rajasthan",
    emoji: "🏰",
  },
  {
    id: 3,
    title: "Cozy Café Moments",
    date: "Multiple occasions",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "From morning coffees to evening desserts, every meal shared with you became a celebration. Your laughter was sweeter than any dessert on the menu.",
    location: "Various Cafés",
    emoji: "☕",
  },
  {
    id: 4,
    title: "Reading Sessions Together",
    date: "Quiet afternoons",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "Sharing stories and dreams while you read your favorite books. Watching you get lost in different worlds while I got lost in watching you - pure magic.",
    location: "Our Cozy Corner",
    emoji: "📚",
  },
  {
    id: 5,
    title: "Dancing in the Rain",
    date: "Monsoon memories",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "When the music in your heart met the rhythm of the rain, we danced like nobody was watching. Those spontaneous moments are my favorite kind of magic.",
    location: "Under the Sky",
    emoji: "💃",
  },
  {
    id: 6,
    title: "Singing Together",
    date: "Musical moments",
    image: "/placeholder.svg?height=300&width=400",
    caption:
      "Your voice is my favorite melody. Whether humming softly or singing your heart out, every note you sing becomes a part of my favorite symphony.",
    location: "Everywhere",
    emoji: "🎤",
  },
]

export default function MemoryLane({ onComplete, onBack }: MemoryLaneProps) {
  const [currentMemory, setCurrentMemory] = useState(0)
  const [showCaption, setShowCaption] = useState(false)
  const [viewedMemories, setViewedMemories] = useState<number[]>([0])

  const handleNextMemory = () => {
    if (currentMemory < memories.length - 1) {
      const nextIndex = currentMemory + 1
      setCurrentMemory(nextIndex)
      setShowCaption(false)
      if (!viewedMemories.includes(nextIndex)) {
        setViewedMemories([...viewedMemories, nextIndex])
      }
    } else {
      onComplete()
    }
  }

  const handlePrevMemory = () => {
    if (currentMemory > 0) {
      setCurrentMemory(currentMemory - 1)
      setShowCaption(false)
    }
  }

  const handleImageClick = () => {
    setShowCaption(!showCaption)
  }

  const memory = memories[currentMemory]

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
            <div className="text-center">
              <h1 className="text-2xl font-bold text-pink-700 font-serif">Memory Lane</h1>
              <p className="text-pink-500 text-sm">Tap the photo to reveal the story</p>
            </div>
            <div className="text-pink-600 font-medium">
              {currentMemory + 1} / {memories.length}
            </div>
          </div>

          {/* Memory content */}
          <div className="space-y-6">
            {/* Memory header */}
            <div className="text-center space-y-2">
              <div className="text-4xl">{memory.emoji}</div>
              <h2 className="text-xl font-bold text-pink-700">{memory.title}</h2>
              <div className="flex items-center justify-center gap-4 text-pink-500 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{memory.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin size={14} />
                  <span>{memory.location}</span>
                </div>
              </div>
            </div>

            {/* Interactive photo */}
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <img
                src={memory.image || "/placeholder.svg"}
                alt={memory.title}
                className="w-full h-64 object-cover rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
              />

              {/* Sparkle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-pink-900/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Click hint */}
              <div className="absolute bottom-4 right-4 bg-pink-500 text-white p-2 rounded-full opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                <Heart size={16} />
              </div>
            </div>

            {/* Memory caption */}
            {showCaption && (
              <Card className="p-4 bg-pink-50 border-pink-200 animate-in slide-in-from-bottom duration-500">
                <p className="text-pink-700 leading-relaxed italic text-center">"{memory.caption}"</p>
              </Card>
            )}

            {/* Memory indicators */}
            <div className="flex justify-center gap-2">
              {memories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentMemory(index)
                    setShowCaption(false)
                    if (!viewedMemories.includes(index)) {
                      setViewedMemories([...viewedMemories, index])
                    }
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentMemory
                      ? "bg-pink-500 scale-125"
                      : viewedMemories.includes(index)
                        ? "bg-pink-300"
                        : "bg-pink-200"
                  }`}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={handlePrevMemory}
                disabled={currentMemory === 0}
                className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
              >
                <ArrowLeft className="mr-2" size={16} />
                Previous
              </Button>

              <div className="text-center">
                <p className="text-pink-600 text-sm">
                  Viewed: {viewedMemories.length} / {memories.length}
                </p>
              </div>

              <Button onClick={handleNextMemory} className="bg-pink-500 hover:bg-pink-600 text-white">
                {currentMemory === memories.length - 1 ? "Continue" : "Next"}
                <ArrowRight className="ml-2" size={16} />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
