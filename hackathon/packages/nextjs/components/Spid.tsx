import React, { useState } from "react";
import SPIDPopup from "./SPIDPopup";

const App: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div>
      {showPopup && <SPIDPopup />}
      <button
        onClick={() => setShowPopup(!showPopup)}
        className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition duration-200"
      >
        {showPopup ? "Nascondi Popup" : "Mostra Popup"}
      </button>
    </div>
  );
};

export default App;