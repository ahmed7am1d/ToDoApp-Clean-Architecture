import SideNavBarContext from "../context/SideNavBarProvider";
import { useContext } from "react";

const useSideNavBarToggle = () => {
  return useContext(SideNavBarContext);
};

export default useSideNavBarToggle;