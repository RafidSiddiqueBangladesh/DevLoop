import { Header } from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "@/lib/useTranslation";
import { useEffect, useMemo, useState } from "react";
import { Search, FileText, Video, PieChart, ArrowRight } from "lucide-react";

export default function Resources() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [ytLoading, setYtLoading] = useState(false);
  const [ytError, setYtError] = useState<string | null>(null);
  const [ytVideos, setYtVideos] = useState<Array<any>>([]);

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: "Mango Peel Composting Guide",
      description:
        "Learn how to compost mango peels and create nutrient-rich soil for your garden.",
      category: "composting",
      type: "article",
      image: "📚",
    },
    {
      id: 2,
      title: "Budget-Friendly Nutritious Recipes",
      description:
        "Delicious and affordable recipes using seasonal vegetables.",
      category: "budget-tips",
      type: "article",
      image: "🍳",
    },
    {
      id: 3,
      title: "Seasonal Vegetable Storage Techniques",
      description:
        "Expert tips on storing vegetables to extend their shelf life.",
      category: "storage",
      type: "video",
      image: "📹",
    },
    {
      id: 4,
      title: "Food Waste Reduction Strategies",
      description: "Practical methods to reduce food waste in your household.",
      category: "waste-reduction",
      type: "infographic",
      image: "📊",
    },
    {
      id: 5,
      title: "Traditional Bengali Preservation Methods",
      description: "Learn ancestral food preservation techniques from Bengal.",
      category: "storage",
      type: "article",
      image: "📚",
    },
    {
      id: 6,
      title: "Meal Planning for Budget Control",
      description: "Step-by-step guide to plan meals within your budget.",
      category: "meal-planning",
      type: "infographic",
      image: "📊",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || resource.category === filterCategory;
    const matchesType = filterType === "all" || resource.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Debounced search term for YouTube queries
  const debouncedSearch = useMemo(() => searchQuery.trim(), [searchQuery]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      // Only fetch YouTube videos if type filter includes videos or when user searches
      if (filterType !== "all" && filterType !== "video") return;
      if (!debouncedSearch) {
        // default search for sustainable food topics
        setYtLoading(true);
        setYtError(null);
        try {
          const resp = await fetch(`/api/youtube/search?q=sustainable food waste management&maxResults=8`);
          const data = await resp.json();
          if (!cancelled) setYtVideos(data.videos || []);
        } catch (e: any) {
          if (!cancelled) setYtError("Failed to load videos");
        } finally {
          if (!cancelled) setYtLoading(false);
        }
        return;
      }

      setYtLoading(true);
      setYtError(null);
      try {
        const resp = await fetch(`/api/youtube/search?q=${encodeURIComponent(debouncedSearch)}&maxResults=8`);
        const data = await resp.json();
        if (!cancelled) setYtVideos(data.videos || []);
      } catch (e: any) {
        if (!cancelled) setYtError("Failed to load videos");
      } finally {
        if (!cancelled) setYtLoading(false);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, filterType]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="w-5 h-5" />;
      case "video":
        return <Video className="w-5 h-5" />;
      case "infographic":
        return <PieChart className="w-5 h-5" />;
      default:
        return <FileText className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />

      <div className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">{t("resources.title")}</h1>
          <p className="text-muted-foreground">
            Learn from expert resources on sustainable food management
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t("resources.search")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">{t("resources.filterByCategory")}</option>
            <option value="waste-reduction">
              {t("resources.wasteReduction")}
            </option>
            <option value="budget-tips">{t("resources.budgetTips")}</option>
            <option value="meal-planning">{t("resources.mealPlanning")}</option>
            <option value="composting">{t("resources.composting")}</option>
            <option value="storage">{t("resources.storageT")}</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">{t("resources.filterByType")}</option>
            <option value="article">{t("resources.article")}</option>
            <option value="video">{t("resources.video")}</option>
            <option value="infographic">{t("resources.infographic")}</option>
          </select>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="rounded-xl bg-card border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                {resource.image}
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-lg leading-tight">
                      {resource.title}
                    </h3>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getTypeIcon(resource.type)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground capitalize">
                    {resource.category}
                  </span>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                    {t("resources.readMore")}
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No resources found</p>
          </div>
        )}
      </div>

      {/* YouTube Videos Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <YoutubeIcon />
            {t("resources.youtubeTitle", { defaultValue: "YouTube Videos" })}
          </h2>
          <span className="text-sm text-muted-foreground">
            {ytLoading ? "Loading…" : ytError ? ytError : `${ytVideos.length} videos`}
          </span>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ytVideos.map((v) => (
            <a
              key={v.id}
              href={`https://www.youtube.com/watch?v=${v.id}`}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border overflow-hidden hover:border-primary/50 hover:shadow-lg transition-all"
            >
              <div className="aspect-video bg-muted">
                {v.thumbnails?.medium?.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={v.thumbnails.medium.url}
                    alt={v.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    No thumbnail
                  </div>
                )}
              </div>
              <div className="p-3">
                <div className="text-sm font-semibold line-clamp-2 group-hover:text-primary">
                  {v.title}
                </div>
                <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                  {v.channelTitle} • {new Date(v.publishedAt).toLocaleDateString()}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const YoutubeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="text-primary"
  >
    <path d="M23.498 6.186a2.999 2.999 0 0 0-2.118-2.118C19.622 3.5 12 3.5 12 3.5s-7.622 0-9.38.568A2.999 2.999 0 0 0 .502 6.186C-.066 7.944-.066 12-.066 12s0 4.056.568 5.814a2.999 2.999 0 0 0 2.118 2.118C4.378 20.5 12 20.5 12 20.5s7.622 0 9.38-.568a2.999 2.999 0 0 0 2.118-2.118C24.066 16.056 24.066 12 24.066 12s0-4.056-.568-5.814ZM9.75 15.5v-7l6 3.5-6 3.5Z" />
  </svg>
);
