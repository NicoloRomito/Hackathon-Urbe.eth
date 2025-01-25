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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <div
          key={nft.id}
          className="border rounded-lg overflow-hidden shadow-lg transition-transform duration-200 hover:scale-105"
        >
          <Image
            src={nft.image || "https://i0.wp.com/www.giacomocusano.com/wp-content/uploads/2016/07/coastal-wash-web.jpg?fit=1024%2C682&ssl=1"}
            alt={nft.title}
            width={200}
            height={200}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">{nft.title}</h3>
          </div>
        </div>
      ))}
    </div>
  )
}

