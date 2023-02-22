import "./weather.css";
import TopButtons from "./TopButtons";
import Inputs from "./Inputs";
import TimeAndLocation from "./TimeAndLocation";
import TemperatureAndDetails from "./TempAndDetails";
import Forecast from "./Forecast";
import getFormattedWeatherData from "../../services/weatherService";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [query, setQuery] = useState({ q: "Las Vegas" });
  const [units, setUnits] = useState("imperial");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      //const message = query.q ? query.q : "current location.";

      //toast.info("Fetching weather for " + message);

      await getFormattedWeatherData({ ...query, units }).then((data) => {
        toast.success(
          `Successfully fetched weather for ${data.name}, ${data.country}.`
        );

        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  const formatBackground = () => {
    if (!weather) return "from-cyan-700 to-blue-700";
    const threshold = units === "metric" ? 20 : 60;
    if (weather.temp <= threshold) return "from-cyan-700 to-blue-700";

    return "from-yellow-700 to-orange-700";
  };

  return (
    <div
      className={`mx-auto max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br  h-fit shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div className="row text-center">
          <TimeAndLocation weather={weather} />
          <div className="temp-div">
            <div class="row text-center">
              <TemperatureAndDetails weather={weather} />
            </div>
          </div>
          <div className="scrollable-div">
            <div class="row text-center">
              <Forecast title="hourly forecast" items={weather.hourly} />
            </div>
          </div>
          <div className="scrollable-div">
            <div class="row text-center">
              <Forecast title="daily forecast" items={weather.daily} />
            </div>
          </div>
        </div>
      )}

      <ToastContainer autoClose={5000} theme="colored" newestOnTop={true} />
    </div>
  );
}

export default App;
