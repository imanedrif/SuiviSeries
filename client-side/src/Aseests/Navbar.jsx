import React from "react";
import logo from "../data/Suivi.Series.logo.svg";
import { PrimaryButtons, SecondaryButtons } from "./Buttons";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const Navbar = () => {
  // check if user is authenticated or not
  const isAuth = sessionStorage.getItem("isAuth");
  return (
    <div className="container m-auto flex flex-col md:flex-row justify-between items-center px-2 gap-8  pt-4 z-[1] ">
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      {isAuth ? (
        <div className="flex flex-row gap-4 items-center">
          <Link to="profile">
            <PrimaryButtons
              iconLeft={
                <Icon
                  icon="ph:user-duotone"
                  className="h-6 w-6"
                  color="white"
                />
              }
              text="Profile"
            />
          </Link>
        </div>
      ) : (
        <div className="flex flex-row gap-4 items-center">
          <Link to="inscrire">
            <SecondaryButtons text="S'inscrire" />
          </Link>
          <Link to="connecter">
            <PrimaryButtons text="Se connecter" />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
