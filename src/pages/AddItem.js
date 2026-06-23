import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style.css";

export default function AddItem({ items, setItems }) {
  const [sno, setSno] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleAdd = () => {
    // Validation
    let missingFields = [];

    if (!name.trim()) missingFields.push("Item Name");
    if (!cost.trim()) missingFields.push("Cost Price");
    if (!price.trim()) missingFields.push("Selling Price");
    if (missingFields.length > 0) {
      setError(
        `${missingFields.join(", ")} ${missingFields.length === 1 ? "is" : "are"} required.`,
      );
      return;
    }
    if (!name || !cost || !price) {
      setError("Item Name, Cost Price, and Selling Price are required.");
      return;
    }
    if (!/^\d+$/.test(cost) || !/^\d+$/.test(price)) {
      setError("Cost price and Selling price must be integers.");
      return;
    }

    setError(""); // clear error if valid
    setItems([
      ...items,
      {
        sno: parseInt(sno),
        name,
        cost: parseInt(cost),
        price: parseInt(price),
      },
    ]);
    navigate("/items");
  };

  return (
    <div className="container">
      <h2>Add Item</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <input
          placeholder="Sno"
          value={sno}
          onChange={(e) => setSno(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Cost Price"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Selling Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="form-actions">
        <button className="add-btn" onClick={handleAdd}>
          Add
        </button>
        <Link to="/items">
          <button className="add-btn">Go Back</button>
        </Link>
      </div>
    </div>
  );
}
