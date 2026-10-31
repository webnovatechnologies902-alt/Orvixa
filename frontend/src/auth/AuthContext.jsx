import { useCallback, useEffect, useMemo, useState } from "react";

import { request } from "../api/client";
import AuthContext from "./auth-context";

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("orvixa_token"));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(Boolean(token));
  const [notice, setNotice] = useState(null);
  const [authError, setAuthError] = useState("");

  const showNotice = useCallback((message, variant = "danger") => {
    setNotice({ message, variant });
  }, []);

  useEffect(() => {
    if (!token) return undefined;

    let active = true;
    request("/users/me", { token })
      .then(({ user: currentUser }) => {
        if (active) {
          setUser(currentUser);
          setAuthError("");
        }
      })
      .catch((error) => {
        if (!active) return;
        if (error.status === 401) {
          localStorage.removeItem("orvixa_token");
          setToken(null);
          setUser(null);
          return;
        }
        setAuthError(error.message);
        showNotice(error.message);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [token, showNotice]);

  const signIn = useCallback(async (credentials, mode = "login") => {
    const data = await request(`/auth/${mode}`, {
      method: "POST",
      body: credentials,
    });
    localStorage.setItem("orvixa_token", data.token);
    setToken(data.token);
    setUser(data.user);
    setAuthError("");
    return data.user;
  }, []);

  const signOut = useCallback(async () => {
    await request("/auth/logout", { method: "POST", token });
    localStorage.removeItem("orvixa_token");
    setToken(null);
    setUser(null);
    setAuthError("");
  }, [token]);

  const clearSession = useCallback(() => {
    localStorage.removeItem("orvixa_token");
    setToken(null);
    setUser(null);
    setAuthError("");
  }, []);

  const value = useMemo(
    () => ({
      token,
      user,
      loading,
      notice,
      authError,
      clearNotice: () => setNotice(null),
      showNotice,
      signIn,
      signOut,
      clearSession,
      setUser,
      isAuthenticated: Boolean(token),
    }),
    [token, user, loading, notice, authError, showNotice, signIn, signOut, clearSession]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
