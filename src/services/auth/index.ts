import { UserLoginType, UserRegisterType } from "@/types";

export const createUser = async (user: UserRegisterType) => {
  const response = await fetch(`${process.env.API_URL}/users/`, {
    body: JSON.stringify(user),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao tentar criar sua conta, tente novamente!");
  }

  const userCreated = await response.json();

  return userCreated;
};

export const login = async (user: UserLoginType) => {
  const payload = new URLSearchParams();

  payload.append("username", user.username);
  payload.append("password", user.password);
  payload.append("grant_type", "password");

  const response = await fetch(`${process.env.API_URL}/login`, {
    body: payload,
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
    },
  });

  if (!response.ok) {
    throw new Error("Tente novamente");
  }

  const loggedIn = await response.json();

  return loggedIn;
};
