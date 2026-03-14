import "./globals.css";
import Navbar from "@/components/Navbar";


export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="w-full h-screen bg-slate-800 lg:grid lg:grid-cols-5 overflow-hidden"
      >
      
        <Navbar/>
        <main className="lg:col-span-4 h-full overflow-y-auto bg-slate-900">
        {children}
        </main>
       
      </body>
    </html>
  );
}
