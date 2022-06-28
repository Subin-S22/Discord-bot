import React, { useState } from "react";

export const Context = React.createContext({});

const Provider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [verify, setVerify] = useState();
  const [address, setAddress] = useState("");

  const store = {
    userData,
    setUserData,
    verify,
    setVerify,
    setAddress,
    address,
  };
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
