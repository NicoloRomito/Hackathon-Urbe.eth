# UrbETH Hackaton

This is the repository for the UrbETH Hackaton project.

## Goals

We organize the work in order to acomplish the projects main goals:

- [X] Developed a smart contract based DApp
- [X] Used Solidity to implement the core functionality of the smart contract 
- [X] Deployed our first smart contract on Arbitrum Sepolia Testnet
- [X] Utilize ScaffoldETH as build tool for our project
- [X] Create a backend using Node and ExpressJS, Front End with NextJS
- [X] Organized work and directories around Layered Architecture
- [X] Front End organized around user requirements and delivering to deliver a positive experience
- [X] Used Prisma (ORM) to handle database queries   
- [ ] User/companies registration through the use of national services [Spid(Italy), ...]

## Contributors
- [Riccardo Leone](https://github.com/PapaLeoneIV)
- [Nicolo Romito](https://github.com/NicoloRomito)
- [Kadim Faye](https://github.com/korkosp)


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)



## Getting Started
```bash
git clone https://github.com/NicoloRomito/Hackathon-Urbe.eth
cd Hackathon-Urbe.eth
yarn install
yarn set version 3.2.3
yarn install --cwd ./hackathon/packages
npm --prefix /hackathon/packages/backend run dev
yarn start
```


## Know Problems (To be Fixed)

At the moment the backend is not correctly handling the database, and some queries might break the system.
I will fix them in the next weeks, atm i m still recovering from the Hackton.... See ya
