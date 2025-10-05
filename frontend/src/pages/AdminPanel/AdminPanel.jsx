import React, { useContext, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import "./AdminPanel.css";

const AdminPanel = () => {
  const { food_list, setFoodList } = useContext(StoreContext);
  const [form, setForm] = useState({ name: "", price: "", image: "" });

  // Add new item (to backend)
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.image) return;
    try {
      const res = await axios.post("http://localhost:5000/api/food", {
        name: form.name,
        price: parseInt(form.price),
        image: form.image,
      });
      setFoodList([...food_list, res.data]);
      setForm({ name: "", price: "", image: "" });
    } catch (err) {
      alert("Failed to add item: " + err.message);
    }
  };

  // Remove item (from backend)
  const handleRemove = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/food/${id}`);
      setFoodList(food_list.filter((item) => item._id !== id));
    } catch (err) {
      alert("Failed to remove item: " + err.message);
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      <form className="admin-form" onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <input
          type="text"
          placeholder="Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
        />
        <button type="submit">Add Item</button>
      </form>
      <div className="admin-list">
        <h3>Current Items</h3>
        <ul>
          {food_list.map((item) => (
            <li key={item._id}>
              <img src={item.image} alt={item.name} width={40} />
              <span>{item.name} - ₹{item.price}</span>
              <button onClick={() => handleRemove(item._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;
