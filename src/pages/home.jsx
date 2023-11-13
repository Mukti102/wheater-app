import * as React from "react";
import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "./Card";
import Current from "./Current";
import Input from "./Input";
import axios from "axios";
import { connect } from "react-redux";

function Home({ globalData, getData }) {
  const [inputCity, setInputCity] = React.useState("");
  const url = `http://api.weatherapi.com/v1/forecast.json?key=c85a7a89639845f4ae344951231211&q=${inputCity}&days=4&aqi=no&alerts=no`;

  React.useEffect(() => {
    async function getdata() {
      try {
        const res = await axios.get(url);
        getData(res);
        console.log(res);
      } catch (err) {
        console.log("error", err);
        alert("Kota tidak di temukan");
      }
    }
    getdata();
  }, [inputCity]);
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
      <div className="my-4">
        <h1 className="ml-10 text-slate-200 font-semibold mb-2">Perkiraan</h1>
      </div>
      {/* scroll card */}
      <Card />
      <div className="w-[80%]  h-20 bg-slate-100 flex items-center mx-auto rounded-3xl bottom-0 justify-between gap-5 px-6">
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
          <FontAwesomeIcon icon={faUser} className="text-2xl text-slate-500" />
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
