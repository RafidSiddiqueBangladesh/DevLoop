import { Link } from "react-router-dom";
import { Facebook, Twitter, Youtube, Mail, Phone, Github } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background/95">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-xl">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-brand-orange-DEFAULT">
                <span className="text-white">🌱</span>
              </div>
              <span className="text-foreground">FoodSense</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Smart Food & Agriculture Management Platform. Reduce waste, save money,
              and eat better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-primary" to="/">Home</Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="/inventory">Inventory</Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="/resources">Resources</Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link className="hover:text-primary" to="/profile">Profile</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> contact@foodsense.local
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +880 1234-567890
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex items-center gap-3">
              <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
              <a className="p-2 rounded-lg hover:bg-accent" href="#" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto max-w-6xl px-4 py-6 text-xs text-muted-foreground flex items-center justify-between">
          <span>
            © {new Date().getFullYear()} FoodSense. All rights reserved.
          </span>
          <div className="flex items-center gap-4">
            <Link className="hover:text-primary" to="#">Privacy</Link>
            <Link className="hover:text-primary" to="#">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;