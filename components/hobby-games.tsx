"use client"

import { useState } from "react"
import { ArrowLeft, Book, Music, Zap, Trophy, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HobbyGamesProps {
  onComplete: () => void
  onBack: () => void
}

const games = [
  {
    id: "reading",
    title: "Reading Puzzle",
    icon: Book,
    description: "Unscramble words related to your favorite books!",
    color: "from-pink-400 to-rose-400",
  },
  {
    id: "singing",
    title: "Musical Notes",
    icon: Music,
    description: "Tap the notes in rhythm to create a melody!",
    color: "from-rose-400 to-pink-500",
  },
  {
    id: "dancing",
    title: "Dance Moves",
    icon: Zap,
    description: "Follow the dance sequence and create magic!",
    color: "from-pink-500 to-rose-500",
  },
]

const readingWords = [
  { scrambled: "GNIDAER", answer: "READING", hint: "Your favorite hobby!" },
  { scrambled: "KOOB", answer: "BOOK", hint: "What you love to hold" },
  { scrambled: "YROTS", answer: "STORY", hint: "What captivates your mind" },
  { scrambled: "EGAP", answer: "PAGE", hint: "You turn these to continue" },
]

const musicalNotes = ["🎵", "🎶", "🎼", "🎤", "🎸", "🎹"]
const danceEmojis = ["💃", "🕺", "✨", "💫", "🌟", "💖"]

export default function HobbyGames({ onComplete, onBack }: HobbyGamesProps) {
  const [currentGame, setCurrentGame] = useState<string | null>(null)
  const [completedGames, setCompletedGames] = useState<string[]>([])
  const [gameScores, setGameScores] = useState<Record<string, number>>({})

  // Reading game state
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [userInput, setUserInput] = useState("")
  const [readingScore, setReadingScore] = useState(0)

  // Singing game state
  const [sequence, setSequence] = useState<string[]>([])
  const [userSequence, setUserSequence] = useState<string[]>([])
  const [showSequence, setShowSequence] = useState(false)
  const [singingScore, setSingingScore] = useState(0)

  // Dancing game state
  const [danceSequence, setDanceSequence] = useState<string[]>([])
  const [userDanceSequence, setUserDanceSequence] = useState<string[]>([])
  const [showDanceSequence, setShowDanceSequence] = useState(false)
  const [dancingScore, setDancingScore] = useState(0)

  const startGame = (gameId: string) => {
    setCurrentGame(gameId)

    if (gameId === "reading") {
      setCurrentWordIndex(0)
      setUserInput("")
      setReadingScore(0)
    } else if (gameId === "singing") {
      const newSequence = Array.from({ length: 4 }, () => musicalNotes[Math.floor(Math.random() * musicalNotes.length)])
      setSequence(newSequence)
      setUserSequence([])
      setSingingScore(0)
      showMusicalSequence(newSequence)
    } else if (gameId === "dancing") {
      const newSequence = Array.from({ length: 5 }, () => danceEmojis[Math.floor(Math.random() * danceEmojis.length)])
      setDanceSequence(newSequence)
      setUserDanceSequence([])
      setDancingScore(0)
      showDanceSequenceAnimation(newSequence)
    }
  }

  const showMusicalSequence = (seq: string[]) => {
    setShowSequence(true)
    setTimeout(() => setShowSequence(false), 2000)
  }

  const showDanceSequenceAnimation = (seq: string[]) => {
    setShowDanceSequence(true)
    setTimeout(() => setShowDanceSequence(false), 3000)
  }

  const handleReadingSubmit = () => {
    const currentWord = readingWords[currentWordIndex]
    if (userInput.toUpperCase() === currentWord.answer) {
      setReadingScore(readingScore + 1)
      if (currentWordIndex < readingWords.length - 1) {
        setCurrentWordIndex(currentWordIndex + 1)
        setUserInput("")
      } else {
        completeGame("reading", readingScore + 1)
      }
    } else {
      setUserInput("")
    }
  }

  const handleMusicalNote = (note: string) => {
    const newUserSequence = [...userSequence, note]
    setUserSequence(newUserSequence)

    if (newUserSequence.length === sequence.length) {
      const score = newUserSequence.filter((note, index) => note === sequence[index]).length
      setSingingScore(score)
      completeGame("singing", score)
    }
  }

  const handleDanceMove = (move: string) => {
    const newUserSequence = [...userDanceSequence, move]
    setUserDanceSequence(newUserSequence)

    if (newUserSequence.length === danceSequence.length) {
      const score = newUserSequence.filter((move, index) => move === danceSequence[index]).length
      setDancingScore(score)
      completeGame("dancing", score)
    }
  }

  const completeGame = (gameId: string, score: number) => {
    setCompletedGames([...completedGames, gameId])
    setGameScores({ ...gameScores, [gameId]: score })

    setTimeout(() => {
      setCurrentGame(null)
      if (completedGames.length === 2) {
        // Will be 3 after this completion
        onComplete()
      }
    }, 2000)
  }

  const renderGameContent = () => {
    if (!currentGame) return null

    switch (currentGame) {
      case "reading":
        const currentWord = readingWords[currentWordIndex]
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-700 mb-2">Unscramble the Word!</h3>
              <p className="text-pink-600 mb-4">Hint: {currentWord.hint}</p>
              <div className="text-3xl font-bold text-pink-800 mb-4 tracking-wider">{currentWord.scrambled}</div>
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value.toUpperCase())}
                className="border-2 border-pink-300 rounded-lg px-4 py-2 text-center text-lg font-semibold"
                placeholder="Your answer..."
              />
              <div className="mt-4">
                <Button onClick={handleReadingSubmit} className="bg-pink-500 hover:bg-pink-600">
                  Submit
                </Button>
              </div>
              <p className="text-pink-600 mt-2">
                Word {currentWordIndex + 1} of {readingWords.length}
              </p>
            </div>
          </div>
        )

      case "singing":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-700 mb-4">Musical Memory!</h3>
              {showSequence ? (
                <div className="text-center">
                  <p className="text-pink-600 mb-4">Remember this sequence:</p>
                  <div className="flex justify-center gap-2 text-4xl">
                    {sequence.map((note, index) => (
                      <span key={index} className="animate-pulse">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-pink-600 mb-4">Now tap the notes in the same order:</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                    {musicalNotes.map((note, index) => (
                      <button
                        key={index}
                        onClick={() => handleMusicalNote(note)}
                        className="text-4xl p-4 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors duration-200"
                      >
                        {note}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center gap-1">
                    {userSequence.map((note, index) => (
                      <span key={index} className="text-2xl">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case "dancing":
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-xl font-bold text-pink-700 mb-4">Dance Sequence!</h3>
              {showDanceSequence ? (
                <div className="text-center">
                  <p className="text-pink-600 mb-4">Watch and remember the dance moves:</p>
                  <div className="flex justify-center gap-2 text-4xl">
                    {danceSequence.map((move, index) => (
                      <span key={index} className="animate-bounce">
                        {move}
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-pink-600 mb-4">Now repeat the dance sequence:</p>
                  <div className="grid grid-cols-3 gap-4 max-w-xs mx-auto">
                    {danceEmojis.map((move, index) => (
                      <button
                        key={index}
                        onClick={() => handleDanceMove(move)}
                        className="text-4xl p-4 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors duration-200 hover:scale-110"
                      >
                        {move}
                      </button>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-center gap-1">
                    {userDanceSequence.map((move, index) => (
                      <span key={index} className="text-2xl">
                        {move}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  if (currentGame) {
    return (
      <div className="min-h-screen p-4 flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-white/95 backdrop-blur-sm border-pink-200 shadow-xl">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <Button
                variant="ghost"
                onClick={() => setCurrentGame(null)}
                className="text-pink-600 hover:text-pink-700"
              >
                <ArrowLeft className="mr-2" size={20} />
                Back to Games
              </Button>
            </div>
            {renderGameContent()}
          </div>
        </Card>
      </div>
    )
  }

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
              <h1 className="text-2xl font-bold text-pink-700 font-serif">Hobby Mini-Games</h1>
              <p className="text-pink-500 text-sm">Celebrating your favorite activities!</p>
            </div>
            <div className="text-pink-600 font-medium">
              {completedGames.length} / {games.length}
            </div>
          </div>

          {/* Games grid */}
          <div className="grid gap-6">
            {games.map((game) => {
              const Icon = game.icon
              const isCompleted = completedGames.includes(game.id)
              const score = gameScores[game.id]

              return (
                <Card
                  key={game.id}
                  className={`p-6 cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isCompleted ? "bg-green-50 border-green-200" : "bg-white border-pink-200 hover:border-pink-300"
                  }`}
                  onClick={() => !isCompleted && startGame(game.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-full bg-gradient-to-r ${game.color} text-white`}>
                        <Icon size={24} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-pink-700">{game.title}</h3>
                        <p className="text-pink-600 text-sm">{game.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {isCompleted ? (
                        <div className="flex items-center gap-2">
                          <Trophy className="text-yellow-500" size={20} />
                          <span className="text-green-600 font-semibold">Score: {score}</span>
                        </div>
                      ) : (
                        <Button
                          variant="outline"
                          className="border-pink-300 text-pink-600 hover:bg-pink-50 bg-transparent"
                        >
                          Play
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Continue button */}
          {completedGames.length === games.length && (
            <div className="text-center mt-6">
              <Button onClick={onComplete} className="bg-pink-500 hover:bg-pink-600 text-white px-8 py-3">
                <Heart className="mr-2" size={20} />
                Continue to Surprise!
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}
