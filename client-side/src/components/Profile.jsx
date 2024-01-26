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

  async function getFavories() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let userId = user.id;
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

  return (
    <div className="container mt-8 h-full m-auto gap-10 flex flex-row items-center bg-neutral-200 bg-opacity-20 text-white">
      <div className="flex flex-col w-fit gap-7 py-14 px-7 items-center justify-center h-full bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900">
        <SecondaryButtons
          onClick={() => handleTabClick("mes-informations")}
          className={
            activeTab === "mes-informations"
              ? "active text-violet-950 bg-white font-semibold text-lg bg-opacity-70 gap-2"
              : ""
          }
          text="Mes Informations"
        />
        <SecondaryButtons
          onClick={() => handleTabClick("mes-favories")}
          className={
            activeTab === "mes-favories"
              ? "active  text-violet-950 bg-white font-semibold text-lg bg-opacity-70"
              : ""
          }
          text="Mes Favories"
        />
        <button
          onClick={() => handleTabClick("ep-regarde")}
          className={activeTab === "ep-regarde" ? "active" : ""}
        >
          Épisodes Regardés
        </button>
        <button>Se Déconnecter</button>
      </div>
      <div className="">
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
          <div>
            {favorites &&
              favorites.map((serie) => {
                return (
                  <div className="flex flex-row gap-4">
                    <Card serie={serie} />
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
