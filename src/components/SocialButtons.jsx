// ============================================================
//  src/components/SocialButtons.jsx
//  Google & GitHub OAuth social login buttons + divider
// ============================================================
import { Icon } from './Icons.jsx';

export default function SocialButtons({ action }) {
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
          aria-label="Continue with Google"
        >
          <Icon.Google />
          Google
        </button>

        <button
          id={`btn-github-${action}`}
          type="button"
          className="btn-social"
          onClick={() => alert('GitHub OAuth would be configured here.')}
          aria-label="Continue with GitHub"
        >
          <Icon.GitHub />
          GitHub
        </button>
      </div>
    </>
  );
}
