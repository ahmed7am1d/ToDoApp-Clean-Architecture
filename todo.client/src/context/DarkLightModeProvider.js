import { createContext, useEffect, useState } from "react";

const DarkLightModeContext = createContext({});

export const DarkLightModeProvider = ({children}) => {
    const setInitalDarkMode =  () => {
        localStorage.setItem('darkmode',true);
        return true;
    }
    const [darkMode,setDarkMode] = useState(localStorage.getItem('darkmode') ? localStorage.getItem('darkmode') : setInitalDarkMode() );
    const [lightMode,setLightMode] = useState(localStorage.getItem('lightmode') ? localStorage.getItem('lightmode') : false);

    return(
        <DarkLightModeContext.Provider  value={{darkMode,setDarkMode,lightMode,setLightMode}}>
           {children}
        </DarkLightModeContext.Provider>
    );
}
export default DarkLightModeContext;