"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"

export function Search() {
  const [query, setQuery] = useState("")
  const router = useRouter()

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query) return

    try {
      const response = await fetch(`http://localhost:3002/search?address=${query}`)
      if (response.ok) {
        const data = await response.json()
        if (data.found) {
          router.push(`/profile/${query}`)
        } else {
          alert("No profile found for this wallet address.")
        }
      } else {
        throw new Error("Search failed")
      }
    } catch (error) {
      console.error("Error during search:", error)
      alert("An error occurred while searching. Please try again.")
    }
  }

  return (
    <div className="relative w-full max-w-lg">
      <form onSubmit={handleSearch} className="w-full">
        <div className="relative">
          <input
            type="text"
            className="w-full h-10 pl-10 pr-4 text-sm bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="Search by wallet address..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-4 text-sm text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

