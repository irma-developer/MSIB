import API from "../_api";

const TOKEN_KEY = "token";
const USER_KEY = "auth_user";

export const setAuth = ({ token, user }) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY) || "null");
  } catch {
    return null;
  }
};

export const register = async ({
  name,
  email,
  password,
  password_confirmation,
}) => {
  const { data } = await API.post("/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  return data;
};

export const login = async (email, password) => {
  const { data } = await API.post("/login", { email, password });
  const token = data?.token || data?.data?.token;
  const user = data?.user || data?.data?.user;
  if (!token) throw new Error("Token tidak ditemukan di response login.");
  setAuth({ token, user });
  return { token, user };
};

export const logout = async () => {
  try {
    await API.post("/logout");
  } catch (e) {
    console.warn(
      "Server logout gagal/tdk tersedia, lanjut clear local:",
      e?.response?.data || e.message
    );
  } finally {
    clearAuth();
  }
};
