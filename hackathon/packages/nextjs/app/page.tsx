"use client"

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10 bg-gradient-to-b from-blue-500 to-blue-700 min-h-screen">
        <div className="px-5 max-w-4xl mx-auto text-center">
          <h1 className="text-white">
            <span className="block text-6xl font-extrabold mb-4 leading-tight">Decentralized Verify</span>
            <span className="block text-2xl mb-8 font-light">La piattaforma per certificazioni NFT sicure e trasparenti</span>
          </h1>

          <h2 className="text-3xl font-semibold text-white mb-4">Esplora la potenza della blockchain</h2>
          <p className="text-white text-lg leading-relaxed mb-8">
            Connetti il tuo wallet, verifica la tua identità o emetti certificati digitali unici. **de-VY** è progettato per
            semplificare il mondo della certificazione digitale, garantendo sicurezza e autenticità per utenti e aziende.
          </p>

          {/* Featured Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[
              "https://frontends.udemycdn.com/frontends-marketplace-experience/staticx/udemy/images/v7/logo-udemy.svg",
              "https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://coursera.s3.amazonaws.com/media/coursera-rebrand-logo-square.png?auto=format%2Ccompress&dpr=1",
              "https://assets.intersystems.com/dims4/default/b4f6c99/2147483647/strip/false/crop/750x422+15+0/resize/1200x675!/quality/90/?url=http%3A%2F%2Finter-systems-brightspot.s3.amazonaws.com%2F26%2Fbd%2F6a6aa762425f87ad7d5c2fe65f8c%2Fawslogo-image.jpg"
            ].map((src, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-lg transform transition-transform hover:scale-105">
                <img
                  src={src}
                  alt={`Evidenza ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
                <p className="text-blue-500 text-sm font-semibold uppercase px-4 py-2">Certificati Unici</p>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-black mb-2">Esplora le nostre funzionalità</h3>
                  <p className="text-gray-600">
                    Da certificati verificati a NFT unici, scopri come puoi sfruttare **de-VY** per garantire trasparenza e sicurezza.
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-white text-lg leading-relaxed my-8 text-center">
            Che tu sia un utente in cerca di riconoscimenti verificati o un'azienda che desidera emettere certificati, il nostro
            ecosistema blockchain offre una soluzione affidabile, trasparente e user-friendly.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
