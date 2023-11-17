import React from "react";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import cuaca from "../assets/cuaca.png";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
function Current({ data }) {
  const [forecast, setForecast] = useState("");
  // const wheaterText = () => {
  //   if (data) {
  //     return data.data.current.condition.text;
  //   } else {
  //     return "Cuaca";
  //   }
  // };
  // const temp = () => {
  //   if (data) {
  //     return data.data.current.temp_c;
  //   } else {
  //     return "0";
  //   }
  // };
  // const wind = () => {
  //   if (data) {
  //     return data.data.current.wind_degree;
  //   } else {
  //     return "0";
  //   }
  // };
  // const humidity = () => {
  //   if (data) {
  //     return data.data.current.humidity;
  //   } else {
  //     return "0";
  //   }
  // };

  async function getData(data) {
    if (data) {
      const dataS = await data.data;
      setForecast(dataS);
    } else {
      setForecast(null);
    }
  }
  useEffect(() => {
    getData(data);
  }, [data]);

  const wheaterText = () => {
    if (forecast) {
      return forecast.current.condition.text;
    } else {
      return "Cuaca";
    }
  };
  return forecast ? (
    <div>
      <div className="px-10 w-max mx-auto ">
        <h1 className="text-[50px] mt-7  font-semibold text-slate-50">
          {forecast.location.name}
        </h1>
      </div>
      <div className="w-full justify-center  gap-5 flex items-center mb-4">
        <div className="w-1/2">
          <img
            src={forecast.current.condition.icon}
            alt=""
            className="w-full"
          />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="-space-y-1">
            <p className="text-sm text-blue-500 ">Wind</p>
            <h1 className="text-2xl text-white">
              {forecast.current.wind_degree}
            </h1>
          </div>
          <div className="-space-y-1">
            <p className="text-sm text-blue-500">Humidt</p>
            <h1 className="text-2xl text-white">
              {forecast.current.humidity}%
            </h1>
          </div>
          <div className="flex gap-1 items-end">
            <p className="text-sm text-blue-500">Detailed</p>
            <Link to={"/detailed"}>
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                className="text-sm text-blue-500"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto w-max">
        <h1 className="text-3xl text-slate-100 font-semibold">
          {wheaterText()}
        </h1>
      </div>
    </div>
  ) : (
    <div>
      <div className="px-10 w-max mx-auto ">
        <h1 className="text-[50px] mt-7  font-semibold text-slate-50">Kota</h1>
      </div>
      <div className="w-full justify-center  gap-5 flex items-center mb-1">
        <div className="w-[65%]">
          <img src={cuaca} alt="" className="w-full" />
        </div>
        <div className="flex flex-col gap-[5px]">
          <div className="-space-y-1">
            <p className="text-sm text-blue-500 ">Wind</p>
            <h1 className="text-2xl text-white">0</h1>
          </div>
          <div className="-space-y-1">
            <p className="text-sm text-blue-500">Humidt</p>
            <h1 className="text-2xl text-white">0%</h1>
          </div>
          <div className="flex gap-1 items-end">
            <p className="text-sm text-blue-500">Detailed</p>
            <button>
              <FontAwesomeIcon
                icon={faUpRightFromSquare}
                className="text-sm text-blue-500"
              />
            </button>
          </div>
        </div>
      </div>
      <div className="mx-auto w-max">
        <h1 className="text-3xl text-slate-100 font-semibold">cuaca</h1>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, null)(Current);
