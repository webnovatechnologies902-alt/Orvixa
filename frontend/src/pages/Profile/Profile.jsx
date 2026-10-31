import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { request } from "../../api/client";
import { useAuth } from "../../auth/useAuth";
import ApiFeedback from "../../components/ApiFeedback";
import Navbar from "../../components/Navbar/Navbar";
import styles from "./Profile.module.css";

const ProfileSettings = ({ user }) => {
  const { setUser, signOut, clearSession, showNotice } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ name: user.name, email: user.email });
  const [password, setPassword] = useState({ currentPassword: "", newPassword: "" });
  const [preferences, setPreferences] = useState({
    language: user.preferences?.language || "English",
    playbackQuality: user.preferences?.playbackQuality || "auto",
    notificationsEnabled: user.preferences?.notificationsEnabled ?? true,
  });
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingPreferences, setSavingPreferences] = useState(false);
  const [error, setError] = useState("");

  const saveProfile = async (event) => {
    event.preventDefault();
    setSavingProfile(true);
    setError("");
    try {
      const { user: updatedUser } = await request("/users/me", {
        method: "PATCH",
        body: profile,
      });
      setUser(updatedUser);
      showNotice("Profile updated.", "success");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingProfile(false);
    }
  };

  const savePassword = async (event) => {
    event.preventDefault();
    setSavingPassword(true);
    setError("");
    try {
      await request("/users/me/password", { method: "PATCH", body: password });
      setPassword({ currentPassword: "", newPassword: "" });
      showNotice("Password updated. Sign in again with your new password.", "success");
      clearSession();
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingPassword(false);
    }
  };

  const savePreferences = async (event) => {
    event.preventDefault();
    setSavingPreferences(true);
    setError("");
    try {
      const { preferences: updatedPreferences } = await request("/users/me/preferences", {
        method: "PATCH",
        body: preferences,
      });
      setUser({ ...user, preferences: updatedPreferences });
      showNotice("Preferences saved.", "success");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSavingPreferences(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate("/login", { replace: true });
    } catch (requestError) {
      showNotice(requestError.message);
    }
  };

  return (
    <main className="min-vh-100 bg-dark text-white">
      <Navbar />
      <section className={`container ${styles.page}`}>
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8 col-xl-7">
            <div className="text-center mb-5">
              <div className={styles.avatar}>
                {user.avatar ? (
                  <img src={user.avatar} alt="" className="w-100 h-100 rounded-circle object-fit-cover" />
                ) : (
                  <i className="bi bi-person-fill" />
                )}
              </div>
              <h1 className="fs-3 fw-bold mb-1">{user.name}</h1>
              <p className="text-secondary mb-0">{user.email}</p>
            </div>

            {error && <div className="alert alert-danger" role="alert">{error}</div>}

            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">Account</h2>
              <div className={`rounded-3 p-3 ${styles.card}`}>
                <form onSubmit={saveProfile}>
                  <label className="form-label w-100">
                    Name
                    <input
                      className="form-control mt-1"
                      minLength={2}
                      maxLength={50}
                      required
                      value={profile.name}
                      onChange={(event) => setProfile({ ...profile, name: event.target.value })}
                    />
                  </label>
                  <label className="form-label w-100 mt-2">
                    Email
                    <input
                      className="form-control mt-1"
                      type="email"
                      required
                      value={profile.email}
                      onChange={(event) => setProfile({ ...profile, email: event.target.value })}
                    />
                  </label>
                  <button className="btn btn-outline-light btn-sm mt-2" disabled={savingProfile}>
                    {savingProfile ? "Saving..." : "Save account"}
                  </button>
                </form>

                <hr className="border-secondary" />
                <form onSubmit={savePassword}>
                  <h3 className="fs-6 fw-semibold">Change password</h3>
                  <label className="form-label w-100">
                    Current password
                    <input
                      className="form-control mt-1"
                      type="password"
                      required
                      autoComplete="current-password"
                      value={password.currentPassword}
                      onChange={(event) => setPassword({ ...password, currentPassword: event.target.value })}
                    />
                  </label>
                  <label className="form-label w-100">
                    New password
                    <input
                      className="form-control mt-1"
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      value={password.newPassword}
                      onChange={(event) => setPassword({ ...password, newPassword: event.target.value })}
                    />
                  </label>
                  <button className="btn btn-outline-light btn-sm" disabled={savingPassword}>
                    {savingPassword ? "Saving..." : "Update password"}
                  </button>
                </form>
              </div>
            </section>

            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">Preferences</h2>
              <form className={`rounded-3 p-3 ${styles.card}`} onSubmit={savePreferences}>
                <label className="form-label w-100">
                  Language
                  <input
                    className="form-control mt-1"
                    maxLength={30}
                    value={preferences.language}
                    onChange={(event) => setPreferences({ ...preferences, language: event.target.value })}
                  />
                </label>
                <label className="form-label w-100">
                  Playback quality
                  <select
                    className="form-select mt-1"
                    value={preferences.playbackQuality}
                    onChange={(event) => setPreferences({ ...preferences, playbackQuality: event.target.value })}
                  >
                    <option value="auto">Auto</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </label>
                <label className="form-check form-switch my-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={preferences.notificationsEnabled}
                    onChange={(event) => setPreferences({ ...preferences, notificationsEnabled: event.target.checked })}
                  />
                  <span className="form-check-label">Notifications enabled</span>
                </label>
                <button className="btn btn-outline-light btn-sm" disabled={savingPreferences}>
                  {savingPreferences ? "Saving..." : "Save preferences"}
                </button>
              </form>
            </section>

            <section className="mb-4">
              <h2 className="fs-5 fw-semibold mb-3">Your activity</h2>
              <div className={`rounded-3 p-3 ${styles.card} d-flex flex-wrap gap-3`}>
                <Link to="/my-list" className="btn btn-outline-light">My List & likes</Link>
                <Link to="/my-list" className="btn btn-outline-light">Watch history</Link>
              </div>
            </section>

            <div className="text-center mt-5">
              <button className="btn btn-outline-danger px-4" onClick={handleSignOut}>
                <i className="bi bi-box-arrow-right me-2" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

const Profile = () => {
  const { user, token, loading, authError } = useAuth();

  if (loading) {
    return (
      <main className="min-vh-100 bg-dark text-white">
        <Navbar />
        <div className="container py-5"><ApiFeedback loading /></div>
      </main>
    );
  }

  if (!token) return <Navigate to="/login?next=%2Fprofile" replace />;
  if (!user) {
    return (
      <main className="min-vh-100 bg-dark text-white">
        <Navbar />
        <div className="container py-5">
          <ApiFeedback error={authError || "Could not load your profile. Please retry."} />
        </div>
      </main>
    );
  }
  return <ProfileSettings key={user.id} user={user} />;
};

export default Profile;
