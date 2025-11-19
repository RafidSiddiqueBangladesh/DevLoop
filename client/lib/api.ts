export type ApiError = { error?: string; message?: string };

const BASE_URL = ""; // same-origin, Express mounted under Vite

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const contentType = res.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    const msg = (isJson ? (body as ApiError).error || (body as ApiError).message : String(body)) || "Request failed";
    throw new Error(msg);
  }
  return body as T;
}

export async function apiUpload<T>(
  path: string,
  formData: FormData,
  token?: string | null,
): Promise<T> {
  const headers: HeadersInit = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  const body = await res.json();
  if (!res.ok) {
    const msg = (body as ApiError).error || (body as ApiError).message || "Upload failed";
    throw new Error(msg);
  }
  return body as T;
}