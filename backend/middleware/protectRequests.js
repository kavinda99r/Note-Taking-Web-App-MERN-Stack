const allowedOrigins = () => (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173,http://localhost:4173,http://127.0.0.1:4173").split(",").map((origin) => origin.trim()).filter(Boolean);
function protectRequests(req, res, next) {
  if (["GET", "HEAD", "OPTIONS"].includes(req.method)) return next();
  const origin = req.headers.origin;
  if (origin && !allowedOrigins().includes(origin)) return res.status(403).json({ error: true, message: "Untrusted request origin" });
  // Custom headers cannot be sent by cross-site forms; untrusted sites cannot pass CORS preflight.
  if (req.headers.cookie && req.headers["x-requested-with"] !== "XMLHttpRequest") return res.status(403).json({ error: true, message: "Request verification failed" });
  next();
}
module.exports = { allowedOrigins, protectRequests };
