import React from "react";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <div className="fixed bottom-0 left-0 flex flex-col w-full h-20 text-center xl:h-24 2xl:h-32 footer bg-corn-silk">
      <div id="socialMedia" className="pt-2 text-pink">
        <span className="hover:text-pale-green"><InstagramIcon /></span>
        <span className="hover:text-pale-green"><TwitterIcon /></span>
        <span className="hover:text-pale-green"><FacebookIcon /></span>
        <span className="hover:text-pale-green"><LinkedInIcon /></span>
      </div>
      <p className="text-pink xl:text-xl 2xl:text-3xl 3xl:text-4xl"> &copy; 2023 happyplate.com </p>
    </div>
  );
};

export default Footer;
