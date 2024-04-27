import React, { createContext, useState } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const host = "http://localhost:3000";

  const login = async (formData) => {
    const response = await fetch(`${host}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    
    if (!response.ok) {
      throw "Something went wrong";
    } else {
      const token = await response.token;
      localStorage.removeItem("auth-token");
      localStorage.setItem("auth-token", token);
      return token;
    }
  };

  return (
    <UserContext.Provider value={{ login }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
