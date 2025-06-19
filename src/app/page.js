'use client'

import { useEffect, useState } from "react"
import { client } from "@/lib/sanityClient"
import { Card } from "@/components/ui/card"
import { CardContent } from "@/components/ui/cardContent"
import { Button } from "@/components/ui/button"
import { Twitch, Youtube, Music2, Instagram } from "lucide-react"

export default function KeqingSite() {
  const [heroImage, setHeroImage] = useState("")
  const [aboutMe, setAboutMe] = useState("")
  const [streamSchedule, setStreamSchedule] = useState([])
  const [hallOfFame, setHallOfFame] = useState([])
  const [tournaments, setTournaments] = useState([])

  useEffect(() => {
    client.fetch(`*[_type == "heroBanner"][0]`).then(data =>
      setHeroImage(data?.image?.asset?.url || "")
    )
    client.fetch(`*[_type == "aboutMe"][0]`).then(data =>
      setAboutMe(data?.text || "")
    )
    client.fetch(`*[_type == "streamSchedule"][0]`).then(data =>
      setStreamSchedule(data?.days || [])
    )
    client.fetch(`*[_type == "hallOfFame"] | order(season desc)`).then(setHallOfFame)
    client.fetch(`*[_type == "tournament"] | order(date desc)`).then(setTournaments)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1f0036] via-black to-[#3b0066] text-white px-4 md:px-12 py-10 space-y-20 font-sans animate-fade-in overflow-x-hidden">

      {/* Hero */}
      <section className="text-center space-y-6 animate-jump-in">
        <h1 className="text-7xl md:text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-yellow-400 to-red-600 drop-shadow-[0_0_20px_#fff]">
          KEQING <span className="text-white">/</span> <span className="text-yellow-300">LEVITATE</span>
        </h1>
        <p className="text-2xl md:text-3xl text-purple-200 italic drop-shadow-lg">One goal. Be the best TFT player in the world.</p>

        <div className="flex justify-center space-x-6 mt-4 text-2xl">
          <a href="https://twitch.tv/keqing" target="_blank" className="hover:scale-110 transition text-fuchsia-400">
            <Twitch className="inline mr-2 animate-pulse" /> Twitch
          </a>
          <a href="https://youtube.com/@keqing" target="_blank" className="hover:scale-110 transition text-red-400">
            <Youtube className="inline mr-2 animate-pulse" /> YouTube
          </a>
          <a href="https://tiktok.com/@keqing" target="_blank" className="hover:scale-110 transition text-pink-300">
            <Music2 className="inline mr-2 animate-pulse" /> TikTok
          </a>
          <a href="https://instagram.com/keqing" target="_blank" className="hover:scale-110 transition text-pink-500">
            <Instagram className="inline mr-2 animate-pulse" /> IG
          </a>
        </div>

        <div className="mt-8 flex justify-center">
          <img
            src={heroImage || "/placeholder-hero-keqing.png"}
            alt="Keqing Banner"
            width={1000}
            height={300}
            className="rounded-3xl shadow-[0_0_50px_#e879f9] border-4 border-pink-600 hover:rotate-1 hover:scale-105 transition"
          />
        </div>
      </section>

      {/* Slide Banner */}
      <section>
        <div className="w-full overflow-hidden whitespace-nowrap bg-black py-4 text-center text-pink-300 text-2xl font-extrabold animate-pulse">
          Live. Grind. Repeat. • Levitate is climbing • Challenger or bust • Watch live • 🎯🔥🎮
        </div>
      </section>

      {/* About & Schedule */}
      <section className="grid md:grid-cols-2 gap-10">
        <Card className="bg-[#ff00ff11] border border-pink-500 backdrop-blur-xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold text-yellow-200 mb-4">About Me</h2>
            <p className="text-lg leading-relaxed text-purple-100">{aboutMe}</p>
          </CardContent>
        </Card>
        <Card className="bg-[#ff00ff11] border border-pink-500 backdrop-blur-xl shadow-lg">
          <CardContent className="p-8">
            <h2 className="text-4xl font-bold text-yellow-200 mb-4">Stream Schedule</h2>
            <ul className="list-disc list-inside text-pink-100 text-lg space-y-2">
              {streamSchedule.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Hall of Fame */}
      <section>
        <h2 className="text-5xl font-black text-center text-pink-400 mb-10 drop-shadow-xl">🏆 Hall of Fame</h2>
        <div className="grid md:grid-cols-3 gap-10">
          {hallOfFame.map(({ season, rank, highlight, img }, index) => (
            <Card key={index} className="bg-black bg-opacity-70 border-pink-400 hover:scale-105 transition-transform shadow-xl">
              <CardContent className="p-5 space-y-4">
                <img
                  src={img?.asset?.url || '/placeholder-rank.png'}
                  alt={`TFT Rank - ${season}`}
                  className="rounded-xl border border-pink-300 shadow-md w-full"
                />
                <h3 className="text-2xl font-bold text-yellow-300 text-center">{season}</h3>
                <p className="text-lg text-fuchsia-200 text-center">Rank: {rank}</p>
                <p className="text-green-300 italic text-center">{highlight}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Tournament Results */}
      <section>
        <h2 className="text-5xl font-black text-center text-yellow-300 mb-10 drop-shadow-xl">🎯 Tournament Results</h2>
        <div className="space-y-4">
          {tournaments.map(({ name, date, placement }, index) => (
            <Card key={index} className="bg-gradient-to-br from-purple-900 via-black to-purple-700 border-l-4 border-yellow-400">
              <CardContent className="p-6 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-pink-300">{name}</h3>
                  <p className="text-gray-400 text-sm">{date}</p>
                </div>
                <p className="text-green-400 text-lg font-semibold">{placement}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center pt-24 pb-12">
        <h2 className="text-5xl font-black text-fuchsia-300 mb-6 animate-bounce">💥 Become Part of the Journey</h2>
        <p className="text-lg text-white mb-8 max-w-3xl mx-auto">
          Whether you’re watching, learning, or just vibing — this stream is where hype, skill, and chaos collide.
        </p>
        <Button className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-600 text-black px-10 py-5 text-xl rounded-full shadow-2xl hover:scale-105">
          <a href="https://twitch.tv/keqing" target="_blank" rel="noopener noreferrer">
            🚀 Watch Me Live on Twitch
          </a>
        </Button>
      </section>
    </div>
  )
}
