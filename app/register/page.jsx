'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function RegisterPage(){
    const [form, setForm] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async () => {
        if (!form.username || !form.password) return alert("Isi semua data!");
        
        setLoading(true);
        try {
            const res = await axios.post('/api/auth/register', form);
            alert(res.data.message);
            router.push('/login'); // Lempar ke login setelah sukses
        } catch (err) {
            alert(err.response?.data?.message || "Gagal mendaftar");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="grid px-[5%]">
            <div className="mx-auto w-full mt-20 bg-slate-900 rounded-lg p-5 flex flex-col gap-8 md:w-sm border border-white/30">
                <div className="flex flex-col gap-2">
                <h1 className="text-5xl text-slate-100 font-medium font-robotoflex">Lets to Register</h1>
                <p className="text-xs text-slate-300 font-light font-notosans">Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, minima.</p>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Username</label>
                        <input onChange={(e) => setForm({...form, username: e.target.value})} type="text" placeholder="input your name" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="" className="text-xs text-slate-100 font-notosans font-light">Password</label>
                        <input onChange={(e) => setForm({...form, password: e.target.value})} type="text" placeholder="input your password" className="bg-slate-500 text-slate-100 px-3 py-2 rounded-lg text-sm focus:outline-slate-300/20" />
                    </div>
                    <button onClick={handleRegister} disabled={loading} className="bg-blue-600 p-2 rounded-lg font-notosans font-medium text-slate-100 text-sm mt-6 cursor-pointer hover:scale-[1.02] transition duration-200">{loading ? 'Processing' : 'Sign Up'}</button>
                    <p className="text-center text-sm text-slate-400">
                        Sudah punya akun? <span onClick={() => router.push('/login')} className="text-blue-500 cursor-pointer hover:underline">Login</span>
                    </p>
                </div>
            </div>
        </div>
    )
}