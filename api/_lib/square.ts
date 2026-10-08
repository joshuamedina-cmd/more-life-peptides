const SQUARE_VERSION = "2025-01-23";

export function squareBase(): string {
  return (process.env.SQUARE_ENV || "sandbox").toLowerCase() === "production"
    ? "https://connect.squareup.com"
    : "https://connect.squareupsandbox.com";
}

export async function squareFetch(path: string, init: RequestInit = {}): Promise<any> {
  const token = process.env.SQUARE_ACCESS_TOKEN;
  if (!token) throw new Error("SQUARE_ACCESS_TOKEN is not set");
  const res = await fetch(`${squareBase()}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Square-Version": SQUARE_VERSION,
      ...(init.headers || {}),
    },
  });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = text; }
  if (!res.ok) {
    const err: any = new Error(body?.errors?.[0]?.detail || body?.errors?.[0]?.code || `Square ${res.status}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  return body;
}
