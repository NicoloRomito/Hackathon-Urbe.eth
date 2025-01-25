import Image from "next/image"

export interface NFT {
  id: string
  title: string
  image: string
}

interface NFTGridProps {
  nfts: NFT[]
}

export function NFTGrid({ nfts }: NFTGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {nfts.map((nft) => (
        <div
          key={nft.id}
          className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 ease-in-out"
        >
          <div className="relative w-full pt-[75%]">
            <Image
              src={nft.image || "https://i0.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1"}
              alt={nft.title}
              fill
              className="absolute top-0 left-0 w-full h-full object-cover rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-700 truncate">{nft.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}