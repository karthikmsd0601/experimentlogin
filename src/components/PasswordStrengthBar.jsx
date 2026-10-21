// ============================================================
//  src/components/PasswordStrengthBar.jsx
//  Visual 4-segment password strength indicator
// ============================================================
import { Validators, getPasswordStrengthLabel } from '../utils/validators.js';

export default function PasswordStrengthBar({ password }) {
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
      <div
        className="strength-bars"
        role="progressbar"
        aria-label={`Password strength: ${label}`}
        aria-valuenow={score}
        aria-valuemin={0}
        aria-valuemax={4}
      >
        {segClasses.map((c, i) => <div key={i} className={c} />)}
      </div>
    </div>
  );
}
