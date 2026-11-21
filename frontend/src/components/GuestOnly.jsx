import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
const GuestOnly = ({
  children
}) => {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStatus("loading");
    axiosInstance.get("/get-user", {
      signal: controller.signal
    }).then(() => {
      if (!controller.signal.aborted) setStatus("authenticated");
    }).catch(error => {
      if (!controller.signal.aborted) setStatus(error.response?.status === 401 ? "guest" : "error");
    });
    return () => controller.abort();
  }, [attempt]);
  if (status === "authenticated") return <Navigate to="/dashboard" replace />;
  if (status === "guest") return children;
  return <main className="min-h-[100svh] flex flex-col items-center justify-center gap-[18px] bg-base text-muted p-6 text-center [&_button]:text-primary [&_button]:py-2.5 [&_button]:px-[18px] [&_button]:border [&_button]:border-border [&_button]:rounded-[8px]" role="status"><p>{status === "loading" ? "Opening your notebook…" : "Unable to check your session. Please try again."}</p>{status === "error" && <button onClick={() => setAttempt(value => value + 1)}>Try again</button>}</main>;
};
GuestOnly.propTypes = {
  children: PropTypes.node.isRequired
};
export default GuestOnly;
