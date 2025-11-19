import { Header } from '@/components/Header';
import { useTranslation } from '@/lib/useTranslation';
import { useState } from 'react';
import { Search, FileText, Video, PieChart, ArrowRight } from 'lucide-react';

export default function Resources() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterType, setFilterType] = useState('all');

  // Sample resources data
  const resources = [
    {
      id: 1,
      title: 'Mango Peel Composting Guide',
      description: 'Learn how to compost mango peels and create nutrient-rich soil for your garden.',
      category: 'composting',
      type: 'article',
      image: '📚',
    },
    {
      id: 2,
      title: 'Budget-Friendly Nutritious Recipes',
      description: 'Delicious and affordable recipes using seasonal vegetables.',
      category: 'budget-tips',
      type: 'article',
      image: '🍳',
    },
    {
      id: 3,
      title: 'Seasonal Vegetable Storage Techniques',
      description: 'Expert tips on storing vegetables to extend their shelf life.',
      category: 'storage',
      type: 'video',
      image: '📹',
    },
    {
      id: 4,
      title: 'Food Waste Reduction Strategies',
      description: 'Practical methods to reduce food waste in your household.',
      category: 'waste-reduction',
      type: 'infographic',
      image: '📊',
    },
    {
      id: 5,
      title: 'Traditional Bengali Preservation Methods',
      description: 'Learn ancestral food preservation techniques from Bengal.',
      category: 'storage',
      type: 'article',
      image: '📚',
    },
    {
      id: 6,
      title: 'Meal Planning for Budget Control',
      description: 'Step-by-step guide to plan meals within your budget.',
      category: 'meal-planning',
      type: 'infographic',
      image: '📊',
    },
  ];

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || resource.category === filterCategory;
    const matchesType = filterType === 'all' || resource.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />;
      case 'video':
        return <Video className="w-5 h-5" />;
      case 'infographic':
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
          <h1 className="text-4xl font-bold mb-2">{t('resources.title')}</h1>
          <p className="text-muted-foreground">Learn from expert resources on sustainable food management</p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('resources.search')}
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
            <option value="all">{t('resources.filterByCategory')}</option>
            <option value="waste-reduction">{t('resources.wasteReduction')}</option>
            <option value="budget-tips">{t('resources.budgetTips')}</option>
            <option value="meal-planning">{t('resources.mealPlanning')}</option>
            <option value="composting">{t('resources.composting')}</option>
            <option value="storage">{t('resources.storageT')}</option>
          </select>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">{t('resources.filterByType')}</option>
            <option value="article">{t('resources.article')}</option>
            <option value="video">{t('resources.video')}</option>
            <option value="infographic">{t('resources.infographic')}</option>
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
                    <h3 className="font-bold text-lg leading-tight">{resource.title}</h3>
                  </div>
                  <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {getTypeIcon(resource.type)}
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">{resource.description}</p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground capitalize">
                    {resource.category}
                  </span>
                  <button className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all">
                    {t('resources.readMore')}
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
    </div>
  );
}
