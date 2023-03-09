import React, { useEffect, useState } from "react";
export default function SearchWeather() {
  const [search, setsearch] = useState("Tangier");
  const [dataa, setdataa] = useState([]);
  const [input, setinput] = useState("");
  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=440c153141b54b3332c4b30ef8b71c99`
    )
      .then((response) => response.json())
      .then((data) => setdataa(data))
      .catch((error) => console.error(error));
  }, [search]);
  let emoji = null;
  if (typeof dataa.main != "undefined") {
    if (dataa.weather[0].main === "Clouds") {
      emoji = "fa-cloud";
    } else if (dataa.weather[0].main === "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (dataa.weather[0].main === "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (dataa.weather[0].main === "Rain") {
      emoji = "fa-cloud-shower-heavy";
    } else if (dataa.weather[0].main === "SNow") {
      emoji = "fa-cloud-flake";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>...Loading</div>;
  }

  let temp = (dataa.main.temp - 273.15).toFixed(2);
  let temp_min = (dataa.main.temp_min - 273.15).toFixed(2);
  let temp_max = (dataa.main.temp_max - 273.15).toFixed(2);

  let d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  return (
    <div className="col-4 mt-5 rounded" style={{ marginLeft: "10rem" }}>
      <div className="card text-white text-center border-0">
        <img
          src={`https://source.unsplash.com/600x900/?${dataa.weather[0].main}`}
          className="card-img"
          alt="..."
          style={{ width: "100%", height: "80vh" }}
        />
        <div className="card-img-overlay">
          {/* <form> */}
          <div className="input-group mb-3 w-75 mx-auto">
            <input
              type="search"
              className="form-control border"
              placeholder="Search City..."
              aria-label="Search City..."
              aria-describedby="basic-addon2"
              name="search"
              value={input}
              onChange={(e) => {
                setinput(e.target.value);
              }}
              required
            />
            <button
              className="input-group-text btn"
              style={{ backgroundColor: "#4D23DF", color: "white" }}
              id="basic-addon2"
              onClick={() => {
                setsearch(input);
              }}
            >
              <i className="fas fa fa-search"></i>
            </button>
          </div>
          <div className="bg-dark bg-opacity-50 py-3">
            <h2 className="card-title">{dataa.name}</h2>
            <p className="card-text lead">
              {day}, {month} {date}, {year}
              <br />
              {time}
            </p>
            <hr />
            <i className={`fas ${emoji} fa-4x`}></i>
            <h1 className="fw-bolder mb-5">{temp} &deg;C</h1>
            <p className="lead fw-bolder mb-0">{dataa.weather[0].main}</p>
            <p className="lead">
              {temp_min}&deg;C | {temp_max}&deg;C
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
