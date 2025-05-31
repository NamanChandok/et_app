import { getToken } from "../stores/auth";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(path, method = "GET", data = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(`${API_URL}${path}`, options);
  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.message || "API request failed");
  }

  return json;
}
