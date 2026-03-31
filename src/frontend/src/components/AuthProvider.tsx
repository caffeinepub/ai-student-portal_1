import { type PropsWithChildren, useCallback, useMemo, useState } from "react";
import { useActor } from "../hooks/useActor";
import {
  AuthContext,
  type AuthUser,
  clearSession,
  getSession,
  isAdminEmail,
  setSession,
} from "../hooks/useAuth";
import { hashPassword } from "../utils/hashUtils";

// Motoko variants come back as objects: { ok: null }, { emailTaken: null }, etc.
function hasKey<T extends object>(obj: T, key: string): boolean {
  return typeof obj === "object" && obj !== null && key in obj;
}

export default function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(() => getSession());
  const { actor } = useActor();

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      securityQuestion: string,
      securityAnswer: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!actor) {
        return {
          success: false,
          error: "Connecting to server, please try again.",
        };
      }
      if (
        !name.trim() ||
        !email.trim() ||
        !password.trim() ||
        !securityQuestion.trim() ||
        !securityAnswer.trim()
      ) {
        return { success: false, error: "Please fill in all fields." };
      }
      try {
        const passwordHash = await hashPassword(password);
        const securityAnswerHash = await hashPassword(
          securityAnswer.trim().toLowerCase(),
        );
        const result = await actor.registerStudent(
          name.trim(),
          email.trim().toLowerCase(),
          passwordHash,
          securityQuestion.trim(),
          securityAnswerHash,
        );
        // Motoko returns variant objects like { ok: null }, { emailTaken: null }
        const resultObj = result as unknown as object;
        if (hasKey(resultObj, "ok")) {
          const authUser: AuthUser = {
            name: name.trim(),
            email: email.trim().toLowerCase(),
          };
          setSession(authUser);
          setUser(authUser);
          return { success: true };
        }
        if (hasKey(resultObj, "emailTaken")) {
          return {
            success: false,
            error: "An account with this email already exists.",
          };
        }
        return {
          success: false,
          error: "Invalid input. Please check your details.",
        };
      } catch {
        return {
          success: false,
          error: "Registration failed. Please try again.",
        };
      }
    },
    [actor],
  );

  const login = useCallback(
    async (
      _name: string,
      email: string,
      password: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!actor) {
        return {
          success: false,
          error: "Connecting to server, please try again.",
        };
      }
      try {
        const passwordHash = await hashPassword(password);
        const result = await actor.loginStudent(
          email.trim().toLowerCase(),
          passwordHash,
        );
        // loginStudent returns ?StudentAccount — Some(account) or null
        // ICP JS agent returns [] for null and [account] for Some
        const account = Array.isArray(result) ? result[0] : result;
        if (account?.name && account?.email) {
          const authUser: AuthUser = {
            name: account.name,
            email: account.email,
          };
          setSession(authUser);
          setUser(authUser);
          return { success: true };
        }
        return { success: false, error: "Invalid email or password." };
      } catch {
        return { success: false, error: "Login failed. Please try again." };
      }
    },
    [actor],
  );

  const resetPassword = useCallback(
    async (
      email: string,
      securityAnswer: string,
      newPassword: string,
    ): Promise<{ success: boolean; error?: string }> => {
      if (!actor) {
        return {
          success: false,
          error: "Connecting to server, please try again.",
        };
      }
      try {
        const securityAnswerHash = await hashPassword(
          securityAnswer.trim().toLowerCase(),
        );
        const newPasswordHash = await hashPassword(newPassword);
        const result = await actor.resetPasswordWithSecurityAnswer(
          email.trim().toLowerCase(),
          securityAnswerHash,
          newPasswordHash,
        );
        const resultObj = result as unknown as object;
        if (hasKey(resultObj, "ok")) {
          return { success: true };
        }
        if (hasKey(resultObj, "notFound")) {
          return {
            success: false,
            error: "No account found with this email.",
          };
        }
        if (hasKey(resultObj, "wrongAnswer")) {
          return { success: false, error: "Incorrect security answer." };
        }
        if (hasKey(resultObj, "rateLimited")) {
          return {
            success: false,
            error: "Too many attempts. Please try again later.",
          };
        }
        return { success: false, error: "Reset failed. Please try again." };
      } catch {
        return {
          success: false,
          error: "Password reset failed. Please try again.",
        };
      }
    },
    [actor],
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
      resetPassword,
      logout,
      isLoggedIn: !!user,
      isAdmin: !!user && isAdminEmail(user.email),
    }),
    [user, login, register, resetPassword, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
