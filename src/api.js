import { BASE_API } from "./config";

export const apiFetch = async (path, options = {}) => {
  const res = await fetch(`${BASE_API}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!res.ok) throw new Error("Có lỗi xảy ra. Vui lòng thử lại.");

  const result = res.json();

  return result;
};

export const get = (path) => apiFetch(path);

export const post = (path, data) =>
  apiFetch(path, {
    method: "POST",
    body: JSON.stringify(data),
  });
