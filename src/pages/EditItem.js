import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getItemDetailsById, updateItem } from "../services/item";
import { CircularProgress } from 'react-loader-spinner'

export default function EditItem() {
  const { itemId } = useParams();
  const [item, setItem] = useState({name: "", costPrice: 0, sellingPrice: 0});
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  
  const navigate = useNavigate();

  useEffect(() => {
    async function getItemById() {
      setLoading(true);
      const resp = await getItemDetailsById(itemId);
      setLoading(false);
      setItem(resp)
    }
    getItemById();
  },[])


  const handleUpdate = async () => {
    let missingFields = [];

    if (!item.name.trim()) missingFields.push("Item Name");
    if (!item.costPrice) missingFields.push("Cost Price");
    if (!item.sellingPrice) missingFields.push("Selling Price");
    if (missingFields.length > 0) {
      setError(
        `${missingFields.join(", ")} ${missingFields.length === 1 ? "is" : "are"} required.`,
      );
      return;
    }
    if (!item.name || !item.costPrice || !item.sellingPrice) {
      setError("Item Name, Cost Price, and Selling Price are required.");
      return;
    }
    if (!/^\d+$/.test(item.costPrice) || !/^\d+$/.test(item.sellingPrice)) {
      setError("Cost price and Selling price must be integers.");
      return;
    }

    setError("");
    const payload = {name: item.name, costPrice: item.costPrice, sellingPrice: item.sellingPrice}
    setLoading(true);
    const resp = await updateItem(payload, itemId)
    setLoading(false);
    navigate("/items");
  };

  return (
    <div className="container">
      <h2>Update Item</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <input
          placeholder="Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Cost Price"
          value={item.costPrice}
          onChange={(e) => setItem({ ...item, costPrice: e.target.value })}
        />
      </div>
      <div className="form-group">
        <input
          placeholder="Selling Price"
          value={item.sellingPrice}
          onChange={(e) => setItem({ ...item, sellingPrice: e.target.value })}
        />
      </div>

      {loading && <CircularProgress
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="circular-progress-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
        strokeWidth={2}
        animationDuration={1}
        />
      }

      <div className="form-actions">
        <button className="add-btn" onClick={handleUpdate}>
          Update
        </button>
        <Link to="/items">
          <button className="add-btn">Go Back</button>
        </Link>
      </div>
    </div>
    
  );
}
