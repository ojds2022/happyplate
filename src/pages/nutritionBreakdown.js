import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import BackgroundImage from "../assets/foodIcons.png";
import '../styles/Home.css';

ChartJS.register(ArcElement, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Nutritional Breakdown',
    },
  },
};

const NutritionBreakdown = () => {
  const [showLabel, setShowLabel] = useState(false);
  const [name, setName] = useState("");

  {/*const [servingSize, setServingSize] = useState("");
  const [calories, setCalories] = useState("");
  const [fatTotal, setFatTotal] = useState("");
  const [fatSat, setFatSat] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [sodium, setSodium] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fiber, setFiber] = useState("");
  const [sugar, setSugar] = useState("");
  const [protein, setProtein] = useState("");
const [potassium, setPotassium] = useState("");*/}

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: '',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const fetchNutrition = async () => {
    const userInput = document.querySelector("#inputField");
    const url = `https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=${userInput.value}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '48cbe57e99msh59bbaa3d2989b86p1dd679jsn22273669dbf3',
        'X-RapidAPI-Host': 'nutrition-by-api-ninjas.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      postNutrition(result[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const postNutrition = (data) => {
    setName(data.name);
    setChartData({
      labels: ['Protein', 'Carbs', 'Fats', 'Sugars'],
      datasets: [
        {
          label: 'percentage',
          data: [data.protein_g, data.carbohydrates_total_g, data.fat_total_g, data.sugar_g],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
          ],
        },
      ],
    });
  setShowLabel(!showLabel);
  };
  
  
  useEffect(() => {
    const inputField = document.getElementById('inputField');
    if (inputField) {
      inputField.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          document.getElementById('searchButton').click();
        }
      });
    }
  },[]);

  return (
    <div
    className="h-screen bg-center bg-50% bg-sky-blue home"
    style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
    {showLabel === true ? (
        <>
        <div className='flex flex-col items-center h-screen'>
          <div className='flex-grow px-5 mt-28'>
            <div className="rounded-md  drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-xl font-bold .home">Nutritional Breakdown: {name}</h2></div>
            <div className="pt-5"><Pie options={options} data={chartData} /></div>
          </div>
        </div>
        <div className="z-20 grid content-center">
            <span className='place-self-center'>
                <Link to='/'>
                    <button id='searchAgain' className='w-24 h-6 mt-4 ml-1 border-0 rounded cursor-pointer xxs:text-xl xxs:w-32 xxs:h-8 xl:w-40 xl:h-10 xl:text-xl 3xl:w-72 3xl:h-20 3xl:text-4xl xl:rounded-lg 3xl:rounded-2xl' >Add more</button>
                </Link>
            </span>
        </div>
        </>
    ) : (
        <div className="grid h-full drop-shadow-xl">
          <div className="w-10/12 py-5 mb-32 text-center place-self-center bg-corn-silk md:w-8/12 rounded-xl">
            <h2 className="mx-auto mb-3 text-xl rounded xl:text-3xl 3xl:text-6xl 3xl:p-4 text-hot-pink">
                Enter a food or beverage to get a nutritional percentage breakdown!
            </h2>
            <input id="inputField" className="xl:w-60 xl:h-12 xl:text-2xl 3xl:w-96 3xl:h-20 3xl:text-4xl" type="text" placeholder="Enter here..." />
            <button
                id="searchButton"
                className="h-6 ml-1 border-0 rounded shadow-md cursor-pointer w-14 xl:h-12 xl:w-32 3xl:h-20 3xl:w-44 xl:text-xl 3xl:text-3xl xl:ml-3 3xl:ml-5 3xl:rounded-xl bg-hot-pink hover:bg-pale-green"
                type="submit"
                onClick={fetchNutrition}
            >
                Search
            </button>
          </div>
        </div>
    )}
    </div>
  );
};

export { NutritionBreakdown };
