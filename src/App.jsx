// ============================================================
//  src/App.jsx
//  Root component – tab switcher + background layers
// ============================================================
import { useState } from 'react';
import { Icon } from './components/Icons.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignUpPage from './pages/SignUpPage.jsx';

export default function App() {
  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'signup'

  const switchToSignup = () => setActiveTab('signup');
  const switchToLogin  = () => setActiveTab('login');

  return (
    <div className="page-wrapper">
      {/* ── Animated Background ── */}
      <div className="bg-layer"  aria-hidden="true" />
      <div className="bg-grid"   aria-hidden="true" />
      <div className="orb orb-1" aria-hidden="true" />
      <div className="orb orb-2" aria-hidden="true" />
      <div className="orb orb-3" aria-hidden="true" />

      <main className="auth-container" role="main">
        <div className="auth-card">

          {/* ── Logo ── */}
          <div className="auth-logo">
            <div className="logo-icon" aria-hidden="true">
              <Icon.Sparkle />
            </div>
            <span className="logo-text">AuthFlow</span>
          </div>

          {/* ── Tab Switcher ── */}
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

          {/* ── Active Page ── */}
          {activeTab === 'login'
            ? <LoginPage  key="login"  onSwitch={switchToSignup} />
            : <SignUpPage key="signup" onSwitch={switchToLogin}  />
          }

        </div>
      </main>
    </div>
  );
}
