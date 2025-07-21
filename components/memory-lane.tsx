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
    title: "Our Beautiful Beginning",
    date: "The start of our journey",
    image: "/assets/images/1002.jpg",
    caption:
      "Every love story has a beginning, but ours felt like magic from the very first moment. Looking back at where we started fills my heart with so much joy.",
    location: "Where it all began",
    emoji: "💕",
  },
  {
    id: 2,
    title: "Growing Closer Every Day",
    date: "Early days together",
    image: "/assets/images/1005.jpg",
    caption:
      "Each day brought us closer, each moment more precious than the last. Watching our bond strengthen was like watching a beautiful flower bloom.",
    location: "In each other's hearts",
    emoji: "🌸",
  },
  {
    id: 3,
    title: "Adventures and Laughter",
    date: "Making memories",
    image: "/assets/images/1010.jpg",
    caption:
      "From spontaneous adventures to quiet moments of laughter, every experience with you became a treasured memory in the story of us.",
    location: "Everywhere together",
    emoji: "😄",
  },
  {
    id: 4,
    title: "Celebrating Special Moments",
    date: "Milestones together",
    image: "/assets/images/1018.jpg",
    caption:
      "Every celebration became more meaningful with you by my side. Your joy became my joy, your happiness my greatest treasure.",
    location: "Special occasions",
    emoji: "🎉",
  },
  {
    id: 5,
    title: "Quiet Intimate Moments",
    date: "Just the two of us",
    image: "/assets/images/1014.jpg",
    caption:
      "Sometimes the most beautiful moments are the quiet ones - just us, lost in conversation, lost in each other's eyes, lost in love.",
    location: "Our private world",
    emoji: "💫",
  },
  {
    id: 6,
    title: "Building Our Future",
    date: "Dreams coming true",
    image: "/assets/images/1031.jpg",
    caption:
      "With every passing day, we're not just making memories - we're building a future filled with love, dreams, and endless possibilities together.",
    location: "Towards tomorrow",
    emoji: "🌟",
  },
  {
    id: 7,
    title: "Recent Beautiful Moments",
    date: "Our latest chapter",
    image: "/assets/images/1034.jpg",
    caption:
      "Our most recent adventures remind me that our love story is still being written, and every new chapter is more beautiful than the last.",
    location: "Here and now",
    emoji: "✨",
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
                src={memory.image || "/assets/images/1005.jpg"}
                alt={memory.title}
                className="w-full h-64 object-fill rounded-lg shadow-lg transition-transform duration-300 group-hover:scale-105"
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
