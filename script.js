async function getData(City_name) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${City_name}&appid=0ebf3fd9e1f7be2efd81d7d1eaa1418a&units=metric`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        // console.log("try",result);
        // console.log(result.name);  
        // console.log(result.sys.country);  
        // console.log(result.main.temp);  
        return result;
    } catch (error) {
        console.error(error.message);
    }


}



function handleChanges(data) {

    const now = new Date();

    const options = {
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    let formattedTime = now.toLocaleString('en-US', options);

    // Remove the space between time and AM/PM and convert to lowercase
    formattedTime = formattedTime.replace(/(\w{3}) (\d{2}), (\d{2}:\d{2})\s(AM|PM)/,
        (match, month, day, time, period) => {
            return `${month.charAt(0).toUpperCase()}${month.slice(1)} ${day}, ${time}${period.toLowerCase()}`;
        });
    // console.log(formattedTime);

    const currTime = document.querySelector(".current-time span");
    currTime.textContent = `${formattedTime}`;

    const cityName = document.querySelector(".city-name h2");
    cityName.textContent = `${data.name}, ${data.sys.country}`;

    let weatherType = data.weather[0].description;
    weatherType=weatherType.replace(/\s+/g, '');
    console.log(weatherType);

    document.querySelector(`#${weatherType}`).style.display='block';

    const cityTemperature = document.querySelector(".temperature h2");
    cityTemperature.textContent = `${data.main.temp} °C`;

    const climateCondition = document.querySelector(".climate-condition p");
    const describe = data.weather[0].description;
    climateCondition.textContent = `Feels like ${data.main.feels_like}°C. ${describe.charAt(0).toUpperCase()}${describe.slice(1)}`;

    // console.log(data.wind.speed)

    const windSpeed = document.querySelector(".speed span");
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
    // console.log(windSpeed);


    const visibility = document.querySelector(".visibility span");
    let visibilityData = data.visibility;
    if (visibilityData >= 1000) {
        visibilityData = (visibilityData / 1000).toPrecision(3);
        visibility.textContent = `Visibility: ${visibilityData}km`;
    }
    else {
        visibility.textContent = `Visibility: ${visibilityData}m`;
    }
    // console.log(visibility);


    const humid = document.querySelector(".humid span");
    humid.textContent = `Humidity: ${data.main.humidity}%`;
    // console.log(humid);

    const pressure = document.querySelector(".pressure span");
    pressure.textContent = `Pressure: ${data.main.humidity}hPa`;
    // console.log(data.main.pressure);

}

async function handleSubmit(e) {
    e.preventDefault();
    const input = document.getElementById("city-name");
    const inputValue = input.value;
    // console.log("InputValue", inputValue);
    // alert("The form was submitted");
    const data = await getData(inputValue);
    // console.log("result", data);
    handleChanges(data);

}