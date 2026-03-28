import {
  loginService,
  logoutService,
  registerService,
} from "@/services/authService";
import { notifyFailed, notifySuccess } from "@/utils/toast";
import { useCallback } from "react";

export function useRegister() {
  const register = useCallback(
    async (
      username: string,
      email: string,
      password: string,
      confirmPassword: string,
    ) => {
      try {
        const res = await registerService(
          username,
          email,
          password,
          confirmPassword,
        );
        notifySuccess(res.message);
      } catch (err: any) {
        notifyFailed(err.message);
      }
    },
    [],
  );
  return { register };
}

export function useLogin() {
  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await loginService(email, password);
      notifySuccess(res.message);
    } catch (err: any) {
      notifyFailed(err.message);
    }
  }, []);
  return { login };
}

export function useLogout() {
  const logout = useCallback(async () => {
    try {
      const res = await logoutService();
      notifySuccess(res.message);
    } catch (err: any) {
      notifyFailed(err.message);
    }
  }, []);
  return { logout };
}
