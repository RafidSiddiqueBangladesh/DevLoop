import { Header } from "@/components/Header";
import { useTranslation } from "@/lib/useTranslation";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { AlertCircle, ShoppingCart, TrendingUp, Package } from "lucide-react";

export default function Dashboard() {
  const { t } = useTranslation();

  // Sample data
  const consumptionData = [
    { name: "Mon", vegetables: 2, fruits: 1.5, dairy: 1 },
    { name: "Tue", vegetables: 2.5, fruits: 1, dairy: 1.2 },
    { name: "Wed", vegetables: 2, fruits: 2, dairy: 0.8 },
    { name: "Thu", vegetables: 3, fruits: 1.5, dairy: 1.3 },
    { name: "Fri", vegetables: 2.5, fruits: 2, dairy: 1.1 },
    { name: "Sat", vegetables: 1.5, fruits: 1, dairy: 1.2 },
    { name: "Sun", vegetables: 2, fruits: 1.5, dairy: 0.9 },
  ];

  const budgetData = [
    { name: "Week 1", spent: 2500, budget: 3000 },
    { name: "Week 2", spent: 2800, budget: 3000 },
    { name: "Week 3", spent: 2400, budget: 3000 },
    { name: "Week 4", spent: 2600, budget: 3000 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-7xl">
        {/* Welcome Section */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-2">
            {t("dashboard.welcome")}, User 👋
          </h1>
          <p className="text-muted-foreground">{t("landing.subheadline")}</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t("dashboard.inventory")}
                </p>
                <p className="text-3xl font-bold text-card-foreground">12</p>
              </div>
              <Package className="w-12 h-12 text-primary/20" />
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t("dashboard.expiringItems")}
                </p>
                <p className="text-3xl font-bold text-card-foreground">2</p>
              </div>
              <AlertCircle className="w-12 h-12 text-destructive/20" />
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t("dashboard.weeklySpending")}
                </p>
                <p className="text-3xl font-bold text-card-foreground">2,600 ৳</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-secondary/20" />
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  {t("dashboard.budget")}
                </p>
                <p className="text-3xl font-bold text-card-foreground">3,000 ৳</p>
              </div>
              <TrendingUp className="w-12 h-12 text-primary/20" />
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-12">
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-6">
              Weekly Consumption Pattern
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  itemStyle={{ color: "hsl(var(--card-foreground))" }}
                />
                <Line
                  type="monotone"
                  dataKey="vegetables"
                  stroke="hsl(var(--primary))"
                />
                <Line
                  type="monotone"
                  dataKey="fruits"
                  stroke="hsl(var(--secondary))"
                />
                <Line type="monotone" dataKey="dairy" stroke="hsl(var(--foreground))" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-6">Budget Tracking</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={budgetData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <YAxis stroke="hsl(var(--muted-foreground))" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                <Tooltip
                  contentStyle={{
                    background: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--card-foreground))",
                  }}
                  labelStyle={{ color: "hsl(var(--card-foreground))" }}
                  itemStyle={{ color: "hsl(var(--card-foreground))" }}
                />
                <Bar
                  dataKey="budget"
                  fill="hsl(var(--primary))"
                  opacity={0.5}
                />
                <Bar dataKey="spent" fill="hsl(var(--secondary))" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Logs and Recommendations */}
        <div className="grid lg:grid-cols-2 gap-6">
          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-4">
              {t("dashboard.recentLogs")}
            </h2>
            <div className="space-y-3">
              {[
                { item: "Tomatoes", quantity: "1 kg", date: "Today" },
                { item: "Milk", quantity: "1 L", date: "Yesterday" },
                { item: "Potatoes", quantity: "2 kg", date: "2 days ago" },
                { item: "Onions", quantity: "500g", date: "3 days ago" },
                { item: "Rice", quantity: "5 kg", date: "1 week ago" },
              ].map((log, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium">{log.item}</p>
                    <p className="text-sm text-muted-foreground">
                      {log.quantity}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">{log.date}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl bg-card border border-border p-6">
            <h2 className="text-xl font-bold mb-4">
              {t("dashboard.recommendations")}
            </h2>
            <div className="space-y-3">
              {[
                { title: "Use expiring tomatoes", reason: "Expires in 2 days" },
                {
                  title: "Budget-friendly recipe idea",
                  reason: "Based on your items",
                },
                {
                  title: "Composting opportunity",
                  reason: "You have vegetable scraps",
                },
                {
                  title: "Seasonal vegetables available",
                  reason: "Fresh mango season",
                },
                {
                  title: "Storage tips for dairy",
                  reason: "Keep milk refrigerated",
                },
              ].map((rec, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
                >
                  <p className="font-medium text-sm">{rec.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {rec.reason}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
