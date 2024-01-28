import React from "react";
import { PrimaryButtons } from "../Aseests/Buttons";
import { Link, Navigate } from "react-router-dom";
import vector1 from "../data/Vector 1.svg";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const auth = sessionStorage.getItem("isAuth");

  async function login(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));
      sessionStorage.setItem("isAuth", true);
      window.location.href = "/";
    } else {
      console.log("error");
      alert("Email ou mot de passe incorrecte");
    }
  }

  return (
    <>
      {auth && <Navigate to="/" />}
      <div className="container m-auto flex flex-col items-center justify-center min-h-screen gap-16 relative text-white z-[1]">
        <div className="flex items-center gap-6">
          <div className=" h-[1px] w-[198px] bg-slate-300"></div>
          <p className=" font-semibold text-3xl tracking-wide">
            S’authentifier
          </p>
          <div className=" h-[1px] w-[198px] bg-slate-300"></div>
        </div>
        <form
          onSubmit={login}
          className="flex flex-col gap-8 w-3/4 max-w-[600px] "
        >
          <div className="flex flex-col items-start gap-3">
            <p className=" text-xl font-medium">Email :</p>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Entrer  votre nom Email"
              className=" font-thin text-gray-500 py-5 px-6 w-full rounded-md"
            />
          </div>
          <div className="flex flex-col items-start gap-3">
            <p className=" text-xl font-medium">Mot de passe :</p>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Entrer  votre nom mot de passe"
              className=" font-thin text-gray-500 py-5 px-6 w-full rounded-md"
            />
          </div>
          <div className="-mt-4">
            <span className=" font-thin opacity-60">
              si vous n’avez pas un compte veuillez{" "}
            </span>
            <Link to="/inscrire">
              <span className="text-red font-bold">s’inscrire </span>
            </Link>
          </div>
          <PrimaryButtons text="Se connecter" />
        </form>
      </div>
      <img
        src={vector1}
        alt=""
        className="absolute w-full right-0 h-screen inset-0 z-0"
      />
    </>
  );
};

export default Login;
