"use client";
import { NextPage } from "next";
import { handleMint } from "./config";

const Home: NextPage = () => {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <button onClick={handleMint}>
        Transfer
      </button>
    </div>
  );
};

export default Home;
