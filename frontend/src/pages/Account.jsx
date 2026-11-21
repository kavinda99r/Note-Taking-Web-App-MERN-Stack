import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PasswordInput from "../components/PasswordInput";
import axiosInstance from "../utils/axiosInstance";

const styles = `
.account-page { min-height: 100svh; }
.account-main {
  width: min(1240px, calc(100% - 96px));
  min-height: calc(100svh - 80px);
  margin-inline: auto;
  padding-block: 20px 26px;
}
.account-navigation {
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 14px;
  color: var(--color-muted);
  margin-bottom: 20px;
}
.account-navigation a {
  color: var(--color-ink);
}
.account-navigation a:hover {
  color: var(--color-primary);
}
.account-navigation > span:last-child {
  color: var(--color-ink);
}
.account-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 18px;
  align-items: start;
}
.account-card {
  min-width: 0;
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 22px 26px;
  background: white;
}
.account-card h2 {
  font-size: 19px;
  font-weight: 600;
  letter-spacing: -.3px;
}
.account-card p {
  font-size: 14px;
  color: var(--color-muted);
  line-height: 1.7;
  margin-top: 8px;
}
.account-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;
  margin-top: 18px;
}
.account-details dt {
  color: var(--color-muted);
  font-size: 13px;
  margin-bottom: 6px;
}
.account-details dd {
  font-size: 17px;
  color: var(--color-ink);
  overflow-wrap: anywhere;
}
.account-form {
  margin-top: 18px;
}
.account-form fieldset {
  min-width: 0;
}
.account-form fieldset:disabled {
  opacity: .65;
}
.account-danger {
  background: var(--color-secondary-soft);
  border-color: var(--color-danger-border);
}
.account-danger h2 {
  color: var(--color-danger);
}
.account-confirmation {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 14px;
  line-height: 1.7;
  color: var(--color-danger);
  margin-bottom: 20px;
}
.account-confirmation input {
  margin-top: 6px;
  accent-color: var(--color-danger);
}
.account-load {
  color: var(--color-muted);
  padding-block: 40px;
}
@media (max-width: 1050px) {
  .account-main {
  width: calc(100% - 56px);
}

}
@media (max-width: 760px) {
  .account-grid {
  grid-template-columns: 1fr;
  gap: 20px;
}

}
@media (max-width: 540px) {
  .account-main {
  width: calc(100% - 36px);
}

}
.account-card-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}
.account-password-fields {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 20px;
}
.account-password-fields > .form-error {
  grid-column: 1 / -1;
}
.account-password-fields > .button-primary {
  grid-column: 1 / -1;
  justify-self: start;
}
.account-danger {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  column-gap: 24px;
  align-items: center;
}
.account-danger > h2 {
  grid-column: 1;
}
.account-danger > p {
  grid-column: 1;
  margin-top: 6px;
}
.account-danger > .button-danger {
  grid-column: 2;
  grid-row: 1 / 3;
  margin-top: 0;
}
.account-danger > .account-form {
  grid-column: 1 / -1;
  border-top: 1px solid var(--color-danger-border);
  padding-top: 20px;
}
@media (max-width: 760px) {
  .account-password-fields {
  grid-template-columns: 1fr;
}

}
@media (max-width: 760px) {
  .account-details {
  grid-template-columns: 1fr;
  gap: 18px;
}

}
@media (max-width: 760px) {
  .account-card {
  padding: 20px;
}

}
@media (max-width: 760px) {
  .account-danger {
  grid-template-columns: 1fr;
}

}
@media (max-width: 760px) {
  .account-danger > .button-danger {
  grid-column: 1;
  grid-row: auto;
  justify-self: start;
  margin-top: 16px;
}

}
`;

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
      <style>{styles}</style>
      <Navbar />
      <main className="account-main" aria-label="Account settings">
        <nav className="account-navigation" aria-label="Account navigation"><Link to="/dashboard">Back to notes</Link><span aria-hidden="true">/</span><span>Account</span></nav>
        {loading ? <p className="account-load" role="status">Loading your account…</p> : loadError ? <div className="account-card" role="alert"><p>{loadError}</p><button className="button-primary" onClick={loadUser}>Try again</button></div> : user && (
          <div className="account-grid">
            <section className="account-card" aria-labelledby="account-details-heading">
                <div className="account-card-heading"><h2 id="account-details-heading">Account Details</h2><button className="button-secondary" onClick={logout} disabled={Boolean(busy)}>Log out</button></div>
                {logoutError && <p className="form-error" role="alert">{logoutError}</p>}
                <dl className="account-details"><div><dt>Full name</dt><dd>{user.fullName}</dd></div><div><dt>Email address</dt><dd>{user.email}</dd></div></dl>
                
              </section>
            <section className="account-card" aria-labelledby="password-heading">
              <h2 id="password-heading">Change password</h2><p>Use at least 8 characters. You’ll sign in again afterward.</p>
              <form className="account-form" onSubmit={changePassword} aria-busy={busy === "password"}>
                <fieldset className="account-password-fields" disabled={Boolean(busy)}>
                  <div className="form-field"><label htmlFor="account-current-password">Current password</label><PasswordInput id="account-current-password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} autoComplete="current-password" required /></div>
                  <div className="form-field"><label htmlFor="account-new-password">New password</label><PasswordInput id="account-new-password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} autoComplete="new-password" required /></div>
                  <div className="form-field"><label htmlFor="account-confirm-password">Confirm new password</label><PasswordInput id="account-confirm-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} autoComplete="new-password" required /></div>
                  {passwordError && <p className="form-error" role="alert">{passwordError}</p>}
                  <button className="button-primary" type="submit">{busy === "password" ? "Updating…" : "Update password"}</button>
                </fieldset>
              </form>
            </section>
            <section className="account-card account-danger" aria-labelledby="delete-heading">
                <h2 id="delete-heading">Delete account</h2><p>Permanently delete your account and all notes. This cannot be undone.</p>
                <button className="button-danger" disabled={Boolean(busy)} aria-expanded={deleting} aria-controls="delete-account-form" onClick={() => { setDeleting(!deleting); setDeletePassword(""); setConfirmed(false); setDeleteError(""); }}>{deleting ? "Cancel" : "Delete account"}</button>
                {deleting && <form id="delete-account-form" className="account-form" onSubmit={deleteAccount} aria-busy={busy === "delete"}><fieldset disabled={Boolean(busy)}><div className="form-field"><label htmlFor="delete-password">Current password</label><PasswordInput id="delete-password" value={deletePassword} onChange={(event) => setDeletePassword(event.target.value)} autoComplete="current-password" required /></div><label className="account-confirmation"><input type="checkbox" checked={confirmed} onChange={(event) => setConfirmed(event.target.checked)} required /> I understand my account and notes will be permanently deleted.</label>{deleteError && <p className="form-error" role="alert">{deleteError}</p>}<button className="button-danger solid" type="submit" disabled={!confirmed}>{busy === "delete" ? "Deleting…" : "Permanently delete account"}</button></fieldset></form>}
              </section>
          </div>
        )}
      </main>
    </div>
  );
};
export default Account;
