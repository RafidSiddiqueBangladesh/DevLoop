import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { useTranslation } from '@/lib/useTranslation';
import { Leaf } from 'lucide-react';

export default function Login() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      // TODO: Implement actual login API call
      console.log('Logging in:', formData);
      alert('Login successful!');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <div className="rounded-2xl bg-card border border-border p-8 space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-brand-orange-DEFAULT">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold">FoodSense</h1>
            </div>

            <div className="space-y-2 text-center">
              <h2 className="text-2xl font-bold">{t('auth.loginTitle')}</h2>
              <p className="text-muted-foreground">{t('auth.loginSubtitle')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.email')}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.email ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">{t('auth.password')}</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.password ? 'border-destructive' : 'border-border'
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && <p className="text-destructive text-sm mt-1">{errors.password}</p>}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                    className="w-4 h-4 rounded border border-border cursor-pointer"
                  />
                  <span className="text-sm">{t('auth.rememberMe')}</span>
                </label>
                <a href="#" className="text-sm text-primary hover:underline">{t('auth.forgotPassword')}</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('common.loading') : t('auth.submit')}
              </button>
            </form>

            <div className="text-center">
              <p className="text-muted-foreground">
                {t('auth.noAccount')}{' '}
                <Link to="/register" className="text-primary font-semibold hover:underline">
                  {t('auth.signUp')}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
