import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PinAccess from "./pages/PinAccess";
import ItemList from "./pages/ItemList";
import EditItem from "./pages/EditItem";
import AddItem from "./pages/AddItem";
import PinChange from "./pages/PinChange";

function App() {
  let localStorageData = localStorage.getItem('pin');
  if(localStorageData){
    localStorageData = JSON.parse(localStorageData)
  } else {
    const pin = {
      oldPin : '1234',
      currentPin : '1234'
    }
    localStorage.setItem('pin', JSON.stringify(pin))
    localStorageData = pin
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PinAccess localStorageData={localStorageData} />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/edit/:itemId" element={<EditItem  />} />
        <Route path="/add" element={<AddItem />} />
        <Route path="/pin-change" element={<PinChange localStorageData={localStorageData} />} />
      </Routes>
    </Router>
  );
}

export default App;
