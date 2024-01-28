import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SecondaryButtons } from "../Aseests/Buttons";
import { Card } from "../Aseests/Cards";
import axios from "axios";

const Profile = () => {
  const user = sessionStorage.getItem("user");
  const [activeTab, setActiveTab] = useState("mes-informations");
  const userData = JSON.parse(user);
  const [favorites, setFavorites] = useState([]);

  async function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isAuth");
    window.location.href = "/";
  }

  async function getFavories() {
    let token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/user/favorite-series`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        if (res.data && Array.isArray(res.data.series)) {
          setFavorites(res.data.series);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getFavories();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log("favorites", favorites);

  return (
    <div className="container mt-8 m-auto grid grid-cols-1 lg:grid-cols-3 text-white">
      {/* Sidebar */}
      <div className="items-center justify-center flex gap-5 h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900">
        <div className="grid grid-rows-4 items-center justify-center h-full lg:h-auto">
          <SecondaryButtons
            onClick={() => handleTabClick("mes-informations")}
            className={`sidebar-button ${
              activeTab === "mes-informations" ? "active" : ""
            }`}
            text="Mes Informations"
          />
          <SecondaryButtons
            onClick={() => handleTabClick("mes-favories")}
            className={`sidebar-button ${
              activeTab === "mes-favories" ? "active" : ""
            }`}
            text="Mes Favories"
          />
          <button
            onClick={() => handleTabClick("ep-regarde")}
            className={`sidebar-button ${
              activeTab === "ep-regarde" ? "active" : ""
            }`}
          >
            Épisodes Regardés
          </button>
          <button onClick={logout} className="sidebar-button">
            Se Déconnecter
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="col-span-2 flex flex-col justify-center pl-5 bg-neutral-200 bg-opacity-20">
        {/* Content for each tab */}
        {activeTab === "mes-informations" && (
          <div>
            <h1>
              <Icon
                icon="bxs:user"
                color="grey"
                className="h-14 w-14 rounded-full p-1 bg-white"
              />{" "}
              {userData.name}
            </h1>
            <p>Adresse e-mail: {userData.email}</p>
          </div>
        )}
        {activeTab === "mes-favories" && (
          <div className="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {favorites &&
              favorites?.map((serie) => {
                return (
                  <div className="flex flex-row gap-4">
                    <Card fromDB={true} serie={serie} />
                  </div>
                );
              })}
          </div>
        )}
        {activeTab === "ep-regarde" && (
          <div>{/* Display user's watched episodes */}</div>
        )}
      </div>
    </div>
  );
};

export default Profile;
