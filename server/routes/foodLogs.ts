import { RequestHandler } from "express";
import { readCollection, writeCollection } from "../storage/db";

interface FoodLog {
  id: string;
  userId: string;
  itemName: string;
  category: string;
  quantity: number;
  unit?: string;
  date: string; // ISO date
  cost?: number; // BDT
}

export const handleLogFood: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });

    const { itemName, category, quantity, unit, date, cost } = req.body || {};
    if (!itemName || !category || !quantity) {
      return res.status(400).json({ error: "itemName, category, quantity are required" });
    }
    const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
    const log: FoodLog = {
      id,
      userId,
      itemName,
      category,
      quantity: Number(quantity),
      unit,
      date: date || new Date().toISOString(),
      cost: cost != null ? Number(cost) : undefined,
    };
    const logs = readCollection<FoodLog[]>("logs");
    logs.push(log);
    writeCollection("logs", logs);
    res.status(201).json({ message: "Food consumption logged", log });
  } catch (error) {
    res.status(500).json({ error: "Failed to log food" });
  }
};

export const handleGetFoodLogs: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { startDate, endDate } = req.query;
    const s = startDate ? new Date(startDate as string) : null;
    const e = endDate ? new Date(endDate as string) : null;
    const all = readCollection<FoodLog[]>("logs");
    const logs = all.filter((l) => {
      if (l.userId !== userId) return false;
      const d = new Date(l.date);
      if (s && d < s) return false;
      if (e && d > e) return false;
      return true;
    });
    res.json({ logs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food logs" });
  }
};

export const handleGetAnalytics: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { period } = req.query; // week, month, year
    const all = readCollection<FoodLog[]>("logs");
    const userLogs = all.filter((l) => l.userId === userId);
    const totalConsumed = userLogs.reduce((sum, l) => sum + (Number(l.quantity) || 0), 0);
    const byCategory: Record<string, number> = {};
    let weeklySpending = 0;
    for (const l of userLogs) {
      byCategory[l.category] = (byCategory[l.category] || 0) + (Number(l.quantity) || 0);
      weeklySpending += l.cost || 0;
    }
    res.json({
      period,
      analytics: {
        totalConsumed,
        byCategory,
        weeklySpending,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
