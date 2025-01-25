"use client"

import { useState } from 'react'
import { UserInfo, CompanyInfo } from './types'

type SearchResult = UserInfo | CompanyInfo | null

export function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<SearchResult>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!searchTerm.trim()) return

    try {
      const response = await fetch(`/api/search?address=${searchTerm}`)
      
      if (!response.ok) {
        throw new Error('Search failed')
      }

      const data = await response.json()
      setSearchResults(data)
      setError(null)
    } catch (err) {
      setError('Unable to fetch search results')
      setSearchResults(null)
    }
  }

  return (
    <div className="search-container">
      <div className="flex">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by wallet address"
          className="flex-grow p-2 border rounded-l-md"
        />
        <button 
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}

      {searchResults && (
        <div className="search-results mt-4 p-4 border rounded">
          {searchResults.codiceFiscale ? (
            <div>
              <h3 className="font-bold">User Details</h3>
              <p>Name: {searchResults.name} {searchResults.lastName}</p>
              <p>Email: {searchResults.email}</p>
              <p>Codice Fiscale: {searchResults.codiceFiscale}</p>
            </div>
          ) : (
            <div>
              <h3 className="font-bold">Enterprise Details</h3>
              <p>Name: {searchResults.name}</p>
              <p>Partita IVA: {searchResults.pIva}</p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}