// ============================================================
//  src/components/Toast.jsx
//  Success / info toast notification component
// ============================================================
import { Icon } from './Icons.jsx';

export default function Toast({ message, show }) {
  return (
    <div className={`toast ${show ? 'show' : ''}`} role="status" aria-live="polite">
      <Icon.CheckToast />
      <span>{message}</span>
    </div>
  );
}
