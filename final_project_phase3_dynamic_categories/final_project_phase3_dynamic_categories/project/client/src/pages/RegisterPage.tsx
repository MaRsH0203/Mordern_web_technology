import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

// ✅ configurable API base (falls back to 3000)
const API_BASE =
  (import.meta as any).env?.VITE_API_BASE || 'http://localhost:3000';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Basic validation
    if (!formData.name.trim()) {
      setLoading(false);
      return setError('Please enter your full name.');
    }
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!emailOk) {
      setLoading(false);
      return setError('Please enter a valid email address.');
    }
    if (formData.password.length < 6) {
      setLoading(false);
      return setError('Password must be at least 6 characters long.');
    }
    if (formData.password !== formData.confirmPassword) {
      setLoading(false);
      return setError('Passwords do not match.');
    }

    try {
      // ⏱ add a timeout so we can surface "Network error" nicely
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 12000);

      const res = await fetch(`${API_BASE}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim().toLowerCase(),
          password: formData.password,
        }),
      }).finally(() => clearTimeout(id));

      // Try to parse JSON even on non-2xx
      let data: any = null;
      try {
        data = await res.json();
      } catch {
        /* ignore parse errors; we'll fall back to status text */
      }

      if (!res.ok) {
        // common messages from our backend
        const msg =
          data?.message ||
          (res.status === 409
            ? 'Email already registered.'
            : res.status === 400
            ? 'Invalid input. Please check your details.'
            : 'Server error. Please try again.');
        throw new Error(msg);
      }

      // success shape expected from backend:
      // { success: true, user: { id, name, email }, message? }
      if (data?.success) {
        setUser?.(data.user);
        setSuccess('Account created! Redirecting…');
        // go to profile or login — choose one:
        navigate('/profile'); // or: navigate('/login');
      } else {
        throw new Error(data?.message || 'Registration failed.');
      }
    } catch (err: any) {
      if (err?.name === 'AbortError') {
        setError('Request timed out. Please check your connection and try again.');
      } else {
        setError(err?.message || 'Network error. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card">
          <h2>Join EcoCart</h2>
          <p>Create your account and start shopping sustainably</p>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                autoComplete="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password (min 6 characters)"
                autoComplete="new-password"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                autoComplete="new-password"
                required
              />
            </div>

            <button type="submit" className="auth-button" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div className="auth-footer">
            <p>
              Already have an account?
              <Link to="/login" className="auth-link"> Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;