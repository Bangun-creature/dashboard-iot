'use client'
import { useContext,  createContext, useState } from "react";

const GaugeContext = createContext();

export function GaugeProvider({children}){
    const [gauges, setGauges] = useState([]);

    return(
        <GaugeContext.Provider value={{gauges, setGauges}}>
            {children}
        </GaugeContext.Provider>
    )
}

export const useGauges = ()=> useContext(GaugeContext);