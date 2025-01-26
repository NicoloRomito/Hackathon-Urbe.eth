"use client"

import { useState } from "react"
import Image from "next/image"

export interface NFT {
  id: string
  title: string
  image: string
  description?: string
  attributes?: Record<string, string>
}

interface NFTGridProps {
  nfts: NFT[]
  showMintButton?: boolean
  onMint?: (nftId: string) => void
}

export function NFTGrid({ nfts, showMintButton, onMint }: NFTGridProps) {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {nfts.map((nft) => (
          <div
            key={nft.id}
            onClick={() => setSelectedNFT(nft)}
            className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
          >
            <div className="aspect-square relative">
              <Image
                src={nft.image || "https://d1.awsstatic.com/certification/badges/AWS-Certified-AI-Practitioner_badge_300x300.85cea45137696692de99a72934f6ddb81f82fc12.png"}
                alt={nft.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm font-medium text-gray-900">{nft.title}</h3>
              {showMintButton && onMint && (
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    onMint(nft.id)
                  }}
                  className="mt-2 w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Mint NFT
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedNFT && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-lg w-full overflow-hidden shadow-xl">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">{selectedNFT.title}</h2>
                <button onClick={() => setSelectedNFT(null)} className="text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-square relative rounded-lg overflow-hidden mb-4">
                <Image
                  src={selectedNFT.image || "https://d1.awsstatic.com/certification/badges/AWS-Certified-AI-Practitioner_badge_300x300.85cea45137696692de99a72934f6ddb81f82fc12.png"}
                  alt={selectedNFT.title}
                  fill
                  className="object-cover"
                />
              </div>
              {selectedNFT.description && <p className="text-sm text-gray-500 mb-4">{selectedNFT.description}</p>}
              {selectedNFT.attributes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Attributes</h4>
                  <dl className="grid grid-cols-2 gap-4">
                    {Object.entries(selectedNFT.attributes).map(([key, value]) => (
                      <div key={key} className="bg-gray-50 px-4 py-2 rounded-md">
                        <dt className="text-xs text-gray-500">{key}</dt>
                        <dd className="text-sm font-medium text-gray-900">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

