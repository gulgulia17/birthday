"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight, Heart, X, RotateCcw, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface PhotoGalleryProps {
  onBack: () => void
  onNavigate?: (scene: string) => void
  onRestart: () => void
}

// All 34 images in chronological order
const allPhotos = Array.from({ length: 34 }, (_, i) => ({
  id: i + 1,
  src: `/assets/images/${String(i + 1001).padStart(4, "0")}.jpg`,
  title: `Memory ${i + 1}`,
  description: `A beautiful moment from our journey together - Day ${i + 1}`,
}))

export default function PhotoGallery({ onBack, onNavigate, onRestart }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [viewedPhotos, setViewedPhotos] = useState<number[]>([0])

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allPhotos.length
    setCurrentIndex(nextIndex)
    if (!viewedPhotos.includes(nextIndex)) {
      setViewedPhotos([...viewedPhotos, nextIndex])
    }
  }

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? allPhotos.length - 1 : currentIndex - 1
    setCurrentIndex(prevIndex)
    if (!viewedPhotos.includes(prevIndex)) {
      setViewedPhotos([...viewedPhotos, prevIndex])
    }
  }

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index)
    if (!viewedPhotos.includes(index)) {
      setViewedPhotos([...viewedPhotos, index])
    }
  }

  const currentPhoto = allPhotos[currentIndex]

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Fullscreen modal */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 text-white hover:text-pink-300 z-10"
          >
            <X size={32} />
          </button>
          <img
            src={currentPhoto.src || "/placeholder.svg"}
            alt={currentPhoto.title}
            className="max-w-full max-h-full object-contain"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
            <p className="text-lg font-semibold">{currentPhoto.title}</p>
            <p className="text-sm opacity-80">{currentPhoto.description}</p>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={onBack} className="text-pink-600 hover:text-pink-700">
            <ArrowLeft className="mr-2" size={20} />
            Back
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-bold text-pink-700 font-serif">Our Journey Together</h1>
            <p className="text-pink-500">34 Beautiful Moments</p>
          </div>
          <div className="text-pink-600 font-medium">
            {currentIndex + 1} / {allPhotos.length}
          </div>
        </div>

        {/* Main photo display */}
        <Card className="mb-6 overflow-hidden bg-white/90 backdrop-blur-sm border-pink-200 shadow-xl">
          <div className="relative">
            <img
              src={currentPhoto.src || "/placeholder.svg"}
              alt={currentPhoto.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover cursor-pointer"
              onClick={() => setIsFullscreen(true)}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold font-serif">{currentPhoto.title}</h2>
              <p className="text-xs sm:text-sm opacity-90">{currentPhoto.description}</p>
            </div>
            <button
              onClick={() => setIsFullscreen(true)}
              className="absolute top-4 right-4 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full"
            >
              <Heart size={16} />
            </button>
          </div>
        </Card>

        {/* Navigation controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <Button
            onClick={handlePrev}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent w-full sm:w-auto"
          >
            <ArrowLeft className="mr-2" size={16} />
            Previous
          </Button>

          <div className="text-center">
            <p className="text-pink-600 text-sm mb-2">
              Viewed: {viewedPhotos.length} / {allPhotos.length}
            </p>
            <div className="flex gap-1 justify-center">
              {allPhotos.slice(0, Math.min(10, allPhotos.length)).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === currentIndex
                      ? "bg-pink-500"
                      : viewedPhotos.includes(index)
                        ? "bg-pink-300"
                        : "bg-pink-200"
                  }`}
                />
              ))}
              {allPhotos.length > 10 && <span className="text-pink-400 text-xs">...</span>}
            </div>
          </div>

          <Button onClick={handleNext} className="bg-pink-500 hover:bg-pink-600 text-white w-full sm:w-auto">
            Next
            <ArrowRight className="ml-2" size={16} />
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mb-6">
          <Button
            onClick={() => onNavigate && onNavigate("collage")}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent w-full sm:w-auto"
          >
            <Heart className="mr-2" size={16} />
            Memory Collage
          </Button>
          <Button
            onClick={() => onNavigate && onNavigate("search")}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent w-full sm:w-auto"
          >
            <Search className="mr-2" size={16} />
            Search Memories
          </Button>
          <Button
            onClick={onRestart}
            variant="outline"
            className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent w-full sm:w-auto"
          >
            <RotateCcw className="mr-2" size={16} />
            Replay Adventure
          </Button>
        </div>

        {/* Thumbnail grid */}
        <Card className="p-4 bg-white/90 backdrop-blur-sm border-pink-200">
          <h3 className="text-lg font-semibold text-pink-700 mb-4">All Our Memories</h3>
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2">
            {allPhotos.map((photo, index) => (
              <button
                key={photo.id}
                onClick={() => handleThumbnailClick(index)}
                className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                  index === currentIndex
                    ? "border-pink-500 scale-110"
                    : viewedPhotos.includes(index)
                      ? "border-pink-300"
                      : "border-pink-200 hover:border-pink-400"
                }`}
              >
                <img src={photo.src || "/placeholder.svg"} alt={photo.title} className="w-full h-full object-cover" />
                {viewedPhotos.includes(index) && (
                  <div className="absolute top-1 right-1">
                    <Heart className="text-pink-500 fill-current" size={10} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
