// ============================================================
//  AuthFlow App – React + JSX (CDN Babel, no build step)
//  Features: Login, Sign-Up, Full Validation, Animated UI
// ============================================================

const { useState, useEffect, useCallback, useRef } = React;

// ─── ICONS (inline SVG helpers) ─────────────────────────────
const Icon = {
  User: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  ),
  Mail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  ),
  Lock: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  EyeOff: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/>
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/>
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/>
      <line x1="2" y1="2" x2="22" y2="22"/>
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" width="11" height="11">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
  Google: () => (
    <svg viewBox="0 0 48 48" width="18" height="18">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  ),
  Phone: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="17" height="17">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 21 16.92z"/>
    </svg>
  ),
  AlertCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <circle cx="12" cy="12" r="10"/>
      <line x1="12" y1="8" x2="12" y2="12"/>
      <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
  ),
  CheckCircle: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="13" height="13">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
  ),
  Sparkle: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
      <path d="M12 2L9.19 9.19 2 12l7.19 2.81L12 22l2.81-7.19L22 12l-7.19-2.81z"/>
    </svg>
  ),
  CheckToast: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  ),
};

// ─── VALIDATION UTILITIES ────────────────────────────────────
const Validators = {
  required: (val) => val.trim().length > 0,
  email: (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()),
  minLength: (n) => (val) => val.length >= n,
  maxLength: (n) => (val) => val.length <= n,
  noSpaces: (val) => !/\s/.test(val),
  phone: (val) => /^\+?[\d\s\-().]{7,15}$/.test(val.trim()),
  passwordStrength: (val) => {
    let score = 0;
    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    return score;
  },
};

function getPasswordStrengthLabel(score) {
  if (score === 0) return { label: '', cls: '' };
  if (score === 1) return { label: 'Weak', cls: 'weak' };
  if (score === 2) return { label: 'Fair', cls: 'fair' };
  if (score === 3) return { label: 'Good', cls: 'good' };
  return { label: 'Strong', cls: 'strong' };
}

function validateLoginForm(fields) {
  const errors = {};
  if (!Validators.required(fields.email)) {
    errors.email = 'Email address is required.';
  } else if (!Validators.email(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (!Validators.required(fields.password)) {
    errors.password = 'Password is required.';
  } else if (!Validators.minLength(6)(fields.password)) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

function validateSignUpForm(fields) {
  const errors = {};
  if (!Validators.required(fields.firstName)) {
    errors.firstName = 'First name is required.';
  } else if (!Validators.minLength(2)(fields.firstName.trim())) {
    errors.firstName = 'First name must be at least 2 characters.';
  }
  if (!Validators.required(fields.lastName)) {
    errors.lastName = 'Last name is required.';
  } else if (!Validators.minLength(2)(fields.lastName.trim())) {
    errors.lastName = 'Last name must be at least 2 characters.';
  }
  if (!Validators.required(fields.email)) {
    errors.email = 'Email address is required.';
  } else if (!Validators.email(fields.email)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (fields.phone && fields.phone.trim() && !Validators.phone(fields.phone)) {
    errors.phone = 'Please enter a valid phone number.';
  }
  if (!Validators.required(fields.password)) {
    errors.password = 'Password is required.';
  } else if (!Validators.minLength(8)(fields.password)) {
    errors.password = 'Password must be at least 8 characters.';
  } else if (Validators.passwordStrength(fields.password) < 2) {
    errors.password = 'Password is too weak. Add uppercase, numbers or symbols.';
  }
  if (!Validators.required(fields.confirmPassword)) {
    errors.confirmPassword = 'Please confirm your password.';
  } else if (fields.password !== fields.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  if (!fields.agreed) {
    errors.agreed = 'You must accept the Terms & Privacy Policy.';
  }
  return errors;
}

// ─── FIELD MESSAGE COMPONENT ─────────────────────────────────
function FieldMsg({ error, success }) {
  if (error) return (
    <div className="field-message error" role="alert">
      <Icon.AlertCircle />
      <span>{error}</span>
    </div>
  );
  if (success) return (
    <div className="field-message success">
      <Icon.CheckCircle />
      <span>{success}</span>
    </div>
  );
  return <div className="field-message" />;
}

// ─── PASSWORD STRENGTH BAR ────────────────────────────────────
function PasswordStrengthBar({ password }) {
  const score = Validators.passwordStrength(password);
  const { label, cls } = getPasswordStrengthLabel(password ? score : 0);
  const segClasses = ['', '', '', ''].map((_, i) => {
    if (!password || score === 0) return 'strength-seg';
    if (i < score) return `strength-seg active-${cls}`;
    return 'strength-seg';
  });
  if (!password) return null;
  return (
    <div className="strength-bar-wrapper">
      <div className="strength-label">
        <span>Password strength</span>
        <span className={cls}>{label}</span>
      </div>
      <div className="strength-bars" role="progressbar" aria-label={`Password strength: ${label}`}>
        {segClasses.map((c, i) => <div key={i} className={c} />)}
      </div>
    </div>
  );
}

// ─── TOAST NOTIFICATION ──────────────────────────────────────
function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      <Icon.CheckToast />
      <span>{message}</span>
    </div>
  );
}

// ─── SOCIAL BUTTONS ──────────────────────────────────────────
function SocialButtons({ action }) {
  return (
    <>
      <div className="divider">
        <div className="divider-line" />
        <span className="divider-text">or continue with</span>
        <div className="divider-line" />
      </div>
      <div className="social-buttons">
        <button
          id={`btn-google-${action}`}
          type="button"
          className="btn-social"
          onClick={() => alert('Google OAuth would be configured here.')}
          aria-label="Sign in with Google"
        >
          <Icon.Google />
          Google
        </button>
        <button
          id={`btn-github-${action}`}
          type="button"
          className="btn-social"
          onClick={() => alert('GitHub OAuth would be configured here.')}
          aria-label="Sign in with GitHub"
        >
          <Icon.GitHub />
          GitHub
        </button>
      </div>
    </>
  );
}

// ─── LOGIN FORM ───────────────────────────────────────────────
function LoginForm({ onSwitch }) {
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
      // Live-validate touched field
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
    // Simulate API call
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
        {/* Email */}
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

        {/* Password */}
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

        {/* Forgot password */}
        <div className="form-meta">
          <button type="button" className="link-btn" id="btn-forgot-password" onClick={() => alert('Password reset flow would open here.')}>
            Forgot password?
          </button>
        </div>

        {/* Submit */}
        <button
          id="btn-login-submit"
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
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

// ─── SIGN UP FORM ─────────────────────────────────────────────
function SignUpForm({ onSwitch }) {
  const [fields, setFields] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', password: '', confirmPassword: '',
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
    const allTouched = { firstName: true, lastName: true, email: true, phone: true, password: true, confirmPassword: true };
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
        {/* Name row */}
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

        {/* Email */}
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

        {/* Phone (optional) */}
        <div className="form-group">
          <label className="form-label" htmlFor="signup-phone">Phone number <span style={{color:'var(--text-muted)',fontSize:'11px'}}>(optional)</span></label>
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

        {/* Password */}
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

        {/* Confirm Password */}
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

        {/* Terms checkbox */}
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
          <label className="checkbox-label" onClick={handleAgreeToggle} htmlFor="checkbox-terms">
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

        {/* Submit */}
        <button
          id="btn-signup-submit"
          type="submit"
          className="btn-submit"
          disabled={loading}
        >
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

// ─── ROOT APP COMPONENT ───────────────────────────────────────
function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  const switchToSignup = () => setActiveTab('signup');
  const switchToLogin  = () => setActiveTab('login');

  return (
    <div className="page-wrapper">
      {/* Animated background */}
      <div className="bg-layer" aria-hidden="true" />
      <div className="bg-grid" aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <main className="auth-container" role="main">
        <div className="auth-card">
          {/* Logo */}
          <div className="auth-logo">
            <div className="logo-icon" aria-hidden="true">
              <Icon.Sparkle />
            </div>
            <span className="logo-text">AuthFlow</span>
          </div>

          {/* Tab Switcher */}
          <div className="tab-switcher" role="tablist" aria-label="Authentication mode">
            <button
              id="tab-login"
              role="tab"
              aria-selected={activeTab === 'login'}
              className={`tab-btn ${activeTab === 'login' ? 'active' : ''}`}
              onClick={switchToLogin}
            >
              Sign In
            </button>
            <button
              id="tab-signup"
              role="tab"
              aria-selected={activeTab === 'signup'}
              className={`tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
              onClick={switchToSignup}
            >
              Sign Up
            </button>
          </div>

          {/* Active Form */}
          {activeTab === 'login'
            ? <LoginForm key="login" onSwitch={switchToSignup} />
            : <SignUpForm key="signup" onSwitch={switchToLogin} />
          }
        </div>
      </main>
    </div>
  );
}

// ─── MOUNT ───────────────────────────────────────────────────
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
