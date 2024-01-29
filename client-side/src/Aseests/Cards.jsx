import React, { useState } from "react";
import Heart from "../data/heartIcon.svg";
import FilledHeart from "../data/heartFilled.svg";
import { Navigate } from "react-router-dom";
import LinesEllipsis from "react-lines-ellipsis";

export const Card = ({ serie, fromDB }) => {
  const [isClicked, SetIsclicked] = useState(false);

  const handleClick = () => {
    SetIsclicked(true);

  };
  console.log(serie);

  return (
    <div
      className="relative rounded-lg w-80 h-[500px] border border-indigo-500 group hover:cursor-pointer
      bg-cover bg-center bg-no-repeat
    "
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${serie?.poster_path})`,
      }}
      onClick={() => {
        window.open(
          `/serie/${!fromDB ? serie?.id : serie?.tmdb_series_id}`,
          "_self"
        );
      }}
    >
      <div className="inset-0 absolute hidden group-hover:block bg-black bg-opacity-60 text-white rounded-lg py-2 px-2 items-center">
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-col items-start gap-1">
            <button className="rounded-full font-bold bg-white bg-opacity-15 py-2 px-4">
              {serie?.first_air_date}
            </button>
            <div className="flex items-center pl-2 gap-1">
              {Array.from({ length: serie?.vote_average / 2 }).map(
                (_, index) => (
                  <span key={index} className="text-yellow-500">
                    ★
                  </span>
                )
              )}
            </div>
          </div>
          <p className=" font-bold text-justify text-lg ">{serie?.name}</p>
          <p className="font-light text-justify max-w-full text-sm">
            <LinesEllipsis
              text={serie?.overview}
              maxLine="2"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </p>
        </div>
      </div>
    </div>
  );
};
