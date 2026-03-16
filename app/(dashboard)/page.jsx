'use client'

import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { connectMQTT, disconnectMQTT } from "@/lib/mqtt-worker";


export default function Home() {
  const [gauges, setGauges] = useState([]);
  const [listRfid, setListRfid] = useState([]);
  const [totalGranted, setTotalGranted] = useState();
  const [totalFalse, setTotalFalse] = useState();
  const [isMqttOnline, setIsMqttOnline] = useState(false);
  const [totalRfid, setTotalRfid] = useState(null);

  const [buttons, setButtons] = useState([]);

  const loadedMeterGauge = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/metergauge`);

      console.log(`Ini meter gauge kita: ${JSON.stringify(rawData.data)}`);
      if(rawData.data.payload.length > 0){
        setGauges(rawData.data.payload);
      } else {
        setGauges([])
      }
    } catch (error) {
      console.log(`There is an error when get meter gauge from backend: ${error}`);
    }
  }

  const handleLoadListRfid = async()=>{
    try {
      const rawData = await axios.get(`http://localhost:3000/api/rfid`);
      console.log(`Ini data dari tabel rfid: ${JSON.stringify(rawData.data)} | Total: ${rawData.data.payload.length}`);
      setListRfid(rawData.data.payload);
      const finalData = rawData.data.payload;
      const finalData1 = rawData.data.payload;
      const totalGranted = finalData.filter((item)=> item.status == "true");
      const totalFalse = finalData1.filter((item)=> item.status == "false");

      setTotalGranted(totalGranted.length);
      setTotalFalse(totalFalse.length);
      setTotalRfid(rawData.data.payload.length);
    } catch (error) {
      console.log(`There is an error : ${error}`);
    }
  }

  const loadedDataButton = async () => {
    try {
      const rawData = await axios.get('http://localhost:3000/api/buttons');
      console.log(`Rawdata button: ${JSON.stringify(rawData)}`)
      setButtons(rawData.data.payload);
    } catch (error) {
      console.log(`Error loading buttons: ${error}`);
    }
  };

   // Akan dipanggil setiap halaman refresh
  useEffect(()=>{
    loadedMeterGauge();
    handleLoadListRfid();
    loadedDataButton();

    const client = connectMQTT(
        null,
        (status)=>{
            setIsMqttOnline(status);
        }
    )
  },[])

  return (
    <div className="bg-slate-900 min-h-full pt-20 px-[5%] flex flex-col gap-5">
      {/* Header Content */}
      <div className="py-6">
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">Dashboard Overview</h1>
        <p className="text-slate-200/70 font-notosans font-light text-sm">Welcome back, monitoring your IoT devices here.</p>
      </div>

      {/* Placeholder untuk Widget Anda nanti */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-8">
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Meter Gauge Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          RFID Status Space
        </div>
        <div className="bg-slate-700 h-40 rounded-xl border border-slate-600 flex items-center justify-center text-slate-400 font-notosans text-sm">
          Control Button Space
        </div>
      </div> */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8">
  {/* Card 1: Power Status (Dari Meter Gauge) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Meter Gauge</p>
    <h2 className="text-3xl font-semibold text-white mt-2 font-robotoflex">Meter Gauge <span className="text-sm text-slate-400">List</span></h2>
    <div className="mt-2 text-xs text-white/70">
      <ul>
        {gauges.map((item, index)=>(
          <li key={index} className="font-notosans">{index + 1}. {item.name}</li>
        ))}
      </ul>
    </div>
  </div>

  {/* Card 2: Security Status (Dari RFID) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">RFID Card</p>
    <h2 className="text-3xl font-semibold text-white mt-2 font-robotoflex">{totalRfid} <span className="text-sm text-slate-400">Total Card</span></h2>
    <div className="mt-2 text-xs text-white/70">
      <ul>
        <li className="font-notosans">Total Granted: {totalGranted}</li>
        <li className="font-notosans">Total Nonactive: {totalFalse}</li>
      </ul>
    </div>
  </div>

  {/* Card 3: Active Switches (Dari Buttons) */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Active Devices</p>
    <h2 className="text-3xl font-semibold text-white mt-2 font-robotoflex">{buttons.filter((item)=> item.status == 1).length} <span className="text-sm text-slate-400">/ {buttons.length}</span></h2>
    <div className="mt-2 text-xs text-slate-500">
      <ul className="grid grid-cols-4 lg:grid-cols-2 gap-2">
        {buttons.map((item, index)=>(
        <li key={index} className={`${item.status == 1 ? 'bg-emerald-600' : 'bg-red-600' } p-2 rounded-lg flex items-center justify-between font-notosans`}><p className="m-auto text-white font-medium text-sm">id: {item.id}</p></li>
        ))}
      </ul>
    </div>
  </div>

  {/* Card 4: System Health */}
  <div className="bg-slate-800 p-6 rounded-3xl border border-slate-700 shadow-xl">
    <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">MQTT Broker</p>
    <h2 className={`text-3xl font-semibold  font-robotoflex ${isMqttOnline? 'text-green-500' : 'text-red-500'} mt-2`}>{isMqttOnline ? 'Online' : 'Offline'}</h2>
    <div className="mt-2 text-xs text-slate-500 font-notosans">broker.emqx.io</div>
  </div>
</div>
    </div>
  );
}
