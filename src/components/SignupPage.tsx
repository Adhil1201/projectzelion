import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SignupPageProps {
  onBack: () => void;
  onSwitchToLogin: () => void;
}

function SignupPage({ onBack, onSwitchToLogin }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const { signup, loginWithGoogle, isLoading } = useAuth();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }
      
      const success = await signup(formData.name, formData.email, formData.password);
      if (!success) {
        setError('Failed to create account');
      } else {
        onBack(); // Go back to main page after successful signup
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    try {
      const success = await loginWithGoogle();
      if (success) {
        onBack(); // Go back to main page after successful login
      } else {
        setError('Google signup failed. Please try again.');
      }
    } catch (err) {
      setError('Google signup failed. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-page-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="auth-page-content"
        >
          {/* Header */}
          <div className="auth-page-header">
            <button className="back-btn" onClick={onBack}>
              <ArrowLeft size={24} />
            </button>
            <div className="auth-page-logo">
              <img src="/images/favicon-32x32.png" alt="Zelion Logo" className="auth-logo" />
              <span className="auth-logo-text">ZELION</span>
            </div>
          </div>

          {/* Signup Form */}
          <div className="auth-form-container">
            <div className="auth-form-header">
              <h1 className="auth-page-title">Create Account</h1>
              <p className="auth-page-subtitle">Join Zelion and start your cricket journey</p>
            </div>

            {/* Google Signup Button */}
            <button
              type="button"
              className="google-login-btn"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" className="google-icon">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isLoading ? 'Creating account...' : 'Continue with Google'}
            </button>

            <div className="auth-divider">
              <span>or</span>
            </div>

            {/* Email/Password Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Full Name</label>
                <div className="input-container">
                  <User size={20} />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <div className="input-container">
                  <Mail size={20} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="input-container">
                  <Lock size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="auth-error">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="auth-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="spinner"></div>
                ) : (
                  'Create Account'
                )}
              </button>
            </form>

            <div className="auth-footer">
              <p>
                Already have an account?
                <button className="auth-switch-btn" onClick={onSwitchToLogin}>
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default SignupPage;