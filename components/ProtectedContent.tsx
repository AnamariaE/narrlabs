import React, { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { Button } from './ui/button';
import { useI18n } from '../lib/i18n-context';

interface ProtectedContentProps {
  children: React.ReactNode;
  password: string;
  id: string; // Identificador único para esta sección protegida
  title?: string;
  description?: string;
  placeholder?: string;
}

export function ProtectedContent({
  children,
  password,
  id,
  title,
  description,
  placeholder,
}: ProtectedContentProps) {
  const { language } = useI18n();
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);

  const storageKey = `protected_${id}`;

  // Check if already unlocked from localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem(storageKey);
    if (unlocked === 'true') {
      setIsUnlocked(true);
    }
  }, [storageKey]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsUnlocked(true);
      setError(false);
      localStorage.setItem(storageKey, 'true');
      setInputPassword('');
    } else {
      setError(true);
      // Shake animation will be handled by CSS
      setTimeout(() => setError(false), 500);
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    localStorage.removeItem(storageKey);
    setInputPassword('');
  };

  // If unlocked, show content
  if (isUnlocked) {
    return (
      <div className="relative group">
        {children}
        {/* Floating lock button to re-lock */}
        <button
          onClick={handleLock}
          className="absolute top-4 right-4 p-2 rounded-full bg-muted/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
          title={language === 'es' ? 'Volver a bloquear' : 'Lock again'}
          aria-label={language === 'es' ? 'Volver a bloquear' : 'Lock again'}
        >
          <Lock className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    );
  }

  // If locked, show password form
  return (
    <div className="relative w-full">
      <div className="absolute inset-0 backdrop-blur-md bg-background/50 rounded-lg z-10 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-card border rounded-2xl p-8 shadow-2xl">
          {/* Lock Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-semibold text-center mb-2">
            {title || (language === 'es' ? 'Contenido Protegido' : 'Protected Content')}
          </h3>
          <p className="text-sm text-muted-foreground text-center mb-6">
            {description || 
              (language === 'es' 
                ? 'Ingresa la contraseña para ver este contenido' 
                : 'Enter the password to view this content'
              )
            }
          </p>

          {/* Password Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={inputPassword}
                onChange={(e) => setInputPassword(e.target.value)}
                placeholder={placeholder || (language === 'es' ? 'Contraseña' : 'Password')}
                className={`w-full px-4 py-3 pr-12 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
                  error ? 'border-red-500 animate-shake' : 'border-border'
                }`}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {error && (
              <p className="text-sm text-red-500 text-center animate-fadeIn">
                {language === 'es' ? 'Contraseña incorrecta' : 'Incorrect password'}
              </p>
            )}

            <Button type="submit" className="w-full" size="lg">
              {language === 'es' ? 'Desbloquear' : 'Unlock'}
            </Button>
          </form>

          {/* Helper text */}
          <p className="text-xs text-muted-foreground text-center mt-4">
            {language === 'es' 
              ? 'La contraseña se guardará en este dispositivo' 
              : 'Password will be saved on this device'
            }
          </p>
        </div>
      </div>

      {/* Blurred preview of content */}
      <div className="pointer-events-none select-none blur-lg opacity-40">
        {children}
      </div>

      {/* CSS animations */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
