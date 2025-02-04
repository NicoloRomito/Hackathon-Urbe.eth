

export const isUserVerified = async (address: string) =>  {

  const result = await fetch(`http://localhost:3000/api/smartContract/isUserVerified?address=${address}`);
    if(result.ok) {
        const data = await result.json();
        return data.verified;
  }
  throw new Error("Failed to retrieve data");
}