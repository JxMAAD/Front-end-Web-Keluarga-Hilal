import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import { Toaster } from "react-hot-toast";

export default function () {
  return (
    <>
      <AppRoutes />
      <Toaster />
    </>
  );
}
