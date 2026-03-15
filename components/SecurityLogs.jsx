'use client';
import React, { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client'; // Import helper baru

export default function SecurityLogs() {
  // const supabase = createClient(); // Gunakan helper SSR
  const [user, setUser] = useState(null);
  const [apiKey, setApiKey] = useState("IOT-SECURE-9988776655");
  
  const systemLogs = [
    { event: "Unauthorized RFID Attempt", ip: "192.168.1.15", time: "2 mins ago", status: "Critical" },
    { event: "Admin Password Changed", ip: "10.0.0.5", time: "1 hour ago", status: "Warning" },
    { event: "MQTT Connection Re-established", ip: "Server", time: "3 hours ago", status: "Info" },
  ];

  useEffect(() => {
    const getUser = async () => {
      // Di SSR, getUser() adalah cara paling aman untuk validasi user di client
      // const { data: { user }, error } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
      }
    };
    getUser();
  }, []); // Hapus dependency [supabase] karena client sekarang stabil

  const handleRegenerateKey = () => {
    const newKey = "IOT-" + Math.random().toString(36).toUpperCase().substring(2, 15);
    setApiKey(newKey);
    alert("New API Key generated!");
  };

  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* 1. Account Info */}
      <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <h3 className="text-slate-200 font-semibold mb-6 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Account Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-1">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Email Address</p>
            <p className="text-slate-200 font-medium">{user?.email || "Loading..."}</p>
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Last Login</p>
            <p className="text-slate-200 font-medium">
              {user?.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleString() : "-"}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Hardware Access Token */}
      <section className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-slate-200 font-semibold">Hardware Access Token</h3>
          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-tighter">Encrypted</span>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-slate-500 text-[10px] font-bold uppercase ml-1 tracking-widest">X-API-KEY (ESP32 Secret)</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                readOnly 
                value={apiKey} 
                className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-3 text-blue-400 font-mono text-sm outline-none" 
              />
              <button 
                onClick={handleRegenerateKey}
                className="bg-slate-700 hover:bg-slate-600 text-white px-5 rounded-xl text-xs font-bold transition-all active:scale-95"
              >
                Regenerate
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Audit Logs */}
      <section className="bg-slate-800 rounded-3xl border border-slate-700 overflow-hidden shadow-xl">
        <div className="p-6 border-b border-slate-700 bg-slate-800/50 flex justify-between items-center">
          <h3 className="text-slate-200 font-semibold uppercase text-xs tracking-widest">System Audit Trail</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-400">
            <thead className="bg-slate-900/50 text-[10px] uppercase font-bold text-slate-500 tracking-tighter">
              <tr>
                <th className="px-6 py-4">Event & Timestamp</th>
                <th className="px-6 py-4">Source Address</th>
                <th className="px-6 py-4 text-center">Security Level</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {systemLogs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-700/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-slate-200 font-medium">{log.event}</p>
                    <p className="text-[10px] text-slate-500 font-mono">{log.time}</p>
                  </td>
                  <td className="px-6 py-4 font-mono text-xs">{log.ip}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase
                      ${log.status === 'Critical' ? 'bg-red-500/10 text-red-500' : 
                        log.status === 'Warning' ? 'bg-yellow-500/10 text-yellow-500' : 'bg-blue-500/10 text-blue-500'}`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}