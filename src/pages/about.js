import React from "react";
import BannerImage from "../assets/foodIcons.png";
import "../styles/About.css";

const About = () => {
  return (
    <div className="flex flex-col h-screen">
      <div
        className="bg-center bg-50% h-2/5 bg-sky-blue"
        style={{ backgroundImage: `url(${BannerImage})` }}
      ></div>
      <div className="flex flex-col items-center text-center aboutBottom h-3/5 bg-pink text-navy-blue">
        <h1 className="py-2 text-3xl xs:text-4xl md:text-4xl md:py-5 lg:text-5xl lg:py-8 xl:text-6xl">ABOUT US</h1>
        <p className="w-4/5 xxs:text-lg xs:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
          HappyPlate is an app that provides nutritional recommenations to users based on
          several different factors and calculates your daily caloric needs. Search thousands 
          of foods and beverages and get the in-depth nutritional information you need!
        </p>
      </div>
    </div>
  );
};

export default About;
