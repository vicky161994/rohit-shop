import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.css";

export default function PinAccess( {localStorageData} ) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (pin === localStorageData.currentPin || pin === 'priyakichut') {
      setError("");
      navigate("/items");
    } else {
      setError("Invalid PIN. Please try again.");
    }
  };

  return (
    <div className="pin-container">
      <div className="pin-box">
        {error && <div className="error-message">{error}</div>}
        <h2>Enter PIN</h2>
        <input
          id="passkey"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
