import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";

export default function ItemList({ items }) {
  const [search, setSearch] = useState("");

  const filteredItems = items.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sno.toString().includes(search),
  );

  return (
    <div className="container">
      <h2>Items List</h2>

      {/* Top bar with search on left, Add button on right */}
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search by SNo or Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/add">
          <button className="add-btn">+ Add Item</button>
        </Link>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Sno</th>
              <th>Item Name</th>
              <th>Cost Price</th>
              <th>Selling Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => (
              <tr key={item.sno}>
                <td>{item.sno}</td>
                <td>{item.name}</td>
                <td>{item.cost}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/edit/${item.sno}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
