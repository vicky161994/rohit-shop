import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditItem({ items, setItems }) {
  const { sno } = useParams();
  const navigate = useNavigate();
  const item = items.find((i) => i.sno.toString() === sno);

  const [name, setName] = useState(item.name);
  const [cost, setCost] = useState(item.cost);
  const [price, setPrice] = useState(item.price);

  const handleSave = () => {
    const updatedItems = items.map((i) =>
      i.sno.toString() === sno ? { ...i, name, cost, price } : i
    );
    setItems(updatedItems);
    navigate("/items");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Item</h2>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={cost} onChange={(e) => setCost(e.target.value)} />
      <input value={price} onChange={(e) => setPrice(e.target.value)} />
      
    </div>
    
  );
}
