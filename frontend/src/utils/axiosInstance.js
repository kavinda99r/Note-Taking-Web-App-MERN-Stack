import axios from "axios";
import { BASE_URL } from "./constants";
// Discard credentials left by the previous browser-token implementation.
try { localStorage.removeItem("token"); } catch { /* Browser storage may be disabled. */ }
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
});
export default axiosInstance;
