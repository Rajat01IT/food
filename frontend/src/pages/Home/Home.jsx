import React, { useState } from "react";
import "./Home.css";
import Header from "../../components/Header/Header";
import ExploreMenu from "../../components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload.jsx/AppDownload";
import Navbar from "../../components/Navbar/Navbar";

const Home = ({ setShowLogin }) => {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  return (
    <div>
      <Navbar setShowLogin={setShowLogin} search={search} setSearch={setSearch} />
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} search={search} />
      <AppDownload />
    </div>
  );
};

export default Home;
