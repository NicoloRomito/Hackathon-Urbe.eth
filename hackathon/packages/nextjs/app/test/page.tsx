// pages/test/page.tsx

"use client";

import { useWriteContract } from "wagmi";
import { NextPage } from "next";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {
    const { writeContractAsync } = useScaffoldWriteContract("Manager");

    const handleMint = async () => {
        let tx: `0x${string}` | undefined;
        try {
          tx = await writeContractAsync({
            functionName: "setMinter",
            args: ["0xE7929b291E3Aa938b17eE9B041f2Ca468254e801", true],
          });
          console.log("Transaction successful: ", tx);
        } catch (error) {
          console.error("Transaction failed:", error);
        }
      };

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
