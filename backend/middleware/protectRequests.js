function allowedOrigins() {
  const configured = (process.env.FRONTEND_ORIGIN || "").split(",").map((origin) => origin.trim().replace(/\/$/, "")).filter(Boolean);
  const vercelOrigins = process.env.VERCEL === "1"
    ? [process.env.VERCEL_URL, process.env.VERCEL_PROJECT_PRODUCTION_URL].filter(Boolean).map((host) => `https://${host}`)
    : [];
  const localOrigins = process.env.NODE_ENV !== "production" && process.env.VERCEL !== "1"
    ? ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:4173", "http://127.0.0.1:4173"]
    : [];
  return [...new Set([...configured, ...vercelOrigins, ...localOrigins])];
}
function protectRequests(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.headers.origin;
  if (origin && !allowedOrigins().includes(origin)) return res.status(403).json({ error: true, message: "Untrusted request origin" });
  if (req.headers.cookie && req.headers["x-requested-with"] !== "XMLHttpRequest") return res.status(403).json({ error: true, message: "Request verification failed" });
  next();
}
module.exports = { allowedOrigins, protectRequests };
