import { create } from "zustand";

import type { User } from "@/api/auth/auth.schema";

interface AuthState {
  user: User | null;

  isAuthenticated: boolean;

  isInitialized: boolean;

  isLoading: boolean;

  initialize: (user: User | null) => void;

  setUser: (user: User | null) => void;

  setLoading: (loading: boolean) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  isAuthenticated: false,

  isInitialized: false,

  isLoading: false,

  initialize: (user) =>
    set({
      user,
      isAuthenticated: !!user,
      isInitialized: true,
      isLoading: false,
    }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) =>
    set({
      isLoading: loading,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
      isInitialized: true,
      isLoading: false,
    }),
}));
