import React from "react";
import { Outlet } from "react-router-dom"; // we can import these file into index file itself
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
