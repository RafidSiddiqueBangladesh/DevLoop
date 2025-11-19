# Integrations

## YouTube Data API

- Endpoint: `GET /api/youtube/search?q=<query>&maxResults=<1-25>`
- Configure your API key in `foodwaste/.env`:

```
YOUTUBE_API_KEY="YOUR_KEY_HERE"
```

- The client `Resources` page displays a YouTube videos grid based on the search input and filters.
- The API key is server-side only; do not expose it with client-side `VITE_` env vars.

## Notes

- Builder.io references and configs have been removed from the repository and environment.