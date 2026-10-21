// ============================================================
//  src/pages/LoginPage.jsx
//  Login form with email + password validation
// ============================================================
import { useState } from 'react';
import { validateLoginForm } from '../utils/validators.js';
import { Icon } from '../components/Icons.jsx';
import FieldMsg from '../components/FieldMsg.jsx';
import SocialButtons from '../components/SocialButtons.jsx';
import Toast from '../components/Toast.jsx';

export default function LoginPage({ onSwitch }) {
  const [fields, setFields] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const newErrors = validateLoginForm({ ...fields, [name]: value });
      setErrors(err => ({ ...err, [name]: newErrors[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const newErrors = validateLoginForm(fields);
    setErrors(err => ({ ...err, [name]: newErrors[name] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched({ email: true, password: true });
    const errs = validateLoginForm(fields);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1500));
    setLoading(false);
    setToast({ show: true, msg: `Welcome back! Logged in as ${fields.email}` });
    setTimeout(() => setToast({ show: false, msg: '' }), 4000);
    setFields({ email: '', password: '' });
    setTouched({});
    setErrors({});
  };

  const getInputClass = (name) => {
    if (!touched[name]) return 'form-input';
    return `form-input ${errors[name] ? 'input-error' : 'input-success'}`;
  };

  return (
    <div className="form-slide-enter">
      <h1 className="auth-title">Welcome back</h1>
      <p className="auth-subtitle">Sign in to your account to continue</p>

      <form id="login-form" onSubmit={handleSubmit} noValidate>

        {/* ── Email ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-email">Email address</label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Mail /></span>
            <input
              id="login-email"
              name="email"
              type="email"
              className={getInputClass('email')}
              placeholder="you@example.com"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-required="true"
              aria-describedby="login-email-msg"
              aria-invalid={!!errors.email}
            />
          </div>
          <div id="login-email-msg">
            <FieldMsg
              error={touched.email && errors.email}
              success={touched.email && !errors.email && fields.email ? 'Looks good!' : ''}
            />
          </div>
        </div>

        {/* ── Password ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="login-password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Lock /></span>
            <input
              id="login-password"
              name="password"
              type={showPass ? 'text' : 'password'}
              className={getInputClass('password')}
              placeholder="Enter your password"
              value={fields.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="current-password"
              aria-required="true"
              aria-describedby="login-pass-msg"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="btn-toggle-pass"
              onClick={() => setShowPass(s => !s)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              id="btn-toggle-login-pass"
            >
              {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
            </button>
          </div>
          <div id="login-pass-msg">
            <FieldMsg
              error={touched.password && errors.password}
              success={touched.password && !errors.password && fields.password ? '✓ Password looks valid' : ''}
            />
          </div>
        </div>

        {/* ── Forgot Password ── */}
        <div className="form-meta">
          <button
            type="button"
            className="link-btn"
            id="btn-forgot-password"
            onClick={() => alert('Password reset flow would open here.')}
          >
            Forgot password?
          </button>
        </div>

        {/* ── Submit ── */}
        <button id="btn-login-submit" type="submit" className="btn-submit" disabled={loading}>
          {loading && <span className="btn-spinner" />}
          {loading ? 'Signing in…' : 'Sign In'}
        </button>

        <SocialButtons action="login" />

        <div className="auth-footer">
          Don&apos;t have an account?{' '}
          <button id="btn-goto-signup" type="button" onClick={onSwitch}>Create account</button>
        </div>
      </form>

      <Toast message={toast.msg} show={toast.show} />
    </div>
  );
}
