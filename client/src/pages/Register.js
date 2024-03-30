import * as React from "react";
import { useState } from "react";
import api from "../api/axiosConfig";
import Logo from "../assets/wordLogo.png";
import roundLogo from "../assets/circleLogo.png";
import { FaUserLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/user/register", {
        username,
        email,
        password,
      });

      if (response.status === 200) {
        toast.success("Successfully registered user");
        navigate(`/`, { replace: true });
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.error("Email already exists");
      } else {
        toast.error("Failed to register user");
      }
      navigate(`/register`, { replace: true });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 m-10">
      {/* <div className="hidden md:block bg-cover bg-center" style={{ backgroundImage: `url(${Background})` }}> */}
      <div className="hidden md:block bg-cover bg-center">
        <div className="flex items-center justify-center h-full">
          <img src={Logo} alt="Logo" className="w-80" />
        </div>
      </div>
      <div className="flex items-center justify-center md:h-full">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary-main">
              <img
                src={roundLogo}
                className="flex items-center justify-center h-12 w-12 rounded-full"
              />
            </div>
            <h1 className="text-2xl font-bold mt-4">Sign Up</h1>
          </div>
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
              className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Register
            </button>
            <div className="text-center">
              <p className="text-gray-500">
                Already have an account?{" "}
                <a href="login" className="text-primary">
                  Login
                </a>
              </p>
              <p className="text-gray-500">
                &copy; Quirx {new Date().getFullYear()}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
