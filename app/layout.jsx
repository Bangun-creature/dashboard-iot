// app/layout.jsx
import "./globals.css";
import { GaugeProvider } from "@/lib/GaugeContext";
import {Noto_Sans, Roboto_Flex} from 'next/font/google';

// Konfigurasi Noto Sans
const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: "--font-notosans", // Nama variabel CSS
  display: "swap",
});

// Konfigurasi Roboto Flex
const robotoFlex = Roboto_Flex({
  subsets: ["latin"],
  variable: "--font-robotoflex",
  display: "swap",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-slate-900">
        <GaugeProvider>
          {children}
        </GaugeProvider>
      </body>
    </html>
  );
}