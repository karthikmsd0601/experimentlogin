// ============================================================
//  src/components/FieldMsg.jsx
//  Inline validation message shown below form inputs
// ============================================================
import { Icon } from './Icons.jsx';

export default function FieldMsg({ error, success }) {
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
