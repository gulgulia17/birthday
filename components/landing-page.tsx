"use client"

import { useState, useEffect } from "react"
import { Heart, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const [showContent, setShowContent] = useState(false)
  const [petals, setPetals] = useState<Array<{ id: number; left: number; delay: number }>>([])

  useEffect(() => {
    // Fade in content
    const timer = setTimeout(() => setShowContent(true), 500)

    // Create floating petals
    const petalArray = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 8,
    }))
    setPetals(petalArray)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Floating petals background */}
      <div className="floating-petals">
        {petals.map((petal) => (
          <div
            key={petal.id}
            className="petal"
            style={{
              left: `${petal.left}%`,
              animationDelay: `${petal.delay}s`,
            }}
          />
        ))}
      </div>

      <Card
        className={`max-w-md w-full bg-white/90 backdrop-blur-sm border-pink-200 shadow-2xl transition-all duration-1000 ${showContent ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
      >
        <div className="p-8 text-center space-y-6">
          {/* Animated heart logo */}
          <div className="relative">
            <div className="heartbeat-animation text-6xl mb-4">💖</div>
            <div className="absolute -top-2 -right-2 sparkle-animation">
              <Sparkles className="text-pink-400" size={20} />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-pink-600 font-serif">Mitali's Magical</h1>
            <h2 className="text-4xl font-bold text-pink-700 font-serif">23rd Birthday</h2>
            <div className="flex items-center justify-center gap-2 text-pink-500">
              <Heart size={16} className="heartbeat-animation" />
              <span className="text-lg font-medium">July 22, 2002</span>
              <Heart size={16} className="heartbeat-animation" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-pink-600 text-lg font-medium italic">A journey through love & memories</p>

          {/* Start button */}
          <Button
            onClick={onStart}
            className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-200"
            size="lg"
          >
            <Play className="mr-2" size={20} />
            Begin Your Adventure
          </Button>

          {/* Decorative elements */}
          <div className="flex justify-center gap-4 text-pink-300 mt-6">
            <div className="sparkle-animation">✨</div>
            <div className="sparkle-animation" style={{ animationDelay: "0.5s" }}>
              💕
            </div>
            <div className="sparkle-animation" style={{ animationDelay: "1s" }}>
              🌸
            </div>
            <div className="sparkle-animation" style={{ animationDelay: "1.5s" }}>
              💕
            </div>
            <div className="sparkle-animation" style={{ animationDelay: "2s" }}>
              ✨
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
