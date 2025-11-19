import { RequestHandler } from "express";
import { foodItems } from "../../shared/foodItems";

/**
 * Get all food items
 * TODO: Implement with:
 * - Category filtering
 * - Search functionality
 * - Pagination
 */
export const handleGetFoodItems: RequestHandler = (req, res) => {
  try {
    const { category, search } = req.query;

    let filtered = [...foodItems];

    // Apply filters
    if (category) {
      filtered = filtered.filter((item) => item.category === category);
    }
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter(
        (item) =>
          item.nameEn.toLowerCase().includes(searchLower) ||
          item.nameBn.toLowerCase().includes(searchLower),
      );
    }

    res.json({
      total: filtered.length,
      items: filtered,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food items" });
  }
};

/**
 * Get single food item details
 * TODO: Implement with full details including storage tips
 */
export const handleGetFoodItem: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch from database
    const item = foodItems.find((f) => f.id === id);

    if (!item) {
      return res.status(404).json({ error: "Food item not found" });
    }

    res.json({ item });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch food item" });
  }
};
