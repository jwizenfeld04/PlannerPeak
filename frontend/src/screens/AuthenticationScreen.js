import React, { useState, useEffect } from "react";
import { View } from "react-native";
import SignUpPage from "../components/SignUpPage";
import LogInPage from "../components/LoginInPage";

const AuthenticationScreen = (props) => {
  const [loginPage, setLoginPage] = useState(true);

  const callback = (data) => {
    setLoginPage(data);
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      {loginPage ? (
        <LogInPage setLoginPage={callback} />
      ) : (
        <SignUpPage setLoginPage={callback} />
      )}
    </View>
  );
};

export default AuthenticationScreen;
