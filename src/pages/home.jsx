import * as React from "react";
import {
  faCloudBolt,
  faHouse,
  faLayerGroup,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../atom/Card";
import Current from "../atom/Current";
import Input from "../atom/Input";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

// Initialize AOS in your component
AOS.init({
  // Global settings:
  // disable: "mobile", // disable animation on mobile devices
  duration: 800, // animation duration in milliseconds
  easing: "ease-in-out", // animation easing
});

function Home({ globalData, getData }) {
  const [inputCity, setInputCity] = React.useState("Jakarta");
  const url = `http://api.weatherapi.com/v1/forecast.json?key=c85a7a89639845f4ae344951231211&q=${inputCity}&days=4&aqi=no&alerts=no`;

  React.useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get(url);
        getData(res);
        localStorage.setItem("setData", JSON.stringify(res));
      } catch (err) {
        if (err.message == "Network Error") {
          alert("Kamu sedang ofoline, cek jaringan mu");
        } else if (err.message == "Request failed with status code 400") {
          alert(
            "Kota tidak di temukan pastikan anda masukkan nama kota yag benar"
          );
        }
        console.log(err);
      }
    }
    getdata();
    AOS.refresh();
  }, [inputCity]);
  console.log("redux-reducer", globalData);
  const catchData = (data) => {
    setInputCity(data);
  };
  return (
    <div className="inline-block w-full mx-0 bg-gradient-to-bl from-primary to-second h-screen relative">
      {/* Input */}
      {/* <div className="w-screen h-screen"> */}
      <Input onDataFromInput={catchData} />
      <Current />
      {/* other city */}

      {/* scroll card */}
      <Card />
      <div
        // data-aos="fade-up"
        // data-aos-duration="1000"
        className="w-[80%]  h-20 bg-slate-100 flex items-center mx-auto rounded-3xl bottom-0 justify-between gap-5 px-6"
      >
        <div className="flex items-center justify-center">
          <div className="w-max px-3 py-3 rounded-xl bg-gradient-to-r from-primary to-second flex items-center gap-2">
            <FontAwesomeIcon
              icon={faHouse}
              className="regular text-[20px] text-slate-200"
            />
            <span className="text-sm text-slate-300 font-semibold">Home</span>
          </div>
        </div>
        <div>
          <Link to="/detailed">
            <FontAwesomeIcon
              icon={faCloudBolt}
              className="text-2xl text-slate-400"
            />
          </Link>
        </div>
        <div>
          <FontAwesomeIcon
            icon={faLayerGroup}
            className="text-2xl text-slate-400"
          />
        </div>
        <div>
          <FontAwesomeIcon icon={faUser} className="text-2xl text-slate-400" />
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}

const mapStateToProps = (state) => ({
  globalData: state.data,
});
const mapDispatchToProps = (dispatch) => ({
  getData: (data) => dispatch({ type: "GET_DATA", value: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
