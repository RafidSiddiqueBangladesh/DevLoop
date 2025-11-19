import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";
import { Leaf } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    householdSize: "2",
    dietaryPreferences: "",
    location: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.householdSize) {
      newErrors.householdSize = "Household size is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        householdSize: formData.householdSize,
        dietaryPreferences: formData.dietaryPreferences,
        location: formData.location,
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);
      setErrors({ password: (error as Error).message || "Registration failed" });
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
              <h2 className="text-2xl font-bold">{t("auth.registerTitle")}</h2>
              <p className="text-muted-foreground">
                {t("auth.registerSubtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.fullName")}
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.fullName ? "border-destructive" : "border-border"
                  }`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.email")}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.email ? "border-destructive" : "border-border"
                  }`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.password")}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.password}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.confirmPassword")}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className={`w-full px-4 py-2 rounded-lg border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 ${
                    errors.confirmPassword
                      ? "border-destructive"
                      : "border-border"
                  }`}
                  placeholder="••••••••"
                />
                {errors.confirmPassword && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.householdSize")}
                </label>
                <select
                  value={formData.householdSize}
                  onChange={(e) =>
                    setFormData({ ...formData, householdSize: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "person" : "people"}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.dietaryPreferences")}
                </label>
                <input
                  type="text"
                  value={formData.dietaryPreferences}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dietaryPreferences: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Vegetarian, Halal, No restrictions"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.location")}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="e.g., Dhaka, Chittagong"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
              className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90"
              >
                {isLoading ? t("common.loading") : t("auth.submitRegister")}
              </button>
            </form>

            <div className="text-center">
              <p className="text-muted-foreground">
                {t("auth.haveAccount")}{" "}
                <Link
                  to="/login"
                  className="text-primary font-semibold hover:underline"
                >
                  {t("auth.signIn")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
