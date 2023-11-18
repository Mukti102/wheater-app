import React, { useEffect, useState } from "react";
import cuaca from "../assets/cuaca.png";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import UV from "../assets/uv-index.png";
import Eye from "../assets/eye.png";
import humidity from "../assets/humidity.png";
import cloud from "../assets/cloud.png";
import blood from "../assets/blood-pressure.png";
import evaporation from "../assets/evaporation.png";

function Detailed() {
  const [detailedCurrent, setDetailedCurrent] = useState([]);
  const [detailedForecast, setDetailedForecast] = useState([]);
  const [detailedLocation, setDetailedLocation] = useState([]);
  const detailedData = JSON.parse(localStorage.getItem("setData"));
  console.log("detailed", detailedData);
  async function getDetailedData(detailedData) {
    if (detailedData) {
      const detailed = await detailedData;
      setDetailedLocation(detailed.data.location);
      setDetailedCurrent(detailed.data.current);
      setDetailedForecast(detailed.data.forecast.forecastday[1].hour);
    } else {
      setDetailedCurrent(null);
      console.log("detailedData is Empty");
    }
  }
  useEffect(() => {
    getDetailedData(detailedData);
  }, []);

  const getDate = (time) => {
    const waktuString = time;
    // Membuat objek Date dari string
    const waktu = new Date(waktuString);

    // Mendapatkan jam dan menit dari objek Date
    const hour = waktu.getHours();
    const minute = waktu.getMinutes();
    return padZero(hour) + ":" + padZero(minute);

    // Fungsi untuk menambahkan nol di depan angka jika kurang dari 10
    function padZero(nomor) {
      return nomor < 10 ? "0" + nomor : nomor;
    }
  };

  function getDateCurrent() {
    const date = new Date();
    const hour = date.getHours();
    const minutes = date.getMinutes();
    const second = date.getSeconds();
    return padZero(hour) + ":" + padZero(minutes);

    // Fungsi untuk menambahkan nol di depan angka jika kurang dari 10
    function padZero(nomor) {
      return nomor < 10 ? "0" + nomor : nomor;
    }
  }
  return (
    <div className="w-screen h-screen bg-slate-50">
      <div className="w-full h-64 bg-gradient-to-tr flex justify-center items-center from-primary to-second rounded-b-[35px]">
        <Link to="/">
          <FontAwesomeIcon
            icon={faArrowLeft}
            className="absolute top-5 left-4 text-slate-200"
          />
        </Link>
        <div className="w-[100%] flex px-10 gap-2  items-center">
          <div className="w-full h-full flex flex-col gap-3  text-slate-100">
            <div className="text-[15px] text-slate-400">
              {detailedLocation.name},{detailedLocation.region}
              <br />
              {detailedLocation.country}
            </div>
            <div className="text-4xl">{detailedCurrent.temp_c}°c</div>
          </div>
          <div className="w-[50%] text-slate-100 gap-2 flex flex-col ">
            <div className="w-full flex justify-end">
              <div className="w-[100%]">
                <img
                  // src={detailedCurrent.condition.icon}
                  alt=""
                  className="w-full"
                />
              </div>
            </div>
            <div className="w-full flex justify-end pr-3">
              <span className="text-[10px] text-slate-300">
                {getDateCurrent()} WIB
              </span>
            </div>
          </div>
        </div>
        <div></div>
      </div>
      <div className="w-full flex flex-col  gap-4 mt-8">
        <div className="w-full flex justify-between px-5">
          <h1>Perkiraan</h1>
          <button className="w-max bg-second text-slate-100  px-2 py-1 text-sm font-light rounded-md">
            Next Hour
          </button>
        </div>
        <div className="w-screen overflow-x-scroll px-4">
          <div className="w-fit flex gap-4 overflow-hidden">
            {detailedForecast.map((item, index) => {
              return (
                <div
                  className="w-28 h-44 rounded-md p-2 flex gap-2 flex-col justify-center item-center  bg-slate-200"
                  key={index}
                >
                  <span className="text-[12px] mx-auto">
                    {getDate(item.time)}
                  </span>
                  <span className="mx-auto text-[11px]">{item.temp_c}°c</span>
                  <div className="w-[60%] mx-auto">
                    <img src={item.condition.icon} alt="" className="w-full" />
                  </div>
                  <div className="w-max mx-auto text-[11px]">
                    <h1>{item.humidity}%</h1>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="w-full h-screen  flex flex-col rounded-[60px]  mt-16 shadow-custom bg-slate-100 px-8">
        <div className="w-[60px] h-[5px] bg-second mt-7 mx-auto rounded-full"></div>
        <div className="w-full h-max flex flex-wrap justify-center gap-y-0 gap-x-3">
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={UV} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">UV Index</h1>
              <span className="text-[13px]">{detailedCurrent.uv} of 10</span>
            </div>
          </div>
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={Eye} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Visibilitas</h1>
              <span className="text-[13px]">{detailedCurrent.vis_km} Km</span>
            </div>
          </div>
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={humidity} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Kelembapan</h1>
              <span className="text-[13px]">{detailedCurrent.humidity}%</span>
            </div>
          </div>
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={cloud} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Tiupan</h1>
              <span className="text-[13px]">
                {detailedCurrent.gust_kph} kph
              </span>
            </div>
          </div>
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={blood} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Tekanan</h1>
              <span className="text-[13px]">{detailedCurrent.pressure_in}</span>
            </div>
          </div>
          <div className="w-40 h-[80px] rounded-3xl bg-slate-100  border-[2.5px] border-slate-300 mt-6 flex items-center px-3 gap-2">
            <div className="w-1/4">
              <img src={evaporation} alt="" className="w-full" />
            </div>
            <div>
              <h1 className="font-semibold text-sm">Pengendapan</h1>
              <span className="text-[13px]">{detailedCurrent.precip_in}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  detailedData: state.data,
});
export default connect(mapStateToProps, null)(Detailed);
