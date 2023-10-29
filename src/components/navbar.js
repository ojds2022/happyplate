import React, { useState } from "react";
import Logo from "../assets/plateLogo.png";
import { Link } from "react-router-dom";
import ReorderIcon from "@mui/icons-material/Reorder";
import "../styles/Navbar.css";

const Navbar = () => {
  const [openLinks, setOpenLinks] = useState(false);

  const toggleNavbar = () => {
    setOpenLinks(!openLinks);
  };

  return (
    <div className="fixed top-0 z-50 flex flex-row w-full h-20 xl:h-24 2xl:h-40 navbar bg-corn-silk">
      {openLinks ? (
        <div className="flex items-center justify-between px-6 md:justify-around grow">
          <Link to="/">
            <span className="text-lg text-hot-pink hover:text-pale-green md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl">
              Home
            </span>
          </Link>
          <Link to="/about">
            <span className="text-lg text-hot-pink hover:text-pale-green md:text-xl lg:text-2xl xl:text-3xl 2xl:text-5xl">
              About
            </span>
          </Link>
          <button
            className="bg-transparent border-0 cursor-pointer burger"
            onClick={toggleNavbar}
          >
            <ReorderIcon />
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between px-6 grow">
          <Link to="/">
            <img id="plateLogo" className="w-14 xl:w-20 3xl:w-32" src={Logo} alt="logo" />
          </Link>
          <button
            className="bg-transparent border-0 cursor-pointer burger"
            onClick={toggleNavbar}
          >
            <ReorderIcon />
          </button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
