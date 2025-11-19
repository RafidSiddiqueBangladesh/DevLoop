import { Link } from 'react-router-dom';
import { useTranslation } from '@/lib/useTranslation';
import { Header } from '@/components/Header';
import { ArrowRight, Leaf, Zap, TrendingDown, Users, Cpu, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function Landing() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');

  const features = [
    { icon: Cpu, title: t('landing.features.0.title'), desc: t('landing.features.0.description') },
    { icon: Zap, title: t('landing.features.1.title'), desc: t('landing.features.1.description') },
    { icon: TrendingDown, title: t('landing.features.2.title'), desc: t('landing.features.2.description') },
    { icon: Users, title: t('landing.features.3.title'), desc: t('landing.features.3.description') },
    { icon: AlertCircle, title: t('landing.features.4.title'), desc: t('landing.features.4.description') },
    { icon: Leaf, title: t('landing.features.5.title'), desc: t('landing.features.5.description') },
  ];

  const steps = [
    { number: t('landing.steps.0.number'), title: t('landing.steps.0.title'), desc: t('landing.steps.0.description') },
    { number: t('landing.steps.1.number'), title: t('landing.steps.1.title'), desc: t('landing.steps.1.description') },
    { number: t('landing.steps.2.number'), title: t('landing.steps.2.title'), desc: t('landing.steps.2.description') },
  ];

  const stats = [
    { number: t('landing.stats.0.number'), label: t('landing.stats.0.label') },
    { number: t('landing.stats.1.number'), label: t('landing.stats.1.label') },
    { number: t('landing.stats.2.number'), label: t('landing.stats.2.label') },
  ];

  const testimonials = [
    { quote: t('landing.testimonials.0.quote'), author: t('landing.testimonials.0.author'), role: t('landing.testimonials.0.role') },
    { quote: t('landing.testimonials.1.quote'), author: t('landing.testimonials.1.author'), role: t('landing.testimonials.1.role') },
    { quote: t('landing.testimonials.2.quote'), author: t('landing.testimonials.2.author'), role: t('landing.testimonials.2.role') },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative container mx-auto px-4 py-20 md:py-32 max-w-6xl">
          <div className="text-center space-y-8">
            <div className="inline-block px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-sm font-medium text-primary">{t('landing.tagline')}</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-primary via-brand-green-light to-primary bg-clip-text text-transparent">
                {t('landing.headline')}
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t('landing.subheadline')}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                to="/register"
                className="px-8 py-4 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                {t('landing.ctaPrimary')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/5 transition-colors">
                {t('landing.ctaSecondary')}
              </button>
            </div>

            {/* Hero Image/Illustration */}
            <div className="mt-12 relative h-96 md:h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 border border-border flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="flex gap-8 justify-center items-end">
                  <div className="h-24 w-16 bg-gradient-to-t from-primary/30 to-primary/10 rounded-t-lg" />
                  <div className="h-32 w-16 bg-gradient-to-t from-primary/40 to-primary/15 rounded-t-lg" />
                  <div className="h-20 w-16 bg-gradient-to-t from-primary/25 to-primary/5 rounded-t-lg" />
                </div>
                <p className="text-sm text-muted-foreground">Smart Food Management Analytics</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{t('landing.featuresTitle')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing.featuresSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="group p-8 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6 group-hover:from-primary/30 group-hover:to-secondary/30 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 md:py-32 bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{t('landing.howItWorksTitle')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing.howItWorksSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Connecting line */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-[calc(50%+3rem)] right-[-3rem] h-1 bg-gradient-to-r from-primary to-transparent" />
                )}
                
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-brand-green-light flex items-center justify-center text-white font-bold text-2xl">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{t('landing.impactTitle')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing.impactSubtitle')}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center p-8 rounded-xl border border-border hover:border-primary/50 transition-colors">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <p className="text-muted-foreground font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-card/50 border-t border-border">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold">{t('landing.testimonialsTitle')}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">★</span>
                  ))}
                </div>
                <p className="text-foreground italic mb-6">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-32 border-t border-border">
        <div className="container mx-auto px-4 max-w-2xl space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">{t('landing.footerTitle')}</h2>
            <p className="text-lg text-muted-foreground">{t('landing.footerSubtitle')}</p>
          </div>

          <div className="flex gap-3">
            <input
              type="email"
              placeholder={t('landing.emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg bg-input border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <button className="px-6 py-3 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all hover:scale-105">
              {t('landing.subscribe')}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 py-12">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">FoodSense</h3>
              <p className="text-sm text-muted-foreground">Smart food management for sustainable living</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/inventory" className="hover:text-primary transition-colors">{t('nav.inventory')}</Link></li>
                <li><Link to="/resources" className="hover:text-primary transition-colors">{t('nav.resources')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>{t('landing.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
