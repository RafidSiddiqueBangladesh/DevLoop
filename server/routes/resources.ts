import { RequestHandler } from "express";
import { resources } from "@shared/resources";

/**
 * Get all resources
 * TODO: Implement with:
 * - Filtering by category and type
 * - Search functionality
 * - Pagination
 */
export const handleGetResources: RequestHandler = (req, res) => {
  try {
    const { category, type, search } = req.query;

    let filtered = [...resources];

    // Apply filters
    if (category) {
      filtered = filtered.filter((r) => r.category === category);
    }
    if (type) {
      filtered = filtered.filter((r) => r.type === type);
    }
    if (search) {
      const searchLower = (search as string).toLowerCase();
      filtered = filtered.filter(
        (r) =>
          r.titleEn.toLowerCase().includes(searchLower) ||
          r.titleBn.toLowerCase().includes(searchLower) ||
          r.descriptionEn.toLowerCase().includes(searchLower) ||
          r.descriptionBn.toLowerCase().includes(searchLower),
      );
    }

    res.json({
      total: filtered.length,
      resources: filtered,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resources" });
  }
};

/**
 * Get single resource
 * TODO: Implement with full content retrieval
 */
export const handleGetResource: RequestHandler = (req, res) => {
  try {
    const { id } = req.params;

    // TODO: Fetch from database
    const resource = resources.find((r) => r.id === id);

    if (!resource) {
      return res.status(404).json({ error: "Resource not found" });
    }

    res.json({ resource });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch resource" });
  }
};

/**
 * Search resources
 * TODO: Implement with advanced search
 */
export const handleSearchResources: RequestHandler = (req, res) => {
  try {
    const { q } = req.query;

    // TODO: Implement full-text search

    res.json({
      query: q,
      results: resources.slice(0, 5),
    });
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
};
