/* eslint-disable react/jsx-pascal-case */
import "./App.css";
import Globe_UrlUp from "./component/Globe_UrlUp";
import SearchWeather from "./component/SearchWeather";

function App() {
  return (
    <div
      className="d-flex justify-content-between App "
      style={{ height: "100vh", backgroundImage: "url(sky.jpg)" }}
    >
      <SearchWeather />
      <Globe_UrlUp />
    </div>
  );
}

export default App;
