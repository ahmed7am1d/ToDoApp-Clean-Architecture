import { createContext, useState } from "react";

const SideNavBarContext = createContext({});

export const SideBarNavProvider = ({ children }) => {
  const [collapseButtonClicked, setCollapseButtonClicked] = useState(false);
  return (
    <SideNavBarContext.Provider
      value={{ collapseButtonClicked, setCollapseButtonClicked }}
    >
      {children}
    </SideNavBarContext.Provider>
  );
};

export default SideNavBarContext;
