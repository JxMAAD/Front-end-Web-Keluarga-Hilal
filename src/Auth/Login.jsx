import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { RiLockPasswordLine } from "react-icons/ri";
import { SiNamecheap } from "react-icons/si";


export default function Login() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    // const passwordPattern = /^.{8,}$/;

    if (!name.trim() || !password.trim()) {
      toast.error("USERNAME DAN PASSWORD HARUS DI ISI", {
        position: "top-center",
        duration: 4000,
      });
      setLoading(false);
      return;
    }

    // if (!passwordPattern.test(password)) {
    //   toast.error("Password harus terdiri dari minimal 8 karakter", {
    //     position: "top-center",
    //     duration: 4000,
    //   });
    //   setLoading(false);
    //   return;
    // }

    setButtonLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        name: name,
        password: password,
      });

      const { token, user, permissions } = response.data;

      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user));
      Cookies.set("permissions", JSON.stringify(permissions));

      localStorage.setItem("token", token);

      toast.success("LOGIN BERHASIL", {
        position: "top-center",
        duration: 4000,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          toast.error("AKUN TIDAK DITEMUKAN", {
            position: "top-center",
            duration: 4000,
          });
        } else if (error.response.status === 401) {
          toast.error("USERNAME ATAU PASSWORD SALAH", {
            position: "top-center",
            duration: 4000,
          });
        } else {
          toast.error("TERJADI KESALAHAN SAAT LOGIN", {
            position: "top-center",
            duration: 4000,
          });
        }
      } else {
        toast.error("TERJADI KESALAHAN SAAT LOGIN", {
          position: "top-center",
          duration: 4000,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-violet to-primary-dark">
      <div className="max-w-lg w-full">
        <form
          onSubmit={login}
          className="bg-white shadow-md rounded-lg px-8 py-6"
        >
          <div className="mb-4">
            <label className="flex text-sm font-medium text-gray-700">
             <SiNamecheap className="mt-1 mr-1"/> Username:
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="username"
              className="block w-full mt-1 px-4 py-3 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm text-gray-800 placeholder-gray-500"
            />
          </div>
          <div className="mb-4">
            <div className="">
              <label className="flex text-sm font-medium  text-gray-700">
               < RiLockPasswordLine className="mt-1 mr-1"/> Password: 
              </label>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="password"
                className="block w-full mt-1 px-4 py-3 rounded-md shadow-sm bg-gray-100 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm text-gray-800 placeholder-gray-500"
              />
            </div>
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className={`w-full py-2 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-gradient-to-r from-primary to-primary-dark hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-300 ${
                buttonLoading ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={loading || buttonLoading}
            >
              {loading ? "Sedang Login..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
