"use client"

import { useState } from "react"
import { Heart, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface MemoryCollageProps {
  onBack: () => void
}

// Create a collage using images not used in other components
const collageImages = [
  { src: "/assets/images/1003.jpg", title: "Sweet Moments", position: "top-left" },
  { src: "/assets/images/1006.jpg", title: "Laughter Together", position: "top-right" },
  { src: "/assets/images/1008.jpg", title: "Adventure Time", position: "center" },
  { src: "/assets/images/1011.jpg", title: "Quiet Moments", position: "bottom-left" },
  { src: "/assets/images/1013.jpg", title: "Celebrations", position: "bottom-right" },
  { src: "/assets/images/1016.jpg", title: "Exploring", position: "center-left" },
  { src: "/assets/images/1019.jpg", title: "Joy", position: "center-right" },
  { src: "/assets/images/1021.jpg", title: "Together", position: "top-center" },
  { src: "/assets/images/1023.jpg", title: "Happiness", position: "bottom-center" },
]

export default function MemoryCollage({ onBack }: MemoryCollageProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [hoveredImage, setHoveredImage] = useState<string | null>(null)

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-50 to-rose-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-pink-600 hover:text-pink-700">
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-pink-700 font-serif">Memory Collage</h1>
            <p className="text-pink-500">Beautiful moments captured in time</p>
          </div>
          <div className="w-20" /> {/* Spacer */}
        </div>

        {/* Collage Grid */}
        <div className="relative h-screen max-h-[600px] bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-2 border-pink-200 overflow-hidden">
          {collageImages.map((image, index) => (
            <div
              key={index}
              className={`absolute cursor-pointer transition-all duration-300 ${
                hoveredImage === image.src ? "z-20 scale-110" : "z-10"
              }`}
              style={{
                width: `${Math.random() * 200 + 150}px`,
                height: `${Math.random() * 200 + 150}px`,
                top: `${Math.random() * 60 + 10}%`,
                left: `${Math.random() * 70 + 10}%`,
                transform: `rotate(${Math.random() * 30 - 15}deg)`,
              }}
              onMouseEnter={() => setHoveredImage(image.src)}
              onMouseLeave={() => setHoveredImage(null)}
              onClick={() => setSelectedImage(image.src)}
            >
              <Card className="p-2 bg-white shadow-lg border-pink-200 hover:shadow-xl transition-shadow duration-300">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute -bottom-2 -right-2 bg-pink-500 text-white p-1 rounded-full">
                  <Heart size={12} />
                </div>
              </Card>
              {hoveredImage === image.src && (
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-pink-600 text-white px-2 py-1 rounded text-sm font-medium">
                  {image.title}
                </div>
              )}
            </div>
          ))}

          {/* Floating hearts */}
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="absolute text-pink-300 opacity-30 animate-pulse pointer-events-none"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              💕
            </div>
          ))}
        </div>

        {/* Selected image modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full">
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-pink-300 text-xl"
              >
                ✕
              </button>
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Selected memory"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-center mt-6">
          <p className="text-pink-600 text-sm">
            Hover over photos to see titles • Click to view full size • Each photo tells our story 💕
          </p>
        </div>
      </div>
    </div>
  )
}
