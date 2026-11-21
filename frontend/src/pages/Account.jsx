import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";
import "./Home.css";
import "./Account.css";

const Account = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [busy, setBusy] = useState("");
  const [logoutError, setLogoutError] = useState("");
  const navigate = useNavigate();
  const logout = async () => {
    if (busy) return;
    setBusy("logout");
    setLogoutError("");
    try { await axiosInstance.post("/logout"); navigate("/login", { replace: true }); }
    catch { setLogoutError("Unable to log out. Please try again."); }
    finally { setBusy(""); }
  };
  const loadUser = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try { const { data } = await axiosInstance.get("/get-user"); setUser(data.user); }
    catch (error) {
      if (error.response?.status === 401) { navigate("/login", { replace: true }); }
      else setLoadError("Your account couldn’t load. Please try again.");
    } finally { setLoading(false); }
  }, [navigate]);
  useEffect(() => { loadUser(); }, [loadUser]);
  const handleFailure = (error, setError, fallback) => {
    if (error.response?.status === 401) navigate("/login", { replace: true });
    else setError(error.response?.data?.message || fallback);
  };
  const changePassword = async (event) => {
    event.preventDefault();
    if (busy) return;
    setPasswordError("");
    if (newPassword.length < 8) { setPasswordError("Use at least 8 characters for your new password."); return; }
    if (newPassword !== confirmPassword) { setPasswordError("The new passwords don’t match."); return; }
    setBusy("password");
    try {
      await axiosInstance.put("/account/password", { currentPassword, newPassword });

      navigate("/login", { replace: true, state: { notice: "Password changed. Sign in with your new password." } });
    } catch (error) { handleFailure(error, setPasswordError, "Unable to change your password. Please try again."); }
    finally { setBusy(""); }
  };
  const deleteAccount = async (event) => {
    event.preventDefault();
    if (busy || !confirmed) return;
    setBusy("delete");
    setDeleteError("");
    try {
      await axiosInstance.delete("/account", { data: { currentPassword: deletePassword } });

      navigate("/", { replace: true });
    } catch (error) { handleFailure(error, setDeleteError, "Unable to delete your account. Please try again."); }
    finally { setBusy(""); }
  };
  return (
    <div className="dashboard account-page">
      <Navbar />
      <main className="account-main" aria-label="Account settings">
        <nav className="account-navigation" aria-label="Account navigation"><Link to="/dashboard">Back to notes</Link><span aria-hidden="true">/</span><span>Account</span></nav>
        {loading ? <p className="account-load" role="status">Loading your account…</p> : loadError ? <div className="account-card" role="alert"><p>{loadError}</p><button className="dashboard-primary" onClick={loadUser}>Try again</button></div> : user && (
          <div className="account-grid">
            <section className="account-card" aria-labelledby="account-details-heading">
                <div className="account-card-heading"><h2 id="account-details-heading">Account Details</h2><button className="account-outline" onClick={logout} disabled={Boolean(busy)}>Log out</button></div>
                {logoutError && <p className="account-error" role="alert">{logoutError}</p>}
                <dl className="account-details"><div><dt>Full name</dt><dd>{user.fullName}</dd></div><div><dt>Email address</dt><dd>{user.email}</dd></div></dl>
                
              </section>
            <section className="account-card" aria-labelledby="password-heading">
              <h2 id="password-heading">Change password</h2><p>Use at least 8 characters. You’ll sign in again afterward.</p>
              <form className="account-form" onSubmit={changePassword} aria-busy={busy === "password"}>
                <fieldset className="account-password-fields" disabled={Boolean(busy)}>
                  <div className="account-field"><label htmlFor="account-current-password">Current password</label><PasswordInput id="account-current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required /></div>
                  <div className="account-field"><label htmlFor="account-new-password">New password</label><PasswordInput id="account-new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" required /></div>
                  <div className="account-field"><label htmlFor="account-confirm-password">Confirm new password</label><PasswordInput id="account-confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required /></div>
                  {passwordError && <p className="account-error" role="alert">{passwordError}</p>}
                  <button className="dashboard-primary" type="submit">{busy === "password" ? "Updating…" : "Update password"}</button>
                </fieldset>
              </form>
            </section>
            <section className="account-card account-danger" aria-labelledby="delete-heading">
                <h2 id="delete-heading">Delete account</h2><p>Permanently delete your account and all notes. This cannot be undone.</p>
                <button className="account-danger-button" disabled={Boolean(busy)} aria-expanded={deleting} aria-controls="delete-account-form" onClick={() => { setDeleting(!deleting); setDeletePassword(""); setConfirmed(false); setDeleteError(""); }}>{deleting ? "Cancel" : "Delete account"}</button>
                {deleting && <form id="delete-account-form" className="account-form" onSubmit={deleteAccount} aria-busy={busy === "delete"}><fieldset disabled={Boolean(busy)}><div className="account-field"><label htmlFor="delete-password">Current password</label><PasswordInput id="delete-password" value={deletePassword} onChange={(event) => setDeletePassword(event.target.value)} autoComplete="current-password" required /></div><label className="account-confirmation"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} required /> I understand my account and notes will be permanently deleted.</label>{deleteError && <p className="account-error" role="alert">{deleteError}</p>}<button className="account-danger-button solid" type="submit" disabled={!confirmed}>{busy === "delete" ? "Deleting…" : "Permanently delete account"}</button></fieldset></form>}
              </section>
          </div>
        )}
      </main>
    </div>
  );
};
export default Account;
