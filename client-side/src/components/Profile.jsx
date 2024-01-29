import { Icon } from "@iconify/react";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PrimaryButtons, SecondaryButtons } from "../Aseests/Buttons";
import { Card } from "../Aseests/Cards";
import axios from "axios";

const Profile = () => {
  const user = sessionStorage.getItem("user");
  const [activeTab, setActiveTab] = useState("mes-informations");
  const userData = JSON.parse(user);
  const [favorites, setFavorites] = useState([]);
  const [watchedEpisodes, setWatchedEpisodes] = useState([]);

  async function logout() {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("isAuth");
    window.location.href = "/";
  }

  async function getWatchedEpisodes() {
    let token = sessionStorage.getItem("token");
    axios
      .get(`http://localhost:8000/api/user/watched-episodes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(async (res) => {
        console.log("res", res);
        if (res.data && Array.isArray(res.data.series)) {
          const watchedEpisodesWithDetails = await Promise.all(
            res.data.series.map(async (episode) => {
              const resp = await axios.get(
                `https://api.themoviedb.org/3/tv/${episode.series_id}?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`
              );
              return { ...episode, seriesDetails: resp.data };
            })
          );
          setWatchedEpisodes(watchedEpisodesWithDetails);
        }
      })
      .catch((err) => console.log(err));
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
    getWatchedEpisodes();
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  console.log("favorites", favorites);

  return (
    <div className="container mt-8 m-auto grid grid-cols-1 lg:grid-cols-3 text-white">
      {/* Sidebar */}
      <div className="flex flex-row lg:flex-col items-center justify-center lg:h-screen bg-gradient-to-b from-indigo-900 via-purple-800 to-indigo-900">
        <div className="grid grid-cols-4 lg:grid-cols-1 gap-10 items-center justify-center h-full lg:h-auto p-3">
          <SecondaryButtons
            onClick={() => handleTabClick("mes-informations")}
            className={`sidebar-button text-xs p-2 w-full sm:w-auto break-words ${
              activeTab === "mes-informations"
                ? "active bg-purple-700 text-white"
                : ""
            }`}
            text="Mes Informations"
          />
          <SecondaryButtons
            onClick={() => handleTabClick("mes-favories")}
            className={`sidebar-button text-xs p-2 w-full sm:w-auto break-words ${
              activeTab === "mes-favories"
                ? "active bg-purple-700 text-white"
                : ""
            }`}
            text="Mes Favories"
          />
          <SecondaryButtons
            text="Épisodes Regardés"
            onClick={() => handleTabClick("ep-regarde")}
            className={`sidebar-button text-xs p-2 w-full sm:w-auto break-words ${
              activeTab === "ep-regarde"
                ? "active bg-purple-700 text-white"
                : ""
            }`}
          />
          <PrimaryButtons
            onClick={logout}
            className="sidebar-button text-xs p-2 w-full sm:w-auto break-words"
            text="Se Déconnecter"
          />
        </div>
      </div>
      {/* Content Area */}
      <div className="col-span-2 flex flex-col items-center lg:items-start lg:justify-center pl-5 bg-neutral-200 bg-opacity-20 h-screen pt-8 ">
        {activeTab === "mes-informations" && (
          <div className="flex flex-col items-center lg:items-start gap-10">
            <div className="flex flex-row items-center gap-5">
              <Icon
                icon="bxs:user"
                color="grey"
                className="h-14 w-14 rounded-full p-1 bg-white"
              />
              <h1 className="text-5xl font-semibold">{userData.name}</h1>
            </div>
            <div className="flex flex-col items-center lg:items-start gap-3">
              <p className="text-medium text-xl">
                E-mail: <span>{userData.email}</span>
              </p>
              <p className="text-medium text-lg">
                Nombre de séries suivies: <span>{watchedEpisodes.length}</span>
              </p>
              <p className="text-medium text-lg">
                Nombre de series favorites: <span>{favorites.length}</span>
              </p>
            </div>
          </div>
        )}
        {activeTab === "mes-favories" && (
          <div className="p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-7 justify-items-center overflow-auto">
            {favorites &&
              favorites?.map((serie) => {
                return (
                  <div className="flex flex-row gap-4 m-2">
                    <Card fromDB={true} serie={serie} />
                  </div>
                );
              })}
          </div>
        )}
        {activeTab === "ep-regarde" && (
          <div className="p-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 justify-items-center overflow-auto">
              {watchedEpisodes &&
                watchedEpisodes?.map((episode) => {
                  return (
                    <Link
                      to={`/serie/${episode.seriesDetails.id}`}
                      className="flex flex-col bg-gray-200 opacity-90 p-4 rounded-lg shadow-md m-2 cursor-pointer"
                    >
                      <h2 className="text-xl font-bold mb-2 text-violet-950">
                        {episode.seriesDetails.name}
                      </h2>
                      <p className="text-gray-700 text-medium">
                        Episode: {episode.tmdb_episode_id}
                      </p>
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
