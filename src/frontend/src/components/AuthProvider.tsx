import { type PropsWithChildren, useCallback, useMemo, useState } from "react";
import {
  AuthContext,
  type AuthUser,
  clearSession,
  getSession,
  getStoredUsers,
  isAdminEmail,
  saveUser,
  setSession,
} from "../hooks/useAuth";

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => getSession());

  const login = useCallback(
    async (
      _name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const users = getStoredUsers();
      const found = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password,
      );
      if (!found) {
        return { success: false, error: "Invalid email or password." };
      }
      const authUser: AuthUser = { name: found.name, email: found.email };
      setSession(authUser);
      setUser(authUser);
      return { success: true };
    },
    [],
  );

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      const users = getStoredUsers();
      const exists = users.find(
        (u) => u.email.toLowerCase() === email.toLowerCase(),
      );
      if (exists) {
        return {
          success: false,
          error: "An account with this email already exists.",
        };
      }
      saveUser({ name, email, password });
      const authUser: AuthUser = { name, email };
      setSession(authUser);
      setUser(authUser);
      return { success: true };
    },
    [],
  );

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      login,
      register,
      logout,
      isLoggedIn: !!user,
      isAdmin: !!user && isAdminEmail(user.email),
    }),
    [user, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
