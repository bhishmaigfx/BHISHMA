import React, { useState } from 'react';
import { auth } from '../firebase';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { Mail, Lock, LogIn, UserPlus, Eye, EyeOff, AlertCircle } from 'lucide-react';

interface AuthScreenProps {
  onSuccess: () => void;
}

export default function AuthScreen({ onSuccess }: AuthScreenProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        onSuccess();
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        onSuccess();
      }
    } catch (err: any) {
      console.error("Auth action failed: ", err);
      const errorCode = err?.code;
      
      if (isSignUp) {
        if (errorCode === 'auth/email-already-in-use') {
          setError("User already exists. Please sign in.");
        } else if (errorCode === 'auth/weak-password') {
          setError("Password should be at least 6 characters.");
        } else if (errorCode === 'auth/invalid-email') {
          setError("Invalid email format. Please check and try again.");
        } else {
          setError(err?.message || "An error occurred during signup.");
        }
      } else {
        // Any login error details
        setError("Email or password is incorrect.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    setError(null);
    setEmail('');
    setPassword('');
  };

  return (
    <div className="min-h-screen bg-brand-100 flex items-center justify-center p-4 py-16">
      <div className="w-full max-w-md bg-white rounded-2xl border border-brand-200 shadow-premium p-8 relative overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-accent-orange/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-violet-600/5 rounded-full blur-3xl pointer-events-none" />

        {/* Brand Logo & Heading */}
        <div className="text-center mb-8">
          <div className="inline-flex bg-accent-orange text-white w-12 h-12 rounded-xl items-center justify-center shadow-md mb-4">
            <span className="font-bold text-2xl font-display">B</span>
          </div>
          <h2 className="text-2xl font-black text-brand-950 tracking-tight">
            BHISHMA <span className="text-accent-orange font-black">GRAPHICS</span>
          </h2>
          <p className="text-xs font-mono tracking-widest text-brand-500 uppercase mt-1 font-bold">
            Premium ID Card Solutions
          </p>
          <h3 className="text-lg font-bold text-brand-800 mt-6">
            {isSignUp ? 'Create Corporate Account' : 'Sign In to Your Workspace'}
          </h3>
          <p className="text-xs text-brand-500 mt-1">
            {isSignUp ? 'Sign up to design, quote, and track credentials' : 'Access your customized ID card designs and inquiries'}
          </p>
        </div>

        {/* Error Callout */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-xl flex items-start space-x-2.5 animate-in fade-in slide-in-from-top-1 duration-200" id="auth-error-msg">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div className="text-xs font-semibold text-red-700 leading-relaxed">
              {error}
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5" id="auth-form">
          <div>
            <label className="block text-xs font-mono tracking-wider text-brand-700 uppercase font-bold mb-1.5" htmlFor="email">
              Corporate Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-10 pr-4 py-3 bg-brand-100/50 border border-brand-200 rounded-xl text-sm font-medium text-brand-950 placeholder-brand-400 focus:outline-none focus:border-accent-orange focus:bg-white transition-all duration-150"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono tracking-wider text-brand-700 uppercase font-bold mb-1.5" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-brand-400">
                <Lock className="h-4.5 w-4.5" />
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-11 py-3 bg-brand-100/50 border border-brand-200 rounded-xl text-sm font-medium text-brand-950 placeholder-brand-400 focus:outline-none focus:border-accent-orange focus:bg-white transition-all duration-150"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-brand-400 hover:text-brand-700 cursor-pointer focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-accent-orange hover:bg-accent-orange-hover disabled:bg-accent-orange/50 text-white font-bold py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-150 flex items-center justify-center space-x-2 cursor-pointer focus:outline-none"
            id="auth-submit-btn"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isSignUp ? <UserPlus className="h-4.5 w-4.5" /> : <LogIn className="h-4.5 w-4.5" />}
                <span>{isSignUp ? 'Sign Up' : 'Sign In'}</span>
              </>
            )}
          </button>
        </form>

        {/* Mode switcher */}
        <div className="mt-8 pt-6 border-t border-brand-200 text-center">
          <p className="text-xs text-brand-600 font-medium">
            {isSignUp ? 'Already have an account?' : 'Need an account for your organization?'}
          </p>
          <button
            onClick={toggleAuthMode}
            className="mt-1.5 text-xs font-bold text-accent-orange hover:text-accent-orange-hover focus:outline-none transition-colors cursor-pointer"
            id="auth-mode-toggle"
          >
            {isSignUp ? 'Sign in instead' : 'Create a new account'}
          </button>
        </div>
      </div>
    </div>
  );
}
