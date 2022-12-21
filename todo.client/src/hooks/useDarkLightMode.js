import { useContext } from "react";
import DarkLightModeContext from '../context/DarkLightModeProvider';

const useDarkLightMode = () => {
    return useContext(DarkLightModeContext);
}

export default useDarkLightMode;