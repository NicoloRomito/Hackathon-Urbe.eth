import { createConfig, http } from 'wagmi'

import {localhost } from 'wagmi/chains'

const config = createConfig({
  chains: [localhost],
  transports: {
    [localhost.id]: http('http://localhost:8545'),
  },
})

export default config