import { useEffect, useState } from "react";
import { API } from "../utils/api";

export interface AuthState {
  loading: boolean;
  isAuth: boolean;
}

export const useAuth = () => {
  const [authState, setAuthState] = useState<AuthState>({
    loading: true,
    isAuth: false,
  });

  useEffect(() => {
    let active = true;

    API.get("/user/me")
      .then(() => {
        if (active) {
          setAuthState({ loading: false, isAuth: true });
        }
      })
      .catch(() => {
        if (active) {
          setAuthState({ loading: false, isAuth: false });
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return authState;
};
