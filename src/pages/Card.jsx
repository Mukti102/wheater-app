import React, { useEffect, useState } from "react";
import Sun from "../assets/Sun.png";
import { connect } from "react-redux";

function Card({ data }) {
  const [forecast, setForecast] = useState("");
  async function getData(data) {
    if (data) {
      const dataS = await data.data.forecast.forecastday;
      setForecast(dataS);
    } else {
      setForecast(null);
    }
  }
  useEffect(() => {
    getData(data);
  }, [data]);
  return (
    <div className="w-full h-max relative mb-20 ">
      <div className="scroll-bar w-screen overflow-x-scroll pl-6">
        <div className="w-fit flex gap-2 h-max">
          {forecast ? (
            forecast.map((item, index) => (
              <div
                className="w-52 h-[140px] flex flex-col gap-3 bg-slate-800 rounded-3xl bg-opacity-50 p-4"
                key={index}
              >
                <div className="flex gap-1 items-center justify-start">
                  <div className="w-12">
                    <img
                      src={item.day.condition.icon}
                      alt=""
                      className="w-full"
                    />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">{item.date}</p>
                    <h1 className="text-[12px] text-slate-50">
                      {item.day.condition.text}
                    </h1>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="-space-y-0">
                    <p className="text-blue-500 text-[11px]">wind</p>
                    <h1 className="text-slate-200 text-[18px] ">
                      {item.day.maxwind_kph}
                    </h1>
                  </div>
                  <div className="-space-y-0">
                    <p className="text-blue-500 text-[10px]">Temp</p>
                    <h1 className="text-slate-200 text-[18px] ">
                      {item.day.maxtemp_c}°c
                    </h1>
                  </div>
                  <div className="-space-y-0">
                    <p className="text-blue-500 text-[9px]">Humidity</p>
                    <h1 className="text-slate-200 text-[18px] ">
                      {item.day.avghumidity}%
                    </h1>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-fit flex gap-2 h-max">
              <div className="w-52 h-[140px] flex flex-col gap-3 bg-slate-800 rounded-3xl bg-opacity-50 p-4">
                <div className="flex gap-1 items-center justify-start">
                  <div className="w-12">
                    <img src={Sun} alt="" className="w-full" />
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400">Location</p>
                    <h1 className="text-lg text-slate-50">Jakarta</h1>
                  </div>
                </div>
                <div className="flex justify-around">
                  <div className="-space-y-1">
                    <p className="text-blue-500 text-[11px]">wind</p>
                    <h1 className="text-slate-200 text-2xl ">128</h1>
                  </div>
                  <div className="-space-y-1">
                    <p className="text-blue-500 text-[11px]">wind</p>
                    <h1 className="text-slate-200 text-2xl ">128</h1>
                  </div>
                  <div className="-space-y-1">
                    <p className="text-blue-500 text-[11px]">wind</p>
                    <h1 className="text-slate-200 text-2xl ">128</h1>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <div className="w-7 h-full bg-gradient-to-r from-second  to-transparent top-0 left-0  absolute"></div> */}
      <div className="w-9 h-full bg-gradient-to-l from-primary  to-transparent top-0 right-0  absolute"></div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, null)(Card);
