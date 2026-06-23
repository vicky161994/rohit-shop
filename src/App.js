import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PinAccess from "./pages/PinAccess";
import ItemList from "./pages/ItemList";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";

function App() {
  const [items, setItems] = useState([
    { sno: 1, name: "Apple", cost: 50, price: 70 },
    { sno: 2, name: "Banana", cost: 20, price: 30 },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PinAccess />} />
        <Route path="/items" element={<ItemList items={items} setItems={setItems} />} />
        <Route path="/edit/:sno" element={<EditItem items={items} setItems={setItems} />} />
        <Route path="/add" element={<AddItem items={items} setItems={setItems} />} />
      </Routes>
    </Router>
  );
}

export default App;
