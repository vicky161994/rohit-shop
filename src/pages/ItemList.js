import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style.css";
import { getItemList } from "../services/item";
import { CircularProgress } from 'react-loader-spinner'

export default function ItemList({ items }) {
  const [search, setSearch] = useState("");
  const [itemList, setItemList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=> {
    async function fetchItems() {
      setLoading(true);
      const resp = await getItemList()
      setLoading(false);
      setItemList(resp)
    }
    fetchItems();
  },[])

  const filteredItems = itemList.filter(
    (item) => item.name.toLowerCase().includes(search.toLowerCase()),);

  return (
    <div className="container">
      <Link to="/pin-change" className="pin-chnge-btn">
          <button className="add-btn">Change Pin</button>
      </Link>
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
            {filteredItems.length === 0 && <tr><td colSpan={5}>No Data Found!</td></tr>}
            {loading && <tr><td colSpan={5}><CircularProgress
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="circular-progress-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
              strokeWidth={2}
              animationDuration={1}
              /></td></tr>
            }
            {filteredItems.map((item, i) => (
              <tr key={item._id}>
                <td>{i+1}</td>
                <td>{item.name}</td>
                <td>{item.costPrice}</td>
                <td>{item.sellingPrice}</td>
                <td>
                  <Link to={`/edit/${item._id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}