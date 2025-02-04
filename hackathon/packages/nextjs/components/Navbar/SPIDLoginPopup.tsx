import { useState } from "react"

interface SPIDLoginPopupProps {
  onClose: () => void
  onSuccess: (username :string , password: string ) => void
}

export function SPIDLoginPopup({ onClose, onSuccess }: SPIDLoginPopupProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate SPID login (always successful in this fake version)
    const response = await fetch("http://localhost:3000/api/auth/user/spid", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })


    //TODO return the data from spid login so that we can check it
    if(response.ok)
      onSuccess(username, password)
    else
      onClose()

  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">SPID Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              required
            />
            <div className="flex justify-between">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

