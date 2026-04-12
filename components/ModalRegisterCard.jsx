'use client';
import React, { useState } from 'react';

export default function ModalRegisterCard({ isOpen, onClose, onSave }) {
  const [newCardName, setNewCardName] = useState("");
  const [rfidCode, setRfidCode] = useState(""); // Nanti diupdate via Socket.io

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newCardName) return alert("Nama tidak boleh kosong!");
    
    // Kirim data ke parent (AccessControl)
    onSave({ username: newCardName, rfid_code: rfidCode, status: "false"});
    
    // Reset form
    setNewCardName("");
    const data = {name: newCardName, code: rfidCode}
    console.log(`Data RFID before submit: ${JSON.stringify(data)}`);

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="bg-slate-800 border border-slate-700 w-full max-w-md p-8 rounded-3xl z-10 shadow-2xl transform transition-all scale-100 animate-in zoom-in duration-200">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-medium text-white mb-2 font-robotoflex">Register New Card</h2>
          <p className="text-slate-400 text-sm font-light font-notosans">Enter your RFID Code Bellow</p>
        </div>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Rfid Code</label>
            <input 
              autoFocus
              type="text" 
              value={rfidCode}
              onChange={(e) => setRfidCode(e.target.value)}
              placeholder="2343940E91" 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-xs font-semibold ml-1 uppercase">Owner Name</label>
            <input 
              type="text" 
              value={newCardName}
              onChange={(e) => setNewCardName(e.target.value)}
              placeholder="e.g. Bangun W.J." 
              className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-slate-700"
            />
          </div>

          <div className="flex gap-3 mt-4">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 py-4 rounded-2xl font-semibold font-notosans transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-semibolf font-notosans transition-all shadow-lg shadow-blue-600/30 cursor-pointer"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}