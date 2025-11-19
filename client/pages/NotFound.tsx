import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { ArrowRight } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 flex items-center justify-center py-12">
        <div className="text-center space-y-6 max-w-md px-4">
          <div className="text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-bold">Page Not Found</h1>
            <p className="text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            Back to Home
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
