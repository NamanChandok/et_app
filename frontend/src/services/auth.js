import { apiFetch } from "./api";
import { login as authLogin } from "../stores/auth";

export async function login(email, password) {
  const res = await apiFetch("/auth/login", "POST", { email, password });
  authLogin(res.data.token);
  return res;
}

export async function register(username, email, password, c_password) {
  const res = await apiFetch("/auth/register", "POST", {
    username,
    email,
    password,
    c_password,
  });
  authLogin(res.data.token);
  return res;
}
