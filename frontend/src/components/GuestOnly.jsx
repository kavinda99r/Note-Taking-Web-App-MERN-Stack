import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const styles = `
.session-check {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  background: var(--color-base);
  color: var(--color-muted);
  padding: 24px;
  text-align: center;
}
.session-check button {
  color: var(--color-primary);
  padding: 10px 18px;
  border: 1px solid var(--color-border);
  border-radius: 8px;
}
`;

const GuestOnly = ({ children }) => {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    axiosInstance.get("/get-user", { signal: controller.signal }).then(() => {
      if (!controller.signal.aborted) setStatus("authenticated");
    }).catch((error) => {
      if (!controller.signal.aborted) setStatus(error.response?.status === 401 ? "guest" : "error");
    });
    return () => controller.abort();
  }, [attempt]);
  if (status === "authenticated") return <Navigate to="/dashboard" replace />;
  if (status === "guest") return children;
  return <main className="session-check" role="status"><style>{styles}</style><p>{status === "loading" ? "Opening your notebook…" : "Unable to check your session. Please try again."}</p>{status === "error" && <button onClick={() => setAttempt((value) => value + 1)}>Try again</button>}</main>;
};
GuestOnly.propTypes = { children: PropTypes.node.isRequired };
export default GuestOnly;
