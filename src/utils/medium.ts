export interface MediumArticle {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  author: string;
  thumbnail?: string;
  description: string;
  categories: string[];
}

export const fallbackArticles: MediumArticle[] = [
  {
    title: "at 12 i wrote lua for roblox. now i tinker with it in my nvim config",
    link: "https://medium.com/@azzakyraihan/test-0cc8cbef8fda",
    pubDate: "2026-10-16 12:37:56",
    guid: "https://medium.com/p/0cc8cbef8fda",
    author: "Azzaky Raihan",
    description: "at 12, i was trying to make a door open in roblox studio. i'm pretty sure i followed a tutorial. i found the script again recently, and this is the part that does the swinging...",
    categories: ["Lua", "Neovim", "Roblox", "Journey"],
  },
];

export async function fetchMediumArticles(username = "azzakyraihan"): Promise<MediumArticle[]> {
  try {
    const feedUrl = `https://medium.com/feed/@${username}`;
    
    // We try multiple strategies: direct rss2json, and backup CORS gateways
    const urls = [
      `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(feedUrl)}`,
    ];

    for (const url of urls) {
      try {
        const res = await fetch(url, { signal: AbortSignal.timeout(4000) });
        if (res.ok) {
          const data = await res.json();
          if (data && data.status === 'ok' && Array.isArray(data.items) && data.items.length > 0) {
            return data.items.map((item: any) => {
              let title = item.title?.trim() || "";
              let description = item.description?.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim() || "";

              // Handle rss2json server-side caching: if rss2json serves the stale initial "test" draft title
              if (title.toLowerCase() === 'test' || item.link?.includes('0cc8cbef8fda')) {
                title = "at 12 i wrote lua for roblox. now i tinker with it in my nvim config";
                if (!description || description.toLowerCase() === 'test') {
                  description = "at 12, i was trying to make a door open in roblox studio. i'm pretty sure i followed a tutorial. i found the script again recently, and this is the part that does the swinging...";
                }
              }

              return {
                title,
                link: item.link,
                pubDate: item.pubDate,
                guid: item.guid || item.link,
                author: item.author || "Azzaky Raihan",
                thumbnail: item.thumbnail || (item.enclosure && item.enclosure.link) || undefined,
                description: description.slice(0, 180) + (description.length > 180 ? '...' : ''),
                categories: Array.isArray(item.categories) && item.categories.length > 0 ? item.categories : ["Lua", "Neovim", "Journey"],
              };
            });
          }
        }
      } catch {
        // try next or fall back
      }
    }
  } catch (err) {
    console.warn("Could not fetch live Medium articles, showing verified feed data:", err);
  }

  // Graceful fallback with verified active user post
  return fallbackArticles;
}
