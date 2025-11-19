import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { useTranslation } from '@/lib/useTranslation';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-brand-orange-DEFAULT">
            <span className="text-white">🌱</span>
          </div>
          <span className="hidden sm:inline text-foreground">FoodSense</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            {t('common.home')}
          </Link>
          <Link to="/inventory" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.inventory')}
          </Link>
          <Link to="/resources" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.resources')}
          </Link>
          <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.dashboard')}
          </Link>
          <Link to="/profile" className="text-sm font-medium hover:text-primary transition-colors">
            {t('nav.profile')}
          </Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="flex items-center gap-1 px-3 py-2 text-sm rounded-lg hover:bg-accent transition-colors"
            title={language === 'en' ? 'বাংলা' : 'English'}
          >
            <span className="text-lg">{language === 'en' ? '🇧🇩' : '🇬🇧'}</span>
            <span className="hidden sm:inline">{language === 'en' ? 'বাংলা' : 'EN'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-accent transition-colors"
            title={t('common.theme')}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <nav className="md:hidden border-t border-border bg-background/95">
          <div className="container mx-auto px-4 py-4 space-y-2 flex flex-col">
            <Link
              to="/"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('common.home')}
            </Link>
            <Link
              to="/inventory"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.inventory')}
            </Link>
            <Link
              to="/resources"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.resources')}
            </Link>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.dashboard')}
            </Link>
            <Link
              to="/profile"
              className="px-4 py-2 text-sm font-medium hover:bg-accent rounded transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('nav.profile')}
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
};
