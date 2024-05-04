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
      const responseData = await response.json(); 
      const { token, email } = responseData;

      localStorage.clear();
      localStorage.setItem("auth-token", token);

      return token;
    }
  };

  return (
    <UserContext.Provider value={{ login, host }}>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
