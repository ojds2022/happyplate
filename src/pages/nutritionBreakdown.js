import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { Chart as ChartJS, ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import BackgroundImage from "../assets/foodIcons.png";
import '../styles/Home.css';

import { useTdee } from "../components/TdeeContext";

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const barChartOptions = {
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
  interaction: {
    mode: 'index',
    intersect: false,
  },
  scales: {
    x: {
      stacked: false,
    },
    y: {
      stacked: true,
    },
  },
  
};

export const pieChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: false,
      text: 'Nutritional Percentage',
    },
  },
};

const NutritionBreakdown = () => {
  const { tdee } = useTdee();
  const [showLabel, setShowLabel] = useState(false);
  const [name, setName] = useState("");

  const [previousCals, setPreviousCals] = useState('');
  const [previousCarbs, setPreviousCarbs] = useState('');
  const [previousProtein, setPreviousProtein] = useState('');
  const [previousFats, setPreviousFats] = useState('');
  const [previousSugar, setPreviousSugar] = useState('');

  const [barChartData, setBarChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Dataset 1',
        data: [],
        backgroundColor: [],
      },
    ],
  });

  const [pieChartData, setPieChartData] = useState({
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

    //takes the input from user and gives the data on current food/beverage
    const totalCals = data.calories;
    const carbCals = data.carbohydrates_total_g * 4;
    const proteinCals = data.protein_g * 4;
    const fatCals = data.fat_total_g * 9;
    const sugarCals = data.sugar_g * 4;

    //takes the data from the current food/beverage and adds it to the previous food/beverage
    setPreviousCals(Number(totalCals) + Number(previousCals));
    setPreviousCarbs(Number(carbCals) + Number(previousCarbs));
    setPreviousProtein(Number(proteinCals) + Number(previousProtein));
    setPreviousFats(Number(fatCals) + Number(previousFats));
    setPreviousSugar(Number(sugarCals) + Number(previousSugar));

    //adds up the total of the previous food/beverage data and adds it to the grand total data
    const cumulativeCals = previousCals + totalCals;
    const cumulativeCarbs = previousCarbs + carbCals;
    const cumulativeProteins = previousProtein + proteinCals;
    const cumulativeFats = previousFats + fatCals;
    const cumulativeSugars = previousSugar + sugarCals;

    setBarChartData({
      labels: ['Calories', 'Carbs', 'Protein', 'Fats', 'Sugars',], 
      datasets: [
        {
          label: 'Current total',
          data: [cumulativeCals, cumulativeCarbs, cumulativeProteins, cumulativeFats, cumulativeSugars],
          backgroundColor: [
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
          ],
          hoverBackgroundColor: [
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
            'rgba(0, 255, 0, 1)',
          ],
          stack: 'Stack 0',
        },
        {
          label: 'RDA',
          data: [tdee - cumulativeCals, (tdee * 0.55) - cumulativeCarbs, (tdee * 0.15) - cumulativeProteins, (tdee * 0.3) - cumulativeFats, (tdee * .1) - cumulativeSugars],
          backgroundColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          hoverBackgroundColor: [
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
          ],
          stack: 'Stack 0',
        },
      ],
    });

    setPieChartData({
      labels: ['Carbs','Protein', 'Fats', 'Sugars'],
      datasets: [
        {
          label: 'percentage',
          data: [data.carbohydrates_total_g, data.protein_g, data.fat_total_g, data.sugar_g],
          backgroundColor: [
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(75, 192, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
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

  setShowLabel(true);
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
    className="bg-center bg-50% lg:h-screen bg-sky-blue home"
    style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
    {showLabel === true ? (
        <div className='flex flex-col flex-wrap py-24 lg:flex-row'>
          <div className="flex-1 md:w-3/4 lg:w-4/5 md:mx-auto 2xl:mt-20">
            <div className="m-5 rounded-md drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-lg font-bold .home">Daily Nutritional Targets</h2></div>
            <div className="mx-2 rounded lg:pt-20 bg-opacity-90 bg-sky-blue"><Bar options={barChartOptions} data={barChartData} /></div>
          </div>
          <div className="flex-1 mt-20 md:w-3/4 md:mx-auto lg:w-1/5 lg:mt-0 2xl:mt-20">
            <div className="m-5 rounded-md drop-shadow-xl bg-hot-pink"><h2 className="text-center text-white text-xl font-bold .home">Nutritional Percentage: <span className="capitalize">{name}</span></h2></div>
            <div className="mx-3 rounded md:pt-20 lg:pl-16 xl:pl-44 lg:h-5/6 bg-opacity-90 bg-sky-blue"><Pie options={pieChartOptions} data={pieChartData} /></div>
          </div>
          <div className="mx-auto mt-5 lg:w-full lg:grid lg:place-content-center">
            <button 
              id='searchAgain' 
              className='w-24 border-0 rounded cursor-pointer xxs:text-xl xxs:w-32 xxs:h-8 xl:w-40 xl:h-10 xl:text-xl 3xl:w-72 3xl:h-20 3xl:text-4xl xl:rounded-lg 3xl:rounded-2xl'
              title='add more foods/beverages to your daily nutritional targets'
              onClick={() => setShowLabel(false)}
            >
                    Add more
            </button>
          </div>
        </div>
    ) : (
        <div className="grid h-screen">
          <div className="w-10/12 p-5 mb-32 text-center lg:w-1/2 drop-shadow-xl place-self-center bg-corn-silk md:w-8/12 rounded-xl">
            <h2 className="mx-auto mb-3 text-xl rounded xs:text-2xl lg:text-3xl xl:text-4xl 3xl:text-6xl 3xl:p-4 text-hot-pink">
                Enter a food or beverage to get nutritional information and add it to your daily nutritional targets!
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
