import { useState, useEffect, useCallback } from "react";

let logoutTimer;

export const useAuth = () => {
  const [token, setToken] = useState(sessionStorage.getItem("token"));
  const [tokenExpirationData, setTokenExpirationDate] = useState();

  const login = useCallback((tok, expirationDate) => {
    setToken(tok);
    const tokenExpirationDate =
      expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    sessionStorage.setItem(
      "token",
      JSON.stringify({
        token: tok,
        expiration: tokenExpirationDate.toISOString(),
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    sessionStorage.removeItem("token");
  }, []);

  useEffect(() => {
    if (token && tokenExpirationData) {
      const remainingTime =
        tokenExpirationData.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout, remainingTime);
    } else {
      clearTimeout(logoutTimer);
    }
  }, [token, logout, tokenExpirationData]);

  useEffect(() => {
    const storedToken = JSON.parse(sessionStorage.getItem("token"));

    if (
      storedToken &&
      storedToken.token &&
      new Date(storedToken.expiration) > new Date()
    ) {
      login(storedToken.token, new Date(storedToken.expiration));
    }
  }, [login]);

  return { token, login, logout };
};
