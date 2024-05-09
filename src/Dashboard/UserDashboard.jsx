import React from "react";
import Navbar from "../Components/Navbar";

export default function UserDashboard() {
  document.title = "Dashboard";

  return (
    <div className="md:flex sm:inline-block">
      <Navbar />
      <div></div>
    </div>
  );
}
