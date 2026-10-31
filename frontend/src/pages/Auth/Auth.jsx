import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";

import { ApiClientError } from "../../api/client";
import { useAuth } from "../../auth/useAuth";

const Auth = ({ mode }) => {
  const isRegister = mode === "register";
  const { isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (isAuthenticated) return <Navigate to="/profile" replace />;

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      await signIn(
        isRegister
          ? form
          : { email: form.email, password: form.password },
        isRegister ? "register" : "login"
      );
      navigate(searchParams.get("next") || "/", { replace: true });
    } catch (requestError) {
      setError(
        requestError instanceof ApiClientError
          ? requestError.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-vh-100 bg-dark text-white d-flex align-items-center justify-content-center px-3 py-5">
      <section className="bg-black rounded-4 p-4 p-md-5 w-100" style={{ maxWidth: 440 }}>
        <Link to="/" className="text-danger text-decoration-none fs-2 fw-bold">
          Orvixa
        </Link>
        <h1 className="h3 fw-bold mt-4 mb-2">
          {isRegister ? "Create your account" : "Welcome back"}
        </h1>
        <p className="text-secondary mb-4">
          {isRegister ? "Sign up to save your favorites and watch history." : "Sign in to continue to Orvixa."}
        </p>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} className="d-grid gap-3">
          {isRegister && (
            <label>
              <span className="form-label">Name</span>
              <input
                className="form-control"
                autoComplete="name"
                required
                minLength={2}
                maxLength={50}
                value={form.name}
                onChange={(event) => setForm({ ...form, name: event.target.value })}
              />
            </label>
          )}
          <label>
            <span className="form-label">Email</span>
            <input
              className="form-control"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) => setForm({ ...form, email: event.target.value })}
            />
          </label>
          <label>
            <span className="form-label">Password</span>
            <input
              className="form-control"
              type="password"
              autoComplete={isRegister ? "new-password" : "current-password"}
              required
              minLength={isRegister ? 6 : undefined}
              value={form.password}
              onChange={(event) => setForm({ ...form, password: event.target.value })}
            />
          </label>
          <button className="btn btn-danger btn-lg mt-2" disabled={submitting}>
            {submitting ? "Please wait..." : isRegister ? "Create account" : "Sign in"}
          </button>
        </form>

        <p className="text-secondary mt-4 mb-0">
          {isRegister ? "Already have an account? " : "New to Orvixa? "}
          <Link to={isRegister ? "/login" : "/register"} className="text-white">
            {isRegister ? "Sign in" : "Create an account"}
          </Link>
        </p>
      </section>
    </main>
  );
};

export default Auth;
