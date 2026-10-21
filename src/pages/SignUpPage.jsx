// ============================================================
//  src/pages/SignUpPage.jsx
//  Sign-up form with full field validation + strength meter
// ============================================================
import { useState } from 'react';
import { validateSignUpForm } from '../utils/validators.js';
import { Icon } from '../components/Icons.jsx';
import FieldMsg from '../components/FieldMsg.jsx';
import PasswordStrengthBar from '../components/PasswordStrengthBar.jsx';
import SocialButtons from '../components/SocialButtons.jsx';
import Toast from '../components/Toast.jsx';

export default function SignUpPage({ onSwitch }) {
  const [fields, setFields] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [agreedError, setAgreedError] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, msg: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields(f => ({ ...f, [name]: value }));
    if (touched[name]) {
      const next = { ...fields, [name]: value };
      const errs = validateSignUpForm({ ...next, agreed });
      setErrors(err => ({ ...err, [name]: errs[name] }));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched(t => ({ ...t, [name]: true }));
    const errs = validateSignUpForm({ ...fields, agreed });
    setErrors(err => ({ ...err, [name]: errs[name] }));
  };

  const handleAgreeToggle = () => {
    setAgreed(a => {
      const next = !a;
      if (next) setAgreedError('');
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = {
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true,
    };
    setTouched(allTouched);
    const errs = validateSignUpForm({ ...fields, agreed });
    setErrors(errs);
    if (errs.agreed) setAgreedError(errs.agreed);
    if (Object.keys(errs).length > 0) return;

    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    setLoading(false);
    setToast({ show: true, msg: `🎉 Account created for ${fields.email}!` });
    setTimeout(() => {
      setToast({ show: false, msg: '' });
      onSwitch();
    }, 3000);
  };

  const getInputClass = (name) => {
    if (!touched[name]) return 'form-input';
    return `form-input ${errors[name] ? 'input-error' : 'input-success'}`;
  };

  return (
    <div className="form-slide-enter">
      <h1 className="auth-title">Create account</h1>
      <p className="auth-subtitle">Join thousands of users today — it&apos;s free!</p>

      <form id="signup-form" onSubmit={handleSubmit} noValidate>

        {/* ── Name Row ── */}
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="signup-first-name">First name</label>
            <div className="input-wrapper">
              <span className="input-icon"><Icon.User /></span>
              <input
                id="signup-first-name"
                name="firstName"
                type="text"
                className={getInputClass('firstName')}
                placeholder="Jane"
                value={fields.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="given-name"
                aria-required="true"
                aria-describedby="signup-fn-msg"
                aria-invalid={!!errors.firstName}
              />
            </div>
            <div id="signup-fn-msg">
              <FieldMsg error={touched.firstName && errors.firstName} />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="signup-last-name">Last name</label>
            <div className="input-wrapper">
              <span className="input-icon"><Icon.User /></span>
              <input
                id="signup-last-name"
                name="lastName"
                type="text"
                className={getInputClass('lastName')}
                placeholder="Doe"
                value={fields.lastName}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="family-name"
                aria-required="true"
                aria-describedby="signup-ln-msg"
                aria-invalid={!!errors.lastName}
              />
            </div>
            <div id="signup-ln-msg">
              <FieldMsg error={touched.lastName && errors.lastName} />
            </div>
          </div>
        </div>

        {/* ── Email ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-email">Email address</label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Mail /></span>
            <input
              id="signup-email"
              name="email"
              type="email"
              className={getInputClass('email')}
              placeholder="you@example.com"
              value={fields.email}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="email"
              aria-required="true"
              aria-describedby="signup-email-msg"
              aria-invalid={!!errors.email}
            />
          </div>
          <div id="signup-email-msg">
            <FieldMsg
              error={touched.email && errors.email}
              success={touched.email && !errors.email && fields.email ? 'Valid email ✓' : ''}
            />
          </div>
        </div>

        {/* ── Phone (optional) ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-phone">
            Phone number{' '}
            <span style={{ color: 'var(--text-muted)', fontSize: '11px' }}>(optional)</span>
          </label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Phone /></span>
            <input
              id="signup-phone"
              name="phone"
              type="tel"
              className={getInputClass('phone')}
              placeholder="+1 (555) 000-0000"
              value={fields.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="tel"
              aria-describedby="signup-phone-msg"
              aria-invalid={!!errors.phone}
            />
          </div>
          <div id="signup-phone-msg">
            <FieldMsg error={touched.phone && errors.phone} />
          </div>
        </div>

        {/* ── Password ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-password">Password</label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Lock /></span>
            <input
              id="signup-password"
              name="password"
              type={showPass ? 'text' : 'password'}
              className={getInputClass('password')}
              placeholder="Create a strong password"
              value={fields.password}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="signup-pass-msg"
              aria-invalid={!!errors.password}
            />
            <button
              type="button"
              className="btn-toggle-pass"
              onClick={() => setShowPass(s => !s)}
              aria-label={showPass ? 'Hide password' : 'Show password'}
              id="btn-toggle-signup-pass"
            >
              {showPass ? <Icon.EyeOff /> : <Icon.Eye />}
            </button>
          </div>
          <PasswordStrengthBar password={fields.password} />
          <div id="signup-pass-msg">
            <FieldMsg error={touched.password && errors.password} />
          </div>
        </div>

        {/* ── Confirm Password ── */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-confirm-password">Confirm password</label>
          <div className="input-wrapper">
            <span className="input-icon"><Icon.Lock /></span>
            <input
              id="signup-confirm-password"
              name="confirmPassword"
              type={showConfirm ? 'text' : 'password'}
              className={getInputClass('confirmPassword')}
              placeholder="Re-enter your password"
              value={fields.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="signup-confirm-msg"
              aria-invalid={!!errors.confirmPassword}
            />
            <button
              type="button"
              className="btn-toggle-pass"
              onClick={() => setShowConfirm(s => !s)}
              aria-label={showConfirm ? 'Hide confirm password' : 'Show confirm password'}
              id="btn-toggle-confirm-pass"
            >
              {showConfirm ? <Icon.EyeOff /> : <Icon.Eye />}
            </button>
          </div>
          <div id="signup-confirm-msg">
            <FieldMsg
              error={touched.confirmPassword && errors.confirmPassword}
              success={touched.confirmPassword && !errors.confirmPassword && fields.confirmPassword ? 'Passwords match ✓' : ''}
            />
          </div>
        </div>

        {/* ── Terms Checkbox ── */}
        <div className="checkbox-wrapper">
          <div
            id="checkbox-terms"
            className={`custom-checkbox ${agreed ? 'checked' : ''} ${agreedError ? 'error-border' : ''}`}
            onClick={handleAgreeToggle}
            role="checkbox"
            aria-checked={agreed}
            tabIndex="0"
            onKeyDown={(e) => e.key === ' ' && handleAgreeToggle()}
          >
            <Icon.Check />
          </div>
          <label className="checkbox-label" onClick={handleAgreeToggle}>
            I agree to the{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
            {' '}and{' '}
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </label>
        </div>

        {agreedError && (
          <div className="field-message error" style={{ marginTop: '-16px', marginBottom: '14px' }}>
            <Icon.AlertCircle />
            <span>{agreedError}</span>
          </div>
        )}

        {/* ── Submit ── */}
        <button id="btn-signup-submit" type="submit" className="btn-submit" disabled={loading}>
          {loading && <span className="btn-spinner" />}
          {loading ? 'Creating account…' : 'Create Account'}
        </button>

        <SocialButtons action="signup" />

        <div className="auth-footer">
          Already have an account?{' '}
          <button id="btn-goto-login" type="button" onClick={onSwitch}>Sign in</button>
        </div>
      </form>

      <Toast message={toast.msg} show={toast.show} />
    </div>
  );
}
