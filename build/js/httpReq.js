const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const API_KEY = "791cc74debf5e427b88833f3c7733835";

async function FetchWeatherData(city) {
    const url = `${BASE_URL}weather?q=${city}&appid=${API_KEY}&units=metric`;
    const Response = await fetch(url);
    const Json = await Response.json();
    return Json;
}

async function FetchForecastData(city) {
    const url = `${BASE_URL}forecast?q=${city}&appid=${API_KEY}&units=metric`;
    const Response = await fetch(url);
    const Json = await Response.json();
    return Json;
}

export { FetchWeatherData, FetchForecastData };
