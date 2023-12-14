import secureLocalStorage from "react-secure-storage";
import { create } from "zustand";
import {
  StateStorage,
  createJSONStorage,
  devtools,
  persist,
} from "zustand/middleware";

interface UserAuthenticatedType {
  id: number;
  name: string;
  avatar: string;
  email: string;
  votes: number;
  rating: {
    name: string;
    description: string;
  };
  campus: {
    id: number;
    name: string;
    state: {
      id: number;
      name: string;
    };
  };
  count_questions: number;
  count_answers: number;
}

type useAuthStoreTypes = {
  user: UserAuthenticatedType | null;
  token: string | null;
  isAuthenticated: boolean;

  login: (user: UserAuthenticatedType, token: string) => void;
  logout: () => void;
  handleIsAuthenticated: () => void;
};

const customSecureLocalStorage: StateStorage = {
  getItem: async (key: string) => {
    const value = await secureLocalStorage.getItem(key);
    return convertToString(value);
  },
  setItem: async (key: string, value: string) => {
    await secureLocalStorage.setItem(key, value);
  },
  removeItem: async (key: string) => {
    await secureLocalStorage.removeItem(key);
  },
};

const convertToString = (value: any): string | null => {
  if (typeof value === "string") {
    return value;
  } else if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  } else if (value === null || typeof value === "undefined") {
    return null;
  } else {
    try {
      return JSON.stringify(value);
    } catch (error) {
      return null;
    }
  }
};

export const useAuthStore = create<useAuthStoreTypes>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        token: null,
        isAuthenticated: false,

        login: (user, token) => {
          set({ user, token });
          set({ isAuthenticated: true });
          secureLocalStorage.setItem("access_token", token);
        },
        logout: () => {
          set({ user: null, token: null });
          set({ isAuthenticated: false });
          secureLocalStorage.removeItem("user");
          secureLocalStorage.removeItem("access_token");
        },
        handleIsAuthenticated: () =>
          set({
            isAuthenticated: !!secureLocalStorage.getItem("access_token"),
          }),
      }),
      {
        name: "user",
        storage: createJSONStorage(() => customSecureLocalStorage),
      }
    )
  )
);
