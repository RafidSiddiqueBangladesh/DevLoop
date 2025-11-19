import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";
import { useState } from "react";
import { Save, X } from "lucide-react";

export default function Profile() {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    householdSize: "4",
    dietaryPreferences: "Vegetarian",
    location: "Dhaka",
    monthlyBudget: "10000",
  });

  const handleSave = () => {
    // TODO: Implement API call to save profile
    console.log("Saving profile:", formData);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <div className="space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold">{t("nav.profile")}</h1>
              <p className="text-muted-foreground mt-2">
                Manage your account information
              </p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                isEditing
                  ? "bg-destructive text-white"
                  : "bg-primary text-white hover:shadow-lg"
              }`}
            >
              {isEditing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {/* Profile Form */}
          <div className="rounded-xl bg-card border border-border p-8">
            <div className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.fullName")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <p className="px-4 py-2 text-foreground">
                    {formData.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.email")}
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <p className="px-4 py-2 text-foreground">{formData.email}</p>
                )}
              </div>

              {/* Household Size */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.householdSize")}
                </label>
                {isEditing ? (
                  <select
                    value={formData.householdSize}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        householdSize: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "person" : "people"}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="px-4 py-2 text-foreground">
                    {formData.householdSize} people
                  </p>
                )}
              </div>

              {/* Dietary Preferences */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.dietaryPreferences")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.dietaryPreferences}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dietaryPreferences: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., Vegetarian, Halal"
                  />
                ) : (
                  <p className="px-4 py-2 text-foreground">
                    {formData.dietaryPreferences}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  {t("auth.location")}
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="e.g., Dhaka, Chittagong"
                  />
                ) : (
                  <p className="px-4 py-2 text-foreground">
                    {formData.location}
                  </p>
                )}
              </div>

              {/* Monthly Budget */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Monthly Budget (BDT)
                </label>
                {isEditing ? (
                  <input
                    type="number"
                    value={formData.monthlyBudget}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        monthlyBudget: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                ) : (
                  <p className="px-4 py-2 text-foreground">
                    ৳ {parseInt(formData.monthlyBudget).toLocaleString()}
                  </p>
                )}
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="flex gap-3 pt-4 border-t border-border">
                  <button
                    onClick={handleSave}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all"
                  >
                    <Save className="w-4 h-4" />
                    {t("common.save")}
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border border-border text-foreground font-semibold rounded-lg hover:bg-accent transition-colors"
                  >
                    <X className="w-4 h-4" />
                    {t("common.cancel")}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Additional Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Account Security */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Security</h2>
              <button className="w-full px-4 py-2 border border-border text-foreground rounded-lg hover:bg-accent transition-colors">
                Change Password
              </button>
            </div>

            {/* Notifications */}
            <div className="rounded-xl bg-card border border-border p-6">
              <h2 className="text-xl font-bold mb-4">Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">Email notifications</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-4 h-4" />
                  <span className="text-sm">Expiry alerts</span>
                </label>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-xl bg-destructive/5 border border-destructive/20 p-6">
            <h2 className="text-xl font-bold mb-2 text-destructive">
              Danger Zone
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Irreversible actions
            </p>
            <button className="px-6 py-2 bg-destructive text-white rounded-lg hover:shadow-lg transition-all">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
