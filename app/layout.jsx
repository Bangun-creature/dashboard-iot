// app/layout.jsx
import "./globals.css";
import { GaugeProvider } from "@/lib/GaugeContext";

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