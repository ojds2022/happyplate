import React, { useState } from "react";
import {Link} from "react-router-dom";
import BackgroundImage from "../assets/foodIcons.png";
import '../styles/Home.css';

import { useTdee } from "../components/TdeeContext";


const UserInfo = () => {
    const [showRecCalIntake, setShowRecCalIntake] = useState(false);
    const { tdee, setTdee } = useTdee();

    const sedentary = 1.2;
    const lightActivite = 1.375;
    const modActivite = 1.55;
    const veryActive = 1.725;

    const exWeightLoss = 0.7;
    const weightLoss = 0.85;
    const weightGain = 1.15;
    const exWeightGain = 1.3;

    const getUserInput = (event) => {
        event.preventDefault(); // Prevent the default form submission

        setShowRecCalIntake(true);
        const age = document.querySelector("#userAge");
        const weight = document.querySelector("#userWeight");
        const heightFeet = document.querySelector("#userHeightFeet");
        const heightInches = document.querySelector("#userHeightInches");
        const activityLevel = document.querySelector("#activity-level");
        const weightChange = document.querySelector("#weight-change");
        const male = document.querySelector('#male');

        {/*male.addEventListener ('click', (e) => {
            console.log('male was clicked');
        });*/}
       
        const userAgeNum = parseInt(age.value);
        const userWeightKG = parseFloat(weight.value) * 0.45359;
        const userHeightCM = (parseFloat(heightFeet.value) + (parseFloat(heightInches.value) / 12)) * 30.48;
        const userActivityLevel = activityLevel.value;
        const userWeightChange = weightChange.value;
        const userBMR = (10 * userWeightKG) + (6.25 * userHeightCM) - (5 * userAgeNum) + 5;

        if (userActivityLevel === 'sedentary' && userWeightChange === 'extreme weight loss') {
            setTdee(Math.round(sedentary * exWeightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'sedentary' && userWeightChange === 'weight loss') {
            setTdee(Math.round(sedentary * weightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'sedentary' && userWeightChange === 'maintain weight') {
            setTdee(Math.round(sedentary * userBMR));
            return;
        } else if (userActivityLevel === 'sedentary' && userWeightChange === 'weight gain') {
            setTdee(Math.round(sedentary * weightGain * userBMR));
            return;
        } else if (userActivityLevel === 'sedentary' && userWeightChange === 'extreme weight gain') {
            setTdee(Math.round(sedentary * exWeightGain * userBMR));
            return;
        }  else if (userActivityLevel === 'lightly active' && userWeightChange === 'extreme weight loss') {
            setTdee(Math.round(lightActivite * exWeightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'lightly active' && userWeightChange === 'weight loss') {
            setTdee(Math.round(lightActivite * weightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'lightly active' && userWeightChange === 'maintain weight') {
            setTdee(Math.round(lightActivite * userBMR));
            return;
        } else if (userActivityLevel === 'lightly active' && userWeightChange === 'weight gain') {
            setTdee(Math.round(lightActivite * weightGain * userBMR));
            return;
        } else if (userActivityLevel === 'lightly active' && userWeightChange === 'extreme weight gain') {
            setTdee(Math.round(lightActivite * exWeightGain * userBMR));
            return;
        } else if (userActivityLevel === 'moderately active' && userWeightChange === 'extreme weight loss') {
            setTdee(Math.round(modActivite * exWeightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'moderately active' && userWeightChange === 'weight loss') {
            setTdee(Math.round(modActivite * weightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'moderately active' && userWeightChange === 'maintain weight') {
            setTdee(Math.round(modActivite * userBMR));
            return;
        } else if (userActivityLevel === 'moderately active' && userWeightChange === 'weight gain') {
            setTdee(Math.round(modActivite * weightGain * userBMR));
            return;
        } else if (userActivityLevel === 'moderately active' && userWeightChange === 'extreme weight gain') {
            setTdee(Math.round(modActivite * exWeightGain * userBMR));
            return;
        } else if (userActivityLevel === 'very active' && userWeightChange === 'extreme weight loss') {
            setTdee(Math.round(veryActive * exWeightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'very active' && userWeightChange === 'weight loss') {
            setTdee(Math.round(veryActive * weightLoss * userBMR));
            return;
        } else if (userActivityLevel === 'very active' && userWeightChange === 'maintain weight') {
            setTdee(Math.round(veryActive * userBMR));
            return;
        } else if (userActivityLevel === 'very active' && userWeightChange === 'weight gain') {
            setTdee(Math.round(veryActive * weightGain * userBMR));
            return;
        } else if (userActivityLevel === 'very active' && userWeightChange === 'extreme weight gain') {
            setTdee(Math.round(veryActive * exWeightGain * userBMR));
            return;
        }
    }

    return (
        <div className="flex flex-col h-screen bg-center bg-50% bg-sky-blue home" style={{ backgroundImage: `url(${BackgroundImage})` }} >
            {showRecCalIntake === true ? (
                <>
                <div className="grid h-full drop-shadow-xl">
                    <div className="w-10/12 text-center place-self-center bg-corn-silk md:w-8/12 rounded-xl">
                        <h2 className="mt-3 text-hot-pink xs:text-lg lg:text-2xl">Your daily caloric intake recommendation is</h2>
                        <p className="text-3xl font-bold text-hot-pink lg:mt-4">{tdee}</p>
                        <Link to="/nutritionBreakdown">
                            <button
                                id="searchButton"
                                className="w-1/2 h-8 my-2 border-0 rounded shadow-md cursor-pointer xxs:h-10 lg:h-12 xl:h-16 lg:rounded-lg lg:mt-8 lg:mb-4 xl:my-8 xl:text-3xl lg:text-xl xxs:my-4 place-self-center bg-hot-pink hover:bg-pale-green"
                                type="submit"
                            >
                                Continue
                            </button>
                        </Link>
                    </div>
                </div>
                </>
            ) : (
                <div className="grid h-full place-content-center">
                    <div className="flex flex-col drop-shadow-xl">
                        <div className="w-10/12 py-1 place-self-center bg-corn-silk rounded-xl">
                            <h2 className="p-2 text-lg font-bold text-center lg:p-4 xl:p-8 xxs:text-xl lg:text-2xl xl:text-4xl text-hot-pink">
                                Please enter your:
                            </h2>
                            <form onSubmit={getUserInput} className="py-0">
                                <div className="flex flex-col">
                                    <div className="pb-2 xxs:pb-4 lg:pb-8 xl:pb-4">
                                        <span className="pr-3 text-hot-pink lg:text-xl xl:text-2xl">Age</span>
                                        <input id="userAge" className="w-2/3" type="text" placeholder="years" required />
                                    </div>
                                    {/*<div className="">
                                        <div id="radio-buttons">
                                            <span className="pr-3 text-hot-pink">Sex</span>
                                            <label for="male" className="radio-inline">Male</label>
                                            <input type="radio" id="male" name="sex" value="male" className="" />
                                            <label for="female" className="radio-inline">Female</label>
                                            <input type="radio" id="female" name="sex" value="female" className="" />
                                        </div>
                    </div>*/}
                                    <div className="pb-2 xxs:pb-4 lg:pb-8 xl:pb-4">
                                        <span className="pr-3 text-hot-pink lg:text-xl xl:text-2xl">Weight</span>
                                        <input id="userWeight" className="w-2/3" type="text" placeholder="pounds" required />
                                    </div>
                                    <div className="pb-2 xxs:pb-4 lg:pb-8 xl:pb-4">
                                        <span className="pr-3 text-hot-pink lg:text-xl xl:text-2xl">Height</span>
                                        <span className="pr-1 lg:pr-4">
                                            <input id="userHeightFeet" className="w-1/3" type="text" placeholder="feet" required />
                                        </span>
                                        <span className="">
                                            <input id="userHeightInches" className="w-1/3" type="text" placeholder="inches" required />
                                        </span>
                                    </div>
                                    <div className="pb-2 text-center xxs:pb-4 lg:pb-8 xl:pb-4">
                                        <label for="pet-select" className="text-hot-pink lg:text-xl xl:text-2xl lg:pr-2">Activity Level</label>
                                        <select name="activityLevel" id="activity-level" required>
                                            <option value="">--Please choose an option--</option>
                                            <option value="sedentary">Sedentary</option>
                                            <option value="lightly active">Lightly Active</option>
                                            <option value="moderately active">Moderately Active</option>
                                            <option value="very active">Very Active</option>
                                        </select>
                                    </div>
                                    <div className="text-center">
                                        <label for="pet-select" className="text-hot-pink lg:text-xl xl:text-2xl">Desired Weight Change</label>
                                        <select name="weightChange" id="weight-change" required>
                                            <option value="">--Please choose an option--</option>
                                            <option value="extreme weight loss">Fast Weight Loss - 2 lb/wk</option>
                                            <option value="weight loss">Weight Loss - 1 lb/wk</option>
                                            <option value="maintain weight">Maintain Weight</option>
                                            <option value="weight gain">Weight Gain - 1 lb/wk</option>
                                            <option value="extreme weight gain">Fast Weight Gain - 2 lb/wk</option>
                                        </select>
                                    </div>
                                </div>
                                <button
                                    id="searchButton"
                                    className="w-1/2 h-8 my-2 border-0 rounded shadow-md cursor-pointer xxs:h-10 lg:h-12 xl:h-16 lg:rounded-lg lg:mt-8 lg:mb-4 xl:my-8 xl:text-3xl lg:text-xl xxs:my-4 place-self-center bg-hot-pink hover:bg-pale-green"
                                    type="submit"
                                >
                                    Continue
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export { UserInfo };