import React from "react";

export const PrimaryButtons = ({
  iconLeft,
  text,
  type,
  className,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`gap-2 text-white px-4 md:px-8 py-2 md:py-2 bg-red flex justify-center border-red border-2 text-base md:text-lg rounded-lg items-center ${className}`}
    >
      {iconLeft}
      {text}
    </button>
  );
};
export const PrimaryButtonsIcon = (props) => {
  return (
    <button
      className="text-white px-6 py-1 bg-red flex justify-center text-lg rounded-md items-center gap-2"
      {...props}
    >
      {props.text}
      <img className="bg-red" src={props.iconRight} alt="" />
    </button>
  );
};
export const SecondaryButtons = ({ text, onClick, className, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`text-white px-4 items-center md:px-8 py-2 md:py-2 bg-grey-500 flex justify-center text-base md:text-lg rounded-lg border-2 ${className}`}
    >
      {icon}
      {text}
    </button>
  );
};
