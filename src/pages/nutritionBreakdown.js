import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import BackgroundImage from "../assets/foodIcons.png";
import '../styles/Home.css';

import { useTdee } from "../components/TdeeContext";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

export const barOptions = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Chart.js Bar Chart',
    },
  },
};

const NutritionBreakdown = () => {
  const { tdee } = useTdee();
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

  const [barChartData, setBarChartData] = useState({
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
    console.log(tdee);
    
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

    setBarChartData({
      labels: ['Calories', 'Carbs', 'Protein', 'Fats', 'Sugars', 'Sodium', 'Potassium'],
      datasets: [
        {
          label: '',
          data: [data.calories, data.carbohydrates_total_g, data.protein_g, data.fat_total_g, data.sugar_g, data.sodium_mg / 1000, data.potassium_mg / 1000],
          backgroundColor: [
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 0, 255, 0.7),',
            'rgba(89, 45, 134, 0.7)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 0, 255, 1),',
            'rgba(89, 45, 134, 1)'
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
        <div className='grid grid-rows-2 py-28'>
          <div className="">
            <div className="text-center"><h1 className="mb-1 text-3xl font-bold text-white capitalize">{name}</h1></div>
            <div className="m-5 rounded-md drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-lg font-bold .home">Nutritional Breakdown (100g)</h2></div>
            <div className=""><Bar options={barOptions} data={barChartData} /></div>
          </div>
          <div>
            <div className="m-5 rounded-md drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-xl font-bold .home">Nutritional Percentage</h2></div>
            <div className=""><Pie options={options} data={chartData} /></div>
            {/* <div className="my-5 rounded-md drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-xl font-bold .home">More Data</h2></div>
            <div className=""><Bar options={barOptions} data={barChartData} /></div> */}
          </div>
        </div>
        {/* <div className="z-20 grid content-center">
            <span className='place-self-center'>
                <Link to='/'>
                    <button id='searchAgain' className='w-24 h-6 mt-4 ml-1 border-0 rounded cursor-pointer xxs:text-xl xxs:w-32 xxs:h-8 xl:w-40 xl:h-10 xl:text-xl 3xl:w-72 3xl:h-20 3xl:text-4xl xl:rounded-lg 3xl:rounded-2xl' >Add more</button>
                </Link>
            </span>
        </div> */}
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
