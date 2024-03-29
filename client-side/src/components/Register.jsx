import React from "react";
import vector1 from "../data/Vector 1.svg";
import { Link } from "react-router-dom";
import { PrimaryButtons } from "../Aseests/Buttons";

const Register = () => {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  async function register(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    if (response.status === 201) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("isAuth", true);
      window.location.href = "/";
    } else {
      console.log("error");
      alert("L'utilisateur existe déjà");
    }
  }

  return (
    <>
      <div className="container m-auto flex flex-col items-center justify-center min-h-screen gap-16 relative text-white z-[1]">
        <div className="flex items-center gap-6">
          <div className=" h-[1px] w-[198px] bg-slate-300"></div>
          <p className=" font-semibold text-3xl tracking-wide">S’inscrire</p>
          <div className=" h-[1px] w-[198px] bg-slate-300"></div>
        </div>
        <div className="flex flex-col gap-8 w-3/4 max-w-[600px] ">
          <form
            action=""
            method="post"
            onSubmit={register}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col items-start gap-3">
              <p className=" text-xl font-medium">Nom d’utilisateur :</p>
              <input
                type="text"
                placeholder="Entrer  votre nom d’utilisateur"
                className=" font-thin text-gray-500 py-5 px-6 w-full rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className=" text-xl font-medium">Email :</p>
              <input
                type="email"
                placeholder="Entrer  votre email"
                className=" font-thin text-gray-500 py-5 px-6 w-full rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-start gap-3">
              <p className=" text-xl font-medium">Mot de passe :</p>
              <input
                type="password"
                placeholder="Entrer  votre mot de passe"
                className=" font-thin text-gray-500 py-5 px-6 w-full rounded-md"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="-mt-4">
              <span className=" font-thin opacity-60">
                si vous avez déjà un compte veuillez{" "}
              </span>
              <Link to="/connecter">
                <span className="text-red font-bold">Se connecter</span>
              </Link>
            </div>
            <PrimaryButtons text="S'inscrire" type="submit" />
          </form>
        </div>
      </div>
      <img
        src={vector1}
        alt=""
        className="absolute w-full right-0 h-screen inset-0 z-0"
      />
    </>
  );
};

export default Register;
