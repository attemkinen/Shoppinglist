// header.js
import React from "react";
import { Header } from "@rneui/themed";


const HeaderComponent = () => {
  return (
    <Header
      leftComponent={{ icon: "menu", color: "#fff" }}
      centerComponent={{ text: "SHOPPING LIST", style: { color: "#fff" } }}
      rightComponent={{ icon: "home", color: "#fff" }}
      
    />
  );
};

export default HeaderComponent;
