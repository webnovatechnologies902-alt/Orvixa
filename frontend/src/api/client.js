const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1"
).replace(/\/+$/, "");

export class ApiClientError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiClientError";
    this.status = status;
  }
}

export const request = async (path, { method = "GET", body, token } = {}) => {
  const headers = { Accept: "application/json" };
  const authToken = token || localStorage.getItem("orvixa_token");

  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (authToken) headers.Authorization = `Bearer ${authToken}`;

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers,
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiClientError(
      `Could not connect to the API at ${API_BASE_URL}. Check the backend server and VITE_API_URL.`,
      0
    );
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok || payload?.success === false) {
    const validationErrors = payload?.errors
      ?.map((error) => error.message)
      .filter(Boolean)
      .join(" ");
    throw new ApiClientError(
      validationErrors || payload?.message || `Request failed (${response.status})`,
      response.status
    );
  }

  return payload?.data;
};

export const getMoviePath = (movieId) =>
  `/movies/${encodeURIComponent(movieId)}`;
