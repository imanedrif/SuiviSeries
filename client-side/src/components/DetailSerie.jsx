import React, { useEffect, useState } from "react";
import serie from "../data/serie2.jpg";
import { useParams } from "react-router-dom";
import { SecondaryButtons } from "../Aseests/Buttons";
import Check from "../data/CheckCircle.svg";
import axios from "axios";
import { Icon } from '@iconify/react';


const DetailSerie = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [Eps, setEps] = useState([]);

  // console.log(id)
  // fetch('wwwjojoojoj/id').then((res)=>{
  //   setDetails(res.data)
  // })
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

  }, []);


  // console.log(process.env.REACT_APP_IMAGES_URL)
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
              {
                // get only one number after the point
                details?.vote_average.toFixed(1)
              }
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
            <div className=" flex  cursor-pointer flex-col px-6 py-3 items-center justify-start bg-purple-900 bg-opacity-20 border-2 border-purple-900 rounded-md">
              <span className="font-bold text-lg">EP {ep.episode_number}</span>
              {/* make me arounded checkbox */}
              <Icon icon="ri:checkbox-circle-fill" className="fill-yellow-500 h-6 w-6" color="yellow"  />
              <Icon icon="ri:checkbox-circle-line" className="h-6 w-6" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DetailSerie;
