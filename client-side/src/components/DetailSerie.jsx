import React, { useEffect, useState } from "react";
import serie from "../data/serie2.jpg";
import { Link, useParams } from "react-router-dom";
import { SecondaryButtons } from "../Aseests/Buttons";
import Check from "../data/CheckCircle.svg";
import axios from "axios";
import { Icon } from "@iconify/react";
import { HeartIcon, HeartFilledIcon } from "@radix-ui/react-icons";

const DetailSerie = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [Eps, setEps] = useState([]);
  const [isClicked, SetIsclicked] = useState(false);
  const [checkedEps, setCheckedEps] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [seasonNumber, setSeasonNumber] = useState(1);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let userId = user?.id;
    let serieId = id;
    let token = sessionStorage.getItem("token");
    axios
      .get(
        `http://localhost:8000/api/user/watched-episodes/${serieId}/${seasonNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("watched eps : ", res.data.watchedEpisodes);
        setCheckedEps(res.data.watchedEpisodes);
      })
      .catch((err) => console.log(err));
  }, [seasonNumber]);

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let userId = user?.id;
    let serieId = id;
    let token = sessionStorage.getItem("token");
    axios
      .get(
        `http://localhost:8000/api/user/favorite-series/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);

        if (res.data) {
          console.log("res", res.data.isFavorite);
          setIsFav(res.data.isFavorite);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const addToWatchedEpisodes = (tmdbEpisodeId, seriesId) => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let token = sessionStorage.getItem("token");
    if (checkedEps.includes(tmdbEpisodeId)) {
      setCheckedEps((prev) => prev.filter((ep) => ep !== tmdbEpisodeId));
    } else {
      setCheckedEps((prev) => [...prev, tmdbEpisodeId]);
    }
    console.log("tmdbId", tmdbEpisodeId);
    console.log("seriesId", seriesId);
    console.log("seasonNumber", seasonNumber);
    axios
      .post(
        `http://localhost:8000/api/user/watched-episode/${tmdbEpisodeId}/${seasonNumber}`,
        {
          tmdb_episode_id: tmdbEpisodeId,
          series_id: seriesId,
          season: seasonNumber, // Pass seasonNumber to the request
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("add ep res", res);
        console.log("checked eps", checkedEps);
        if (res.data.action === "added") {
          console.log("Episode added to watched episodes");
          setCheckedEps((prev) => [...prev, tmdbEpisodeId]);
        } else {
          console.log("Episode removed from watched episodes");
          setCheckedEps((prev) => prev.filter((ep) => ep !== tmdbEpisodeId));
        }
      })

      .catch((err) => console.log(err));
  };

  const addtoFavories = () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    let serieId = id;
    let token = sessionStorage.getItem("token");
    console.log("details are ", token);
    axios
      .post(
        `http://localhost:8000/api/user/favorite-series/${serieId}`,
        {
          name: details?.name,
          poster_path: details?.poster_path,
          overview: details?.overview,
          first_air_date: details?.first_air_date,
          vote_average: details?.vote_average,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setIsFav(false);
        } else if (res.status === 201) {
          console.log(res);
          setIsFav(true);
        }
      })
      .catch((err) => console.log(err));
  };

  async function getSerieRecommendations() {
    try {
      let resp = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`
      );
      setRecommendations(resp.data.results);
      console.log("recom", resp.data.results);
    } catch (e) {
      console.log(e);
    }
  }
  async function getSerieDetails() {
    try {
      let resp = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`
      );
      setDetails(resp.data);
      console.log(resp.data);
    } catch (e) {
      console.log(e);
    }
  }

  const getSeasonEPS = async (season) => {
    setSeasonNumber(season);
    try {
      let resp = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/season/${season}?api_key=5bf89b1ac4dec1f2a3dacb6b4b926527`
      );
      setEps(resp.data.episodes);
      console.log(resp.data.episodes);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getSerieDetails();
    getSeasonEPS(1);
    getSerieRecommendations();
  }, []);

  return (
    <div className="container m-auto p-4 gap-10 flex flex-col items-center justify-center h-full mt-8 text-white">
      <div className="flex gap-6 flex-col items-center p-4 lg:flex-row md:p-8 bg-neutral-200 bg-opacity-10 rounded-lg container m-auto md:gap-14">
        <img
          src={`https://image.tmdb.org/t/p/original/${details?.poster_path}`}
          alt=""
          className="w-[419px] rounded-xl"
        />
        <div className="flex flex-col gap-5 items-center md:items-start md:gap-6">
          <div className="flex flex-col gap-6 md:gap-1 w-full">
            <div className="flex flex-col gap-1 md:flex-row items-center md:gap-4">
              <h1 className=" text-4xl font-bold">{details?.name}</h1>
              <div className="border w-full"></div>
              {isFav ? (
                <HeartFilledIcon
                  className="h-12 w-12 rounded-full cursor-pointer"
                  onClick={addtoFavories}
                />
              ) : (
                <HeartIcon
                  className="h-12 w-12 cursor-pointer"
                  onClick={addtoFavories}
                />
              )}
            </div>
            <div className="flex flex-row items-center justify-center md:justify-start gap-10 md:gap-10">
              <h3 className=" font-light">
                Année de production :{" "}
                <span className=" font-bold">
                  {details?.first_air_date.split("-")[0]}
                </span>
              </h3>
              <h3 className=" font-light">
                Pays :
                <span className=" font-bold">{details?.origin_country[0]}</span>
              </h3>
              <h3 className=" font-light">
                Saisons:
                <span className=" font-bold">{details?.number_of_seasons}</span>
              </h3>
            </div>
          </div>
          <div className="border w-fit p-3 rounded text-yellow-500 border-yellow-500">
            <span className="font-bold">
              {details?.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex flex-col items-center md:items-start gap-1">
            <h2 className="text-xl font-medium">Description :</h2>
            <p className="font-light md:text-sm text-xs text-center md:text-left">
              {details?.overview}
            </p>
          </div>
          <div className="flex flex-row gap-6">
            <select
              name=""
              id=""
              defaultValue={1}
              className="text-white px-4 py-2 bg-grey-500 flex justify-center text-base md:text-lg rounded-lg border-2"
              onChange={(e) => {
                getSeasonEPS(e.target.value);
              }}
            >
              {details?.seasons.map((ep, index) => {
                return (
                  <option value={ep.season_number}> Season {index + 1}</option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-4 lg:grid-cols-10 bg-zinc-300 bg-opacity-10 container m-auto p-6 gap-6 items-start justify-start rounded-lg">
        {Eps.map((ep) => {
          return (
            <div
              className=" flex  cursor-pointer flex-col px-6 py-3 items-center justify-start bg-purple-900 bg-opacity-20 border-2 border-purple-900 rounded-md"
              onClick={() => addToWatchedEpisodes(ep.episode_number, id)}
            >
              <span className="font-bold text-lg">EP{ep.episode_number}</span>
              <Icon
                icon={
                  checkedEps.includes(ep.episode_number)
                    ? "ri:checkbox-circle-fill"
                    : "ri:checkbox-circle-line"
                }
                className="h-7 w-7"
                color={
                  checkedEps.includes(ep.episode_number) ? "green" : "white"
                }
              />
            </div>
          );
        })}
      </div>
      <div className=" flex flex-col gap-8 bg-zinc-300 bg-opacity-10 container m-auto p-6 items-start justify-start rounded-lg">
        <h1 className="text-3xl font-bold">Recommendations</h1>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {recommendations &&
            recommendations.map((serie) => {
              return (
                <div className="flex flex-col items-center justify-center gap-4">
                  <img
                    src={`https://image.tmdb.org/t/p/original/${serie.poster_path}`}
                    alt=""
                    className="w-[419px] rounded-xl"
                  />
                  <h1 className="text-xl font-bold">{serie.name}</h1>
                  <SecondaryButtons
                    text="Voir plus"
                    onClick={() => {
                      window.open(`/serie/${serie.id}`, "_blank");
                    }}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DetailSerie;
