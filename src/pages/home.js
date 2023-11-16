import React,  { useState } from "react";
import {Link} from "react-router-dom";
import BackgroundImage from "../assets/foodIcons.png";
import "../styles/Home.css";

const Home = () => {
  const [showInfoPopup, setShowInfoPopup] = useState(false);
  return (
    <div className="grid w-full h-screen bg-center bg-50% bg-sky-blue home"
    style={{ backgroundImage: `url(${BackgroundImage})` }}>
      {showInfoPopup === false ? (
        <div className="grid w-10/12 p-6 place-content-center md:w-1/2 md:h-1/3 md:mb-0 xl:w-1/2 xl:h-1/2 xl:rounded-2xl 3xl:rounded-3xl rounded-xl bg-corn-silk place-self-center drop-shadow-xl">
          <h1 className="mb-4 text-5xl md:mb-8 xxs:text-6xl xl:mb-12 lg:text-8xl xl:text-9xl 3xl:mb-32 text-hot-pink">HappyPlate</h1>
          <button className="w-2/3 h-12 mx-auto text-xl text-white border-0 rounded-md cursor-pointer md:h-14 md:w-1/2 md:text-2xl lg:text-4xl lg:h-20 xl:h-24 xl:text-5xl 3xl:h-40 3xl:rounded-3xl 3xl:text-7xl bg-hot-pink hover:bg-pale-green drop-shadow-lg hover:drop-shadow-xl" onClick={() => setShowInfoPopup(true)}>
            Start
          </button>
        </div>
      ) : (
        <div className="w-10/12 p-6 text-center md:w-1/2 md:h-1/3 md:mb-0 lg:w-2/5 xl:w-1/3 3xl:rounded-3xl rounded-xl bg-corn-silk place-self-center drop-shadow-xl">
          <div>
            <p className="text-hot-pink">
              Calculate your daily caloric intake recommendation based on several factors: <span className="font-bold">age, weight, height, activity-level, and desired weight-change</span>.
            </p>
            <p className="mt-2 text-hot-pink">
              Then, search any food or beverage you want, get in-depth nutritional info on it, and add it to your daily nutritional targets.
            </p>
          </div>
          <Link to="/userinfo">
            <button className="h-12 mt-4 text-xl text-white border-0 rounded-md cursor-pointer w-44 md:h-14 md:w-48 md:text-2xl xl:h-20 xl:w-60 xl:text-4xl 3xl:h-40 3xl:w-96 3xl:rounded-3xl 3xl:text-7xl bg-hot-pink hover:bg-pale-green drop-shadow-lg hover:drop-shadow-xl">
              Continue
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;
