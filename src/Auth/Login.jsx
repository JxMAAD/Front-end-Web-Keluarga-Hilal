import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Api from "../Api"

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);

  const token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const passwordPattern = /^.{8,}$/;

    if (!username.trim() || !password.trim()) {
      toast.error("USERNAME DAN PASSWORD HARUS DI ISI", {
        position: "top-center",
        duration: 4000,
      });
      setLoading(false);
      return;
    }

    if (!passwordPattern.test(password)) {
      toast.error("Password harus terdiri dari minimal 8 karakter", {
        position: "top-center",
        duration: 4000,
      });
      setLoading(false);
      return;
    }

    setButtonLoading(true);

    try {
      const response = await Api.post("/api/login", {
        username: username,
        password: password,
      });

      const { username, password, permissions } = response.data;

      Cookies.set("token", token);
      Cookies.set("user", JSON.stringify(user)); // Fixed typo here (json -> JSON)
      Cookies.set("permissions", JSON.stringify(permissions));

      localStorage.setItem("token", token);

      toast.success("LOGIN BERHASIL", {
        position: "top-center",
        duration: 4000,
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        toast.error("AKUN TIDAK DITEMUKAN", {
          position: "top-center",
          duration: 4000,
        });
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
    <div>
      <h2>Login</h2>
      <form onSubmit={login}>
        <div>
          <label className="block text-sm font-medium text-gray-700">Username:</label>
          <input
            type="text"
            name="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            className="block w-full px-4 py-3 rounded-md shadow-sm bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
          />
        </div>
        <div className="mt-1">
          <label className="block text-sm font-medium text-gray-700">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className="block w-full px-4 py-3 rounded-md shadow-sm bg-gray-200 focus:outline-none focus:ring focus:border-blue-300 sm:text-sm"
          />
        </div>

        <div className="mt-1">
          <button
            type="submit"
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring focus:border-blue-300 ${
              buttonLoading ? "cursor-not-allowed opacity-50" : ""
            }`}
            disabled={loading || buttonLoading}
          >
            {loading ? "Sedang Loginnn..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
}
