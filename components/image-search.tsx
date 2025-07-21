"use client"

import { useState, useMemo } from "react"
import { Search, Calendar, MapPin, Tag, ArrowLeft, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ImageSearchProps {
  onBack: () => void
}

// Enhanced image data with metadata for searching
const imageDatabase = [
  {
    id: 1001,
    src: "/assets/images/1001.jpg",
    title: "Our First Adventure",
    date: "2023-01-15",
    location: "City Streets",
    memoryType: "adventure",
    tags: ["rain", "bike", "romantic", "first"],
    description: "The beginning of our beautiful journey together",
    season: "winter",
    mood: "romantic",
  },
  {
    id: 1002,
    src: "/assets/images/1002.jpg",
    title: "Getting to Know Each Other",
    date: "2023-01-22",
    location: "Cozy Café",
    memoryType: "date",
    tags: ["coffee", "conversation", "bonding", "early"],
    description: "Deep conversations over warm coffee",
    season: "winter",
    mood: "intimate",
  },
  {
    id: 1003,
    src: "/assets/images/1003.jpg",
    title: "Laughter and Joy",
    date: "2023-02-05",
    location: "Park",
    memoryType: "fun",
    tags: ["laughter", "happiness", "playful", "joy"],
    description: "Moments of pure happiness and laughter",
    season: "winter",
    mood: "joyful",
  },
  {
    id: 1004,
    src: "/assets/images/1004.jpg",
    title: "Quiet Moments",
    date: "2023-02-14",
    location: "Home",
    memoryType: "intimate",
    tags: ["valentine", "quiet", "peaceful", "love"],
    description: "Valentine's Day spent in peaceful togetherness",
    season: "winter",
    mood: "peaceful",
  },
  {
    id: 1005,
    src: "/assets/images/1005.jpg",
    title: "Growing Closer",
    date: "2023-02-28",
    location: "Garden",
    memoryType: "bonding",
    tags: ["flowers", "spring", "growth", "connection"],
    description: "Our bond growing stronger like spring flowers",
    season: "spring",
    mood: "hopeful",
  },
  {
    id: 1006,
    src: "/assets/images/1006.jpg",
    title: "Adventure Seekers",
    date: "2023-03-15",
    location: "Mountains",
    memoryType: "adventure",
    tags: ["hiking", "nature", "exploration", "together"],
    description: "Exploring new heights together",
    season: "spring",
    mood: "adventurous",
  },
  {
    id: 1007,
    src: "/assets/images/1007.jpg",
    title: "City Exploration",
    date: "2023-03-28",
    location: "Downtown",
    memoryType: "exploration",
    tags: ["city", "walking", "discovery", "urban"],
    description: "Discovering the city hand in hand",
    season: "spring",
    mood: "curious",
  },
  {
    id: 1008,
    src: "/assets/images/1008.jpg",
    title: "Food Adventures",
    date: "2023-04-10",
    location: "Restaurant",
    memoryType: "date",
    tags: ["food", "dining", "taste", "sharing"],
    description: "Sharing delicious meals and stories",
    season: "spring",
    mood: "satisfied",
  },
  {
    id: 1009,
    src: "/assets/images/1009.jpg",
    title: "Springtime Bliss",
    date: "2023-04-25",
    location: "Botanical Garden",
    memoryType: "nature",
    tags: ["flowers", "bloom", "beauty", "serenity"],
    description: "Surrounded by spring's beauty",
    season: "spring",
    mood: "serene",
  },
  {
    id: 1010,
    src: "/assets/images/1010.jpg",
    title: "Milestone Moment",
    date: "2023-05-12",
    location: "Special Place",
    memoryType: "milestone",
    tags: ["important", "special", "memory", "significant"],
    description: "A moment that changed everything",
    season: "spring",
    mood: "significant",
  },
  {
    id: 1011,
    src: "/assets/images/1011.jpg",
    title: "Summer Begins",
    date: "2023-06-01",
    location: "Beach",
    memoryType: "seasonal",
    tags: ["summer", "sun", "warmth", "beginning"],
    description: "Welcoming summer together",
    season: "summer",
    mood: "warm",
  },
  {
    id: 1012,
    src: "/assets/images/1012.jpg",
    title: "Reading Together",
    date: "2023-06-15",
    location: "Library",
    memoryType: "hobby",
    tags: ["books", "reading", "knowledge", "quiet"],
    description: "Sharing our love for books",
    season: "summer",
    mood: "intellectual",
  },
  {
    id: 1013,
    src: "/assets/images/1013.jpg",
    title: "Celebration Time",
    date: "2023-06-30",
    location: "Party Venue",
    memoryType: "celebration",
    tags: ["party", "friends", "celebration", "joy"],
    description: "Celebrating life's beautiful moments",
    season: "summer",
    mood: "celebratory",
  },
  {
    id: 1014,
    src: "/assets/images/1014.jpg",
    title: "Musical Moments",
    date: "2023-07-08",
    location: "Concert Hall",
    memoryType: "hobby",
    tags: ["music", "singing", "melody", "harmony"],
    description: "Lost in beautiful melodies together",
    season: "summer",
    mood: "melodic",
  },
  {
    id: 1015,
    src: "/assets/images/1015.jpg",
    title: "Jaipur Adventure",
    date: "2023-07-22",
    location: "Jaipur",
    memoryType: "travel",
    tags: ["jaipur", "pink city", "travel", "exploration"],
    description: "Exploring the Pink City on your birthday",
    season: "summer",
    mood: "adventurous",
  },
  {
    id: 1016,
    src: "/assets/images/1016.jpg",
    title: "Palace Wonders",
    date: "2023-07-23",
    location: "Jaipur Palace",
    memoryType: "travel",
    tags: ["palace", "architecture", "history", "royal"],
    description: "Feeling like royalty in Jaipur",
    season: "summer",
    mood: "majestic",
  },
  {
    id: 1017,
    src: "/assets/images/1017.jpg",
    title: "Street Food Delights",
    date: "2023-07-24",
    location: "Jaipur Streets",
    memoryType: "food",
    tags: ["street food", "local", "flavors", "culture"],
    description: "Tasting the authentic flavors of Rajasthan",
    season: "summer",
    mood: "flavorful",
  },
  {
    id: 1018,
    src: "/assets/images/1018.jpg",
    title: "Dancing Hearts",
    date: "2023-08-05",
    location: "Dance Studio",
    memoryType: "hobby",
    tags: ["dancing", "rhythm", "movement", "expression"],
    description: "Dancing to the rhythm of our hearts",
    season: "summer",
    mood: "rhythmic",
  },
  {
    id: 1019,
    src: "/assets/images/1019.jpg",
    title: "Monsoon Magic",
    date: "2023-08-20",
    location: "Rainy Streets",
    memoryType: "weather",
    tags: ["monsoon", "rain", "magic", "romance"],
    description: "Finding magic in monsoon showers",
    season: "monsoon",
    mood: "magical",
  },
  {
    id: 1020,
    src: "/assets/images/1020.jpg",
    title: "Cozy Evenings",
    date: "2023-09-02",
    location: "Home",
    memoryType: "intimate",
    tags: ["cozy", "evening", "comfort", "togetherness"],
    description: "Perfect evenings spent together",
    season: "monsoon",
    mood: "cozy",
  },
  {
    id: 1021,
    src: "/assets/images/1021.jpg",
    title: "Festival of Lights",
    date: "2023-09-18",
    location: "Festival Grounds",
    memoryType: "festival",
    tags: ["festival", "lights", "celebration", "tradition"],
    description: "Celebrating festivals together",
    season: "autumn",
    mood: "festive",
  },
  {
    id: 1022,
    src: "/assets/images/1022.jpg",
    title: "Autumn Walks",
    date: "2023-10-05",
    location: "Park",
    memoryType: "nature",
    tags: ["autumn", "leaves", "walk", "peaceful"],
    description: "Peaceful walks among autumn leaves",
    season: "autumn",
    mood: "peaceful",
  },
  {
    id: 1023,
    src: "/assets/images/1023.jpg",
    title: "Creative Moments",
    date: "2023-10-20",
    location: "Art Gallery",
    memoryType: "culture",
    tags: ["art", "creativity", "inspiration", "beauty"],
    description: "Finding inspiration in art together",
    season: "autumn",
    mood: "inspired",
  },
  {
    id: 1024,
    src: "/assets/images/1024.jpg",
    title: "Diwali Celebrations",
    date: "2023-11-05",
    location: "Home",
    memoryType: "festival",
    tags: ["diwali", "lights", "sweets", "family"],
    description: "Celebrating the festival of lights",
    season: "autumn",
    mood: "luminous",
  },
  {
    id: 1025,
    src: "/assets/images/1025.jpg",
    title: "Café Chronicles",
    date: "2023-11-18",
    location: "Favorite Café",
    memoryType: "date",
    tags: ["café", "coffee", "conversation", "regular"],
    description: "Our regular spot for heart-to-heart talks",
    season: "autumn",
    mood: "conversational",
  },
  {
    id: 1026,
    src: "/assets/images/1026.jpg",
    title: "Winter Preparations",
    date: "2023-12-01",
    location: "Shopping Mall",
    memoryType: "shopping",
    tags: ["winter", "shopping", "preparation", "together"],
    description: "Getting ready for winter together",
    season: "winter",
    mood: "preparatory",
  },
  {
    id: 1027,
    src: "/assets/images/1027.jpg",
    title: "Holiday Spirit",
    date: "2023-12-15",
    location: "Christmas Market",
    memoryType: "holiday",
    tags: ["christmas", "holiday", "spirit", "joy"],
    description: "Embracing the holiday spirit",
    season: "winter",
    mood: "festive",
  },
  {
    id: 1028,
    src: "/assets/images/1028.jpg",
    title: "New Year Dreams",
    date: "2023-12-31",
    location: "Celebration Venue",
    memoryType: "milestone",
    tags: ["new year", "dreams", "future", "hopes"],
    description: "Welcoming new dreams together",
    season: "winter",
    mood: "hopeful",
  },
  {
    id: 1029,
    src: "/assets/images/1029.jpg",
    title: "Fresh Beginnings",
    date: "2024-01-10",
    location: "Garden",
    memoryType: "renewal",
    tags: ["new year", "fresh", "beginning", "growth"],
    description: "Starting the new year with fresh hopes",
    season: "winter",
    mood: "fresh",
  },
  {
    id: 1030,
    src: "/assets/images/1030.jpg",
    title: "Love Grows Stronger",
    date: "2024-02-14",
    location: "Romantic Restaurant",
    memoryType: "romantic",
    tags: ["valentine", "love", "stronger", "commitment"],
    description: "Our love growing stronger each day",
    season: "winter",
    mood: "loving",
  },
  {
    id: 1031,
    src: "/assets/images/1031.jpg",
    title: "Spring Returns",
    date: "2024-03-05",
    location: "Flower Garden",
    memoryType: "seasonal",
    tags: ["spring", "flowers", "renewal", "bloom"],
    description: "Spring returns with new possibilities",
    season: "spring",
    mood: "renewed",
  },
  {
    id: 1032,
    src: "/assets/images/1032.jpg",
    title: "Adventure Continues",
    date: "2024-04-12",
    location: "New City",
    memoryType: "adventure",
    tags: ["adventure", "new", "exploration", "journey"],
    description: "Our adventure story continues",
    season: "spring",
    mood: "adventurous",
  },
  {
    id: 1033,
    src: "/assets/images/1033.jpg",
    title: "Building Dreams",
    date: "2024-05-20",
    location: "Future Home",
    memoryType: "future",
    tags: ["dreams", "future", "building", "together"],
    description: "Building our dreams together",
    season: "spring",
    mood: "ambitious",
  },
  {
    id: 1034,
    src: "/assets/images/1034.jpg",
    title: "Present Moment",
    date: "2024-07-15",
    location: "Here and Now",
    memoryType: "present",
    tags: ["present", "now", "current", "today"],
    description: "Living in this beautiful present moment",
    season: "summer",
    mood: "present",
  },
]

const memoryTypes = [
  { value: "all", label: "All Memories", icon: "💕" },
  { value: "adventure", label: "Adventures", icon: "🚲" },
  { value: "date", label: "Dates", icon: "☕" },
  { value: "romantic", label: "Romantic", icon: "💖" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "hobby", label: "Hobbies", icon: "📚" },
  { value: "celebration", label: "Celebrations", icon: "🎉" },
  { value: "intimate", label: "Intimate", icon: "🌙" },
  { value: "nature", label: "Nature", icon: "🌸" },
  { value: "food", label: "Food", icon: "🍰" },
  { value: "festival", label: "Festivals", icon: "🪔" },
  { value: "milestone", label: "Milestones", icon: "⭐" },
]

const seasons = [
  { value: "all", label: "All Seasons" },
  { value: "spring", label: "Spring" },
  { value: "summer", label: "Summer" },
  { value: "monsoon", label: "Monsoon" },
  { value: "autumn", label: "Autumn" },
  { value: "winter", label: "Winter" },
]

const moods = [
  { value: "all", label: "All Moods" },
  { value: "romantic", label: "Romantic" },
  { value: "joyful", label: "Joyful" },
  { value: "peaceful", label: "Peaceful" },
  { value: "adventurous", label: "Adventurous" },
  { value: "festive", label: "Festive" },
  { value: "intimate", label: "Intimate" },
]

export default function ImageSearch({ onBack }: ImageSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedMemoryType, setSelectedMemoryType] = useState("all")
  const [selectedSeason, setSelectedSeason] = useState("all")
  const [selectedMood, setSelectedMood] = useState("all")
  const [dateRange, setDateRange] = useState({ start: "", end: "" })
  const [selectedImage, setSelectedImage] = useState<(typeof imageDatabase)[0] | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  const filteredImages = useMemo(() => {
    return imageDatabase.filter((image) => {
      // Text search
      const matchesSearch =
        searchQuery === "" ||
        image.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        image.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

      // Memory type filter
      const matchesMemoryType = selectedMemoryType === "all" || image.memoryType === selectedMemoryType

      // Season filter
      const matchesSeason = selectedSeason === "all" || image.season === selectedSeason

      // Mood filter
      const matchesMood = selectedMood === "all" || image.mood === selectedMood

      // Date range filter
      const matchesDateRange =
        (!dateRange.start || image.date >= dateRange.start) && (!dateRange.end || image.date <= dateRange.end)

      return matchesSearch && matchesMemoryType && matchesSeason && matchesMood && matchesDateRange
    })
  }, [searchQuery, selectedMemoryType, selectedSeason, selectedMood, dateRange])

  const clearFilters = () => {
    setSearchQuery("")
    setSelectedMemoryType("all")
    setSelectedSeason("all")
    setSelectedMood("all")
    setDateRange({ start: "", end: "" })
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-pink-50 to-rose-100">
      {/* Selected image modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-white rounded-lg overflow-hidden">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 z-10 bg-pink-500 hover:bg-pink-600 text-white p-2 rounded-full"
            >
              <X size={20} />
            </button>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-2/3">
                <img
                  src={selectedImage.src || "/placeholder.svg"}
                  alt={selectedImage.title}
                  className="w-full h-64 md:h-96 object-cover"
                />
              </div>
              <div className="md:w-1/3 p-6 space-y-4">
                <h3 className="text-2xl font-bold text-pink-700 font-serif">{selectedImage.title}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-pink-600">
                    <Calendar size={16} />
                    <span>{formatDate(selectedImage.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-600">
                    <MapPin size={16} />
                    <span>{selectedImage.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-pink-600">
                    <Tag size={16} />
                    <span className="capitalize">{selectedImage.memoryType}</span>
                  </div>
                </div>
                <p className="text-pink-700 italic">{selectedImage.description}</p>
                <div className="flex flex-wrap gap-1">
                  {selectedImage.tags.map((tag, index) => (
                    <span key={index} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-pink-600">
                  <span className="capitalize">🌸 {selectedImage.season}</span>
                  <span className="capitalize">💫 {selectedImage.mood}</span>
                </div>
              </div>
            </div>
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
            <h1 className="text-3xl font-bold text-pink-700 font-serif">Memory Search</h1>
            <p className="text-pink-500">Find your favorite moments</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => setShowFilters(!showFilters)}
            className="text-pink-600 hover:text-pink-700"
          >
            <Filter className="mr-2" size={20} />
            Filters
          </Button>
        </div>

        {/* Search Bar */}
        <Card className="p-4 mb-6 bg-white/90 backdrop-blur-sm border-pink-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-400" size={20} />
            <Input
              type="text"
              placeholder="Search memories, locations, tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-pink-300 focus:border-pink-500"
            />
          </div>
        </Card>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="p-6 mb-6 bg-white/90 backdrop-blur-sm border-pink-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-pink-700">Filters</h3>
              <Button variant="ghost" onClick={clearFilters} className="text-pink-600 hover:text-pink-700 text-sm">
                Clear All
              </Button>
            </div>

            {/* Memory Type Filter */}
            <div>
              <label className="block text-sm font-medium text-pink-700 mb-2">Memory Type</label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {memoryTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setSelectedMemoryType(type.value)}
                    className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                      selectedMemoryType === type.value
                        ? "bg-pink-500 text-white"
                        : "bg-pink-100 text-pink-700 hover:bg-pink-200"
                    }`}
                  >
                    <div>{type.icon}</div>
                    <div>{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date Range Filter */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">From Date</label>
                <Input
                  type="date"
                  value={dateRange.start}
                  onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                  className="border-pink-300 focus:border-pink-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">To Date</label>
                <Input
                  type="date"
                  value={dateRange.end}
                  onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                  className="border-pink-300 focus:border-pink-500"
                />
              </div>
            </div>

            {/* Season and Mood Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">Season</label>
                <select
                  value={selectedSeason}
                  onChange={(e) => setSelectedSeason(e.target.value)}
                  className="w-full p-2 border border-pink-300 rounded-lg focus:border-pink-500"
                >
                  {seasons.map((season) => (
                    <option key={season.value} value={season.value}>
                      {season.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-pink-700 mb-2">Mood</label>
                <select
                  value={selectedMood}
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="w-full p-2 border border-pink-300 rounded-lg focus:border-pink-500"
                >
                  {moods.map((mood) => (
                    <option key={mood.value} value={mood.value}>
                      {mood.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        )}

        {/* Results Summary */}
        <div className="mb-4 text-center">
          <p className="text-pink-600">
            Found <span className="font-semibold text-pink-700">{filteredImages.length}</span> memories
            {searchQuery && (
              <span>
                {" "}
                matching "<span className="font-semibold">{searchQuery}</span>"
              </span>
            )}
          </p>
        </div>

        {/* Results Grid */}
        {filteredImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <Card
                key={image.id}
                className="overflow-hidden bg-white/90 backdrop-blur-sm border-pink-200 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative">
                  <img src={image.src || "/placeholder.svg"} alt={image.title} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-pink-500 text-white px-2 py-1 rounded-full text-xs">
                    {memoryTypes.find((t) => t.value === image.memoryType)?.icon}
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-semibold text-pink-700">{image.title}</h3>
                  <div className="flex items-center gap-2 text-sm text-pink-600">
                    <Calendar size={14} />
                    <span>{formatDate(image.date)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-pink-600">
                    <MapPin size={14} />
                    <span>{image.location}</span>
                  </div>
                  <p className="text-sm text-pink-700 line-clamp-2">{image.description}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {image.tags.slice(0, 3).map((tag, index) => (
                      <span key={index} className="bg-pink-100 text-pink-700 px-2 py-1 rounded-full text-xs">
                        #{tag}
                      </span>
                    ))}
                    {image.tags.length > 3 && (
                      <span className="text-pink-500 text-xs">+{image.tags.length - 3} more</span>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-white/90 backdrop-blur-sm border-pink-200">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-pink-700 mb-2">No memories found</h3>
            <p className="text-pink-600 mb-4">Try adjusting your search criteria or filters</p>
            <Button onClick={clearFilters} className="bg-pink-500 hover:bg-pink-600 text-white">
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  )
}
