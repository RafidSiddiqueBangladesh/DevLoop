import type { RequestHandler } from "express";

const API_ENDPOINT = "https://www.googleapis.com/youtube/v3/search";

export const handleYouTubeSearch: RequestHandler = async (req, res) => {
  try {
    const apiKey = process.env.YOUTUBE_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "YouTube API key not configured" });
    }

    const q = (req.query.q as string) || "sustainable food management";
    const maxResults = parseInt((req.query.maxResults as string) || "8", 10);

    const params = new URLSearchParams({
      part: "snippet",
      q,
      maxResults: String(Math.min(Math.max(maxResults, 1), 25)),
      key: apiKey,
      type: "video",
      safeSearch: "moderate",
    });

    const resp = await fetch(`${API_ENDPOINT}?${params.toString()}`);
    if (!resp.ok) {
      const text = await resp.text();
      return res.status(resp.status).json({ error: text || "YouTube API error" });
    }

    const data = await resp.json();
    const videos = (data.items || []).map((item: any) => ({
      id: item.id?.videoId,
      title: item.snippet?.title,
      description: item.snippet?.description,
      channelTitle: item.snippet?.channelTitle,
      publishedAt: item.snippet?.publishedAt,
      thumbnails: item.snippet?.thumbnails,
    }));

    res.json({ total: videos.length, videos });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: "Failed to search YouTube videos" });
  }
};