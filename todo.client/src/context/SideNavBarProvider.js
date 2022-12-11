import { faL } from "@fortawesome/free-solid-svg-icons";
import { createContext, useState } from "react";

const SideNavBarContext = createContext({});

export const SideBarNavProvider = ({ children }) => {
  const [collapseButtonClicked, setCollapseButtonClicked] = useState(window.innerWidth > 800 ? false : true);
  return (
    <SideNavBarContext.Provider
      value={{ collapseButtonClicked, setCollapseButtonClicked }}
    >
      {children}
    </SideNavBarContext.Provider>
  );
};

export default SideNavBarContext;
