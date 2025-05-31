import { reactive } from "vue";

export const authState = reactive({
  isLoggedIn: !!localStorage.getItem("token"),
});

export function login(token) {
  localStorage.setItem("token", token);
  authState.isLoggedIn = true;
}

export function logout() {
  localStorage.removeItem("token");
  authState.isLoggedIn = false;
}

export function getToken() {
  return localStorage.getItem("token");
}
