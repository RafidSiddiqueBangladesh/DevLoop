import { RequestHandler } from "express";
import { readCollection, writeCollection } from "../storage/db";

interface InventoryItem {
  id: string;
  userId: string;
  name: string;
  category: string; // vegetables, dairy, grains, etc.
  quantity: number;
  unit?: string;
  expirationDate?: string; // ISO date
  purchaseDate?: string; // ISO date
  source?: string; // purchased/homegrown
}

function daysUntil(dateIso?: string) {
  if (!dateIso) return null;
  const now = new Date();
  const target = new Date(dateIso);
  const diffMs = target.getTime() - now.getTime();
  return Math.ceil(diffMs / (1000 * 60 * 60 * 24));
}

export const handleGetInventory: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const all = readCollection<InventoryItem[]>("inventory");
    const items = all.filter((i) => i.userId === userId);
    res.json({ items });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch inventory" });
  }
};

export const handleAddInventoryItem: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const {
      name,
      category,
      quantity,
      unit,
      expirationDate,
      purchaseDate,
      source,
    } = req.body || {};

    if (!name || !category) {
      return res.status(400).json({ error: "Name and category are required" });
    }
    const qtyNum = quantity != null ? Number(quantity) : 1;
    const id = (globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`).toString();
    const item: InventoryItem = {
      id,
      userId,
      name,
      category,
      quantity: isNaN(qtyNum) ? 1 : qtyNum,
      unit,
      expirationDate,
      purchaseDate,
      source,
    };
    const all = readCollection<InventoryItem[]>("inventory");
    all.push(item);
    writeCollection("inventory", all);
    res.status(201).json({ message: "Item added to inventory", item });
  } catch (error) {
    res.status(500).json({ error: "Failed to add item" });
  }
};

export const handleUpdateInventoryItem: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const all = readCollection<InventoryItem[]>("inventory");
    const idx = all.findIndex((i) => i.id === id && i.userId === userId);
    if (idx < 0) return res.status(404).json({ error: "Item not found" });
    const { name, category, quantity, unit, expirationDate, purchaseDate, source } = req.body || {};
    all[idx] = {
      ...all[idx],
      name: name ?? all[idx].name,
      category: category ?? all[idx].category,
      quantity: quantity != null ? Number(quantity) : all[idx].quantity,
      unit: unit ?? all[idx].unit,
      expirationDate: expirationDate ?? all[idx].expirationDate,
      purchaseDate: purchaseDate ?? all[idx].purchaseDate,
      source: source ?? all[idx].source,
    };
    writeCollection("inventory", all);
    res.json({ message: "Item updated successfully", item: all[idx] });
  } catch (error) {
    res.status(500).json({ error: "Failed to update item" });
  }
};

export const handleDeleteInventoryItem: RequestHandler = (req, res) => {
  try {
    // @ts-expect-error user attached by middleware
    const userId: string | undefined = req.user?.id;
    if (!userId) return res.status(401).json({ error: "Unauthorized" });
    const { id } = req.params;
    const all = readCollection<InventoryItem[]>("inventory");
    const exists = all.some((i) => i.id === id && i.userId === userId);
    const next = all.filter((i) => !(i.id === id && i.userId === userId));
    writeCollection("inventory", next);
    if (!exists) return res.status(404).json({ error: "Item not found" });
    res.json({ message: "Item deleted successfully", itemId: id });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete item" });
  }
};

export const handleGetExpiringItems: RequestHandler = (_req, res) => {
  try {
    const all = readCollection<InventoryItem[]>("inventory");
    const soon = all
      .map((i) => ({ ...i, daysUntilExpiry: daysUntil(i.expirationDate) }))
      .filter((i) => i.daysUntilExpiry != null && (i.daysUntilExpiry as number) <= 3);
    res.json({ items: soon });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch expiring items" });
  }
};
