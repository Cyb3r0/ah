import React, { useState } from 'react';
import { HosnLogo } from '../components/common/HosnLogo';
import { User, Lock, Eye, EyeOff, Check, ShieldCheck } from 'lucide-react';
import { ScreenId } from '../types';

interface LoginScreenProps {
  onLoginSuccess: (screen?: ScreenId) => void;
  onNavigate: (screen: ScreenId) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess, onNavigate }) => {
  const [username, setUsername] = useState('ahmed.almansoor');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('manager-dashboard');
    }, 600);
  };

  const handleNafathLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess('manager-dashboard');
    }, 800);
  };

  return (
    <div className="relative min-h-[640px] flex flex-col justify-between items-center px-6 py-6 bg-gradient-to-b from-[#072418] via-[#061c12] to-[#04100b] text-emerald-100 overflow-y-auto">
      {/* Background Subtle Geometric Circuit Web */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:20px_20px]" />

      {/* Brand Header with Central Smart Building Emblem */}
      <div className="w-full flex flex-col items-center mt-2 z-10">
        <HosnLogo
          size="hero"
          showText={true}
          showSubtitle={true}
          showOrbitalIcons={true}
        />
      </div>

      {/* Login Form Container */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4 my-auto z-10">
        {errorMsg && (
          <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-600/50 text-rose-200 text-xs text-center">
            {errorMsg}
          </div>
        )}

        {/* Username Field */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-400/70">
            <User className="w-5 h-5" />
          </div>
          <input
            id="login-username-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="اسم المستخدم"
            className="w-full py-3.5 pr-11 pl-4 rounded-xl bg-[#092218] border border-[#1d4634] text-emerald-50 placeholder:text-emerald-400/50 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 text-sm transition-all"
            required
          />
        </div>

        {/* Password Field */}
        <div className="relative">
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-emerald-400/70">
            <Lock className="w-5 h-5" />
          </div>
          <input
            id="login-password-input"
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full py-3.5 pr-11 pl-11 rounded-xl bg-[#092218] border border-[#1d4634] text-emerald-50 placeholder:text-emerald-400/50 focus:outline-none focus:border-amber-400/80 focus:ring-1 focus:ring-amber-400/50 text-sm transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-amber-400/80 hover:text-amber-300 transition-colors cursor-pointer"
          >
            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </button>
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between text-xs px-1">
          <label className="flex items-center gap-2 cursor-pointer select-none text-emerald-200/90">
            <div 
              onClick={() => setRememberMe(!rememberMe)}
              className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${
                rememberMe ? 'bg-amber-400 border-amber-400 text-[#061810]' : 'border-emerald-600 bg-[#092218]'
              }`}
            >
              {rememberMe && <Check className="w-3 h-3 stroke-[3]" />}
            </div>
            <span>تذكرني</span>
          </label>

          <button
            type="button"
            onClick={() => alert('يرجى التواصل مع مسؤول النظام لإعادة تعيين كلمة المرور')}
            className="text-amber-400/90 hover:text-amber-300 hover:underline transition-colors"
          >
            نسيت كلمة المرور؟
          </button>
        </div>

        {/* Primary Login Button */}
        <button
          id="login-submit-btn"
          type="submit"
          disabled={isLoading}
          className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#d4af37] via-[#c49a45] to-[#b88c32] hover:from-[#e5c06e] hover:to-[#c49a45] text-[#061810] font-black text-base shadow-[0_4px_16px_rgba(196,154,69,0.3)] active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-[#061810] border-t-transparent rounded-full animate-spin" />
          ) : (
            <span>تسجيل الدخول</span>
          )}
        </button>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#1a4231] w-full" />
          <span className="bg-[#072418] px-3 text-xs text-emerald-400/60 absolute font-medium">أو</span>
        </div>

        {/* Nafath SSO Button */}
        <button
          id="nafath-login-btn"
          type="button"
          onClick={handleNafathLogin}
          className="w-full py-3 px-4 rounded-xl bg-white hover:bg-emerald-50 text-[#072519] font-bold text-sm shadow-md active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
        >
          <div className="w-6 h-6 rounded-md bg-[#0b291d] flex items-center justify-center text-amber-400">
            <span className="font-bold text-xs">H</span>
          </div>
          <span>الدخول الموحد (نفاذ)</span>
        </button>
      </form>

      {/* Footer */}
      <div className="mt-4 text-center z-10">
        <p className="text-[11px] text-emerald-400/60 font-medium">
          جميع الحقوق محفوظة © 2024 وزارة البلديات والإسكان
        </p>
      </div>
    </div>
  );
};
