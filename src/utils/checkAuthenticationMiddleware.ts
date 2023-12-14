import secureLocalStorage from "react-secure-storage";

export const checkAuthenticationMiddleware = async () => {
  const token = secureLocalStorage.getItem("access_token");

  if (!token) {
    throw new Error("Faça login para interagir");
  }

  return token;
};
