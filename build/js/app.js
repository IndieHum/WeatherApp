import { FetchForecastData, FetchWeatherData } from "./httpReq.js";

const SearchButton = document.getElementById("search");
const SearchInput = document.getElementById("search-input");
const WeatherContainer = document.getElementById("weather");
const ForecastContainer = document.getElementById("forecast");

const DAYS = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];

function RenderWeatherData(data) {
    console.log(data);
    WeatherContainer.innerHTML = "";
    const weatherJSX = `
        <div class="text-3xl">${data.name} ,${data.sys.country}</div>
        <div class="flex gap-4 items-center">
            <img src="https://openweathermap.org/img/w/${
                data.weather[0].icon
            }.png" alt="status" /> 
            <span>${data.weather[0].main}</span>
            <span>${Math.trunc(data.main.temp)} °C</span>
        </div>
        <div class="flex justify-between w-full">
            <a>Humidity: ${data.main.humidity} %</a>
            <a>Wind Speed: ${data.wind.speed} m/s</a>
        </div>
    `;
    WeatherContainer.innerHTML = weatherJSX;
}

function RenderForecastData(data) {
    ForecastContainer.innerHTML = "";
    const FutureDays = data.list.filter((obj) =>
        obj.dt_txt.endsWith("00:00:00")
    );
    console.log(FutureDays);
    FutureDays.forEach((i) => {
        const forecastJSX = `
            <div class="bg-white rounded-xl flex items-center flex-col text-xl w-1/5 mx-2 py-4 shadow-2xl">
                <img src="https://openweathermap.org/img/w/${
                    i.weather[0].icon
                }.png" />
                <h1>${DAYS[new Date(i.dt * 1000).getDay()]}</h1>
                <span>${Math.trunc(i.main.temp)} °C</span>
                <p>${i.weather[0].main}</p>
            </div>
        `;
        ForecastContainer.innerHTML += forecastJSX;
    });
}

async function GetUserData() {
    const CityName = SearchInput.value || "tehran";
    if (!CityName) alert("wrong input");

    const WrittenCityNameWeather = await FetchWeatherData(CityName);
    RenderWeatherData(WrittenCityNameWeather);
    const WrittenCityNameForecast = await FetchForecastData(CityName);
    RenderForecastData(WrittenCityNameForecast);
}

document.addEventListener("DOMContentLoaded", GetUserData);
SearchButton.addEventListener("click", GetUserData);
