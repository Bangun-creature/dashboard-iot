'use client'
import {useRef, useState} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import axios from "axios";
import { useEffect } from "react";



export default function Navbar(){
    const pathname = usePathname();
    const router = useRouter();

  const menuNavbar = [
    { link: "/", text: "Beranda" },
    { link: "/device-control", text: "Device Control" },
    { link: "/monitoring", text: "Monitoring" },
    { link: "/access-control", text: "Access Control" },
    { link: "/settings", text: "Settings" },
    { link: "/history", text: "Log/History" },
  ];

  const [isOpenNavbar, setIsOpenNavbar] = useState(false);
  const backgroundNavbar = useRef(null);

  const [form, setForm] = useState({id: '', username: '', email: ''});
  const [preview, setPreview] = useState('');
  const route = useRouter();

  const handleClickNavbar = () => setIsOpenNavbar(true);

  const handleCloseNavbar = (e) => {
    if (e.target === backgroundNavbar.current) {
      setIsOpenNavbar(false);
    }
  };

  // Logout:
  const handleLogout = async () => {
    try {
      // 1. Panggil API untuk hapus cookie session_token
      await axios.post('/api/auth/logout'); 
      
      // 2. Paksa refresh dan pindah ke login
      router.refresh(); 
      router.push('/login');
    } catch (error) {
      console.error("Gagal Logout:", error);
    }
  };

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
          setPreview(`/profile/${userData.image}`);
        }

      } catch (error) {
        console.log(`There is an error when try to get user profile data: ${error}`);
      }
    }

    fetchUserData();
  }, []);

  function handleGoToProfile(){
    route.push("/settings")
  }

    return(
        <div className="fixed lg:relative z-50 lg:z-auto lg:col-span-1 w-full lg:h-full">
      {/* Top Bar Mobile (Tetap) */}
      <div className="lg:hidden bg-blue-600 w-full flex justify-between items-center px-[5%] py-3 text-white shadow-md">
        <p className="font-bold font-robotoflex">IOT Dashboard</p>
        <button onClick={handleClickNavbar}>
          
          <div className="bg-[url(/icon/menu.png)] bg-contain bg-no-repeat w-7 h-7"></div>
          </button>
          
      </div>

      {/* Background Overlay */}
      <div
        ref={backgroundNavbar}
        onClick={handleCloseNavbar}
        className={`
          ${isOpenNavbar ? "opacity-100 visible" : "opacity-0 invisible"} 
          lg:opacity-100 lg:visible transition-all duration-300
          fixed lg:relative inset-0 h-screen lg:h-full 
          backdrop-blur-md lg:backdrop-blur-none bg-black/40 lg:bg-transparent w-full
        `}
      >
        <div
          className={`
            bg-slate-700 text-white w-[75%] sm:w-[40%] lg:w-full flex flex-col h-full 
            transition-transform duration-300 transform border-r border-slate-600
            ${isOpenNavbar ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          `}
        >
          {/* User Profile Section */}
          <div className="flex gap-3 items-center px-6 py-8 border-b border-slate-600 cursor-pointer" onClick={handleGoToProfile}>
            <div className="bg-slate-500 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shadow-inner shadow-black/20 bg-cover bg-center bg-no-repeat border-2 border-slate-300" style={{backgroundImage: `url("${preview}")`}}>
            </div>
            <div>
              <p className="font-semibold font-robotoflex text-sm">{form.username}</p>
              <p className="text-xs text-slate-400 font-notosans font-light">{form.email}</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="flex flex-col h-fit">
              {menuNavbar.map((item, index) => (
                <li key={index} className="w-full">
                  <Link
                    href={item.link}
                    onClick={() => setIsOpenNavbar(false)} // Tutup menu saat diklik (mode mobile)
                    className={`flex px-6 py-4 border-b border-slate-600/50 transition-all font-notosans text-xs 
                    ${pathname === item.link ? "bg-slate-800 text-blue-400 border-l-4 border-l-blue-500" : "text-slate-200 hover:bg-slate-600 hover:pl-8"}`}
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
              {/* Log Out Button */}
              <li className="w-full">
                <button onClick={handleLogout} className="cursor-pointer flex w-full px-6 py-4 text-red-400 hover:bg-red-500/10 transition-colors font-robotoflex text-sm text-left">
                  Log Out
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
    )
}