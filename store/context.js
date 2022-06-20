import React, { useState } from "react";

export const Context = React.createContext({});

const Provider = ({ children }) => {
  const [userData, setUserData] = useState({});

  const store = { userData, setUserData };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
