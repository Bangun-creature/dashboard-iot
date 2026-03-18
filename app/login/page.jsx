'use client'

import { useState } from "react"
import axios from "axios";
import { useRouter } from "next/navigation";

export default function LoginPage(){
    const [form, setForm] = useState({username: "", password: ""});
    const [loading, seetLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async()=>{
        seetLoading(true);

        try {
            const rawData = await axios.post('/api/auth/login', form);
            if(rawData.status == 200){
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            alert(error.response?.data?.message || "Login Gagal");
        } finally {
            seetLoading(false);
        }
    }

    return(
        <div className="grid px-[5%]">
            <div className="mx-auto w-full mt-20 bg-slate-900 rounded-lg p-5 flex flex-col gap-8 md:w-sm border border-white/30">
                <div className="flex flex-col gap-2">
                <h1 className="text-5xl text-slate-100 font-medium font-robotoflex">Welcome Back to Iot Dahsboard Website</h1>
                <p className="text-xs text-slate-300 font-light font-notosans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, minima.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Username</label>
                        <input onChange={(e)=> setForm({...form, username: e.target.value})} type="text" placeholder="input your name" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Password</label>
                        <input onChange={(e)=> setForm({...form, password: e.target.value})} type="text" placeholder="input your password" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <button className="bg-blue-600 p-2 rounded-lg font-notosans font-medium text-slate-100 text-sm mt-6 cursor-pointer hover:scale-[1.02] transition duration-200" onClick={handleLogin} disabled={loading}>{loading ? 'Authenticating...' : 'Login'}</button>
                     <p className="text-center text-sm text-slate-400">
                        Belum punya akun? <span onClick={() => router.push('/register')} className="text-blue-500 cursor-pointer hover:underline">Daftar</span>
                    </p>
                </div>
            </div>
        </div>
    )
}