import "dotenv/config";
import express from "express";
import cors from "cors";
import { handleDemo } from "./routes/demo";
import { handleRegister, handleLogin, handleGetProfile, handleUpdateProfile, handleLogout } from "./routes/auth";
import { handleGetInventory, handleAddInventoryItem, handleUpdateInventoryItem, handleDeleteInventoryItem, handleGetExpiringItems } from "./routes/inventory";
import { handleLogFood, handleGetFoodLogs, handleGetAnalytics } from "./routes/foodLogs";
import { handleGetResources, handleGetResource, handleSearchResources } from "./routes/resources";
import { handleGetFoodItems, handleGetFoodItem } from "./routes/food-items";
import { authMiddleware } from "./middleware/auth";

export function createServer() {
  const app = express();

  // Middleware
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // ============================================
  // Public Routes
  // ============================================

  // Health check
  app.get("/api/ping", (_req, res) => {
    const ping = process.env.PING_MESSAGE ?? "pong";
    res.json({ message: ping });
  });

  // Demo route
  app.get("/api/demo", handleDemo);

  // ============================================
  // Authentication Routes (Public)
  // ============================================
  app.post("/api/auth/register", handleRegister);
  app.post("/api/auth/login", handleLogin);
  app.post("/api/auth/logout", handleLogout);

  // ============================================
  // Protected Routes (Require Authentication)
  // ============================================

  // User Profile
  app.get("/api/auth/profile", authMiddleware, handleGetProfile);
  app.put("/api/auth/profile", authMiddleware, handleUpdateProfile);

  // ============================================
  // Inventory Routes
  // ============================================
  app.get("/api/inventory", authMiddleware, handleGetInventory);
  app.post("/api/inventory", authMiddleware, handleAddInventoryItem);
  app.put("/api/inventory/:id", authMiddleware, handleUpdateInventoryItem);
  app.delete("/api/inventory/:id", authMiddleware, handleDeleteInventoryItem);
  app.get("/api/inventory/expiring", authMiddleware, handleGetExpiringItems);

  // ============================================
  // Food Logs Routes
  // ============================================
  app.post("/api/logs", authMiddleware, handleLogFood);
  app.get("/api/logs", authMiddleware, handleGetFoodLogs);
  app.get("/api/logs/analytics", authMiddleware, handleGetAnalytics);

  // ============================================
  // Food Items Routes (Public - for reference)
  // ============================================
  app.get("/api/food-items", handleGetFoodItems);
  app.get("/api/food-items/:id", handleGetFoodItem);

  // ============================================
  // Resources Routes (Public)
  // ============================================
  app.get("/api/resources", handleGetResources);
  app.get("/api/resources/:id", handleGetResource);
  app.get("/api/resources/search", handleSearchResources);

  // ============================================
  // Image Upload Routes (Prepared for Future)
  // ============================================
  // TODO: Implement image upload endpoints
  // POST /api/upload/receipt
  // POST /api/upload/food-photo
  // GET /api/uploads/:id
  // DELETE /api/uploads/:id

  // ============================================
  // Dashboard Routes
  // ============================================
  // TODO: Implement dashboard endpoints
  // GET /api/dashboard/summary
  // GET /api/dashboard/stats
  // GET /api/dashboard/recommendations

  // ============================================
  // IoT Routes (Prepared for Future)
  // ============================================
  // TODO: Implement IoT integration endpoints
  // POST /api/iot/devices
  // GET /api/iot/devices
  // POST /api/iot/inventory/update

  // Error handling middleware
  app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error(err);
    res.status(err.status || 500).json({
      error: err.message || "Internal server error",
    });
  });

  return app;
}
