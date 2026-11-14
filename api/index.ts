import { handle } from "hono/vercel";
import app from "../server/app.js";

const honoHandler = handle(app);

export default function handler(request: Request) {
  const url = new URL(request.url);
  const path = url.searchParams.get("__vercel_path");
  if (path === null) return honoHandler(request);

  url.pathname = `/api/${path}`;
  url.searchParams.delete("__vercel_path");
  return honoHandler(new Request(url, request));
}
