import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function PinChange({ localStorageData }) {
    const [oldPin, setOldPin] = useState('');
    const [newPin, setNewPin] = useState('');
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState('')
    const naviagte = useNavigate();

    const changePin = async () => {
        if(oldPin !== localStorageData.currentPin){
            setError('Old PIN not correct');
            return
        }
        if(localStorageData.currentPin === newPin) {
            setError('New PIN can not be same as old PIN')
            return
        }
        localStorageData.oldPin = oldPin;
        localStorageData.currentPin = newPin;
        localStorage.setItem('pin', JSON.stringify(localStorageData));
        setSuccessMessage('PIN Changed Successfully');
        setError('')
        setTimeout(()=>{naviagte('/')}, 3000)
    }
    return (
        <div className="container">
      <h2>Pin Change</h2>
      {error && <div className="error-message">{error}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="form-group">
        <input
        type="password"
          placeholder="Old PIN"
          value={oldPin}
          onChange={(e) => setOldPin(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
        type="password"
          placeholder="New PIN"
          value={newPin}
          onChange={(e) => setNewPin(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="add-btn" onClick={changePin} disabled={successMessage}>
          Change
        </button>
        {!successMessage && <Link to="/items">
          <button className="add-btn">Go Back</button>
        </Link>}
      </div>
    </div>
    );
}