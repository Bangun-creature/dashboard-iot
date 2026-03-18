'use client';

// import { headers } from 'next/headers';
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';

// import SecurityLogs from './SecurityLogs';
// import ThresholdAlert from './ThresholdAlert';

export default function Settings() {
  const [form, setForm] = useState({id: '', username: '', email: ''});
  const [preview, setPreview] = useState('/profile/crop-mirror.png');
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(()=>{
    const fetchUserData = async ()=>{
      try {
        const rawData = await axios.get(`/api/auth/profile`);

        console.log(`Data user profile: ${JSON.stringify(rawData.data)}`);
        const userData = rawData.data.user;

        setForm({
          id: userData.id,
          username: userData.username || "",
          email: userData.email || ""
        })

        if(userData.image){
          setPreview(`/profile${JSON.parse(userData.image)}`);
        }

      } catch (error) {
        console.log(`There is an error when try to get user profile data: ${error}`);
      }
    }

    fetchUserData();
  }, []);

  const handleIconClick = ()=> fileInputRef.current.click();

  const handleFileChange = (e)=>{
    const selectedFile = e.target.files[0];
    if(selectedFile){
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); //Buat preview
    }
  }

  const handleSaveProfile = async ()=>{
    const formData = new FormData();
    formData.append('id', form.id);
    formData.append('username', form.username);
    formData.append('email', form.email);

    if(file){
      formData.append('image', file);
    }

    try {
      const rawData = await axios.post('/api/auth/update-profile', formData, {
        headers: {'Content-Type': 'multipart/form-data'}
      });
      alert(`Profil berhasil diperbarui: ${rawData.data.message}`);

    } catch (error) {
      console.error(`Error update profile: ${error}`);
    }
  }

  return (
    <div className="bg-slate-900 pt-20 px-[5%] flex flex-col gap-8 pb-20">
      <div className="py-6 border-b border-slate-800">
        <h1 className="text-slate-200 text-5xl font-robotoflex font-semibold">
          System Settings
        </h1>
        <p className="text-slate-400 font-notosans font-light text-sm mt-2">Manage your profile data.</p>
      </div>

      <div className="">
        {/* Sidebar Navigation */}
        {/* <div className="lg:col-span-1">
          <div className="bg-slate-800 p-2 rounded-2xl border border-slate-700 sticky top-24">       
              <button
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-6 py-4 rounded-xl font-semibold transition-all mb-1 uppercase text-xs tracking-widest bg-blue-600 text-white shadow-lg shadow-blue-600/20`}
              >
                Profile
              </button>
          </div>
        </div> */}

        {/* Content Area */}
        <div className="flex flex-col gap-4 lg:grid lg:grid-cols-4">
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 lg:col-span-3 flex flex-col">
              <h3 className="text-slate-200 font-medium mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span> Edit Your Profile Data
              </h3>
              <div className="flex flex-col gap-2 lg:w-[80%] lg:mx-auto">
                <div className='w-full flex justify-center'>
                  <div className='bg-red-500 w-40 h-40 rounded-full relative  bg-cover bg-center bg-no-repeat border-2 border-slate-300' style={{backgroundImage: `url(${preview})`}}>
                  <input type="file" ref={fileInputRef} onChange={handleFileChange} className='hidden' accept="image/*" />
                  <div className='text-white absolute bottom-0 right-0 bg-[url("/icon/edit.png")] bg-contain bg-no-repeat w-7 h-7 cursor-pointer' onClick={handleIconClick}></div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-xs font-medium ml-1 font-notosans">Username</label>
                  <input value={form.username} onChange={(e)=> setForm({...form, username: e.target.value})} type="text" className="font-notosans bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:border-blue-500 outline-none transition-all text-sm" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-500 text-xs font-medium ml-1 font-notosans">Email</label>
                  <input value={form.email} onChange={(e)=> setForm({...form, email: e.target.value})} type="text"  className="bg-slate-900 border border-slate-700 rounded-xl p-4 text-slate-200 focus:border-blue-500 outline-none transition-all font-notosans text-sm" />
                </div>
              </div>
            </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-4  lg:col-span-1 h-fit">
            <button onClick={handleSaveProfile} className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all active:scale-95 text-sm">
              Save Profile Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
