import { Header } from '@/components/Header';
import { useTranslation } from '@/lib/useTranslation';
import { useState } from 'react';
import { Search, Plus, Edit2, Trash2 } from 'lucide-react';

export default function Inventory() {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Sample inventory data
  const items = [
    { id: 1, name: 'Tomatoes', category: 'vegetables', quantity: 2, unit: 'kg', expiryDays: 2, purchaseDate: '2024-01-15', status: 'expiring-soon' },
    { id: 2, name: 'Milk', category: 'dairy', quantity: 1, unit: 'L', expiryDays: 3, purchaseDate: '2024-01-18', status: 'expiring-soon' },
    { id: 3, name: 'Rice', category: 'grains', quantity: 5, unit: 'kg', expiryDays: 180, purchaseDate: '2024-01-10', status: 'fresh' },
    { id: 4, name: 'Onions', category: 'vegetables', quantity: 3, unit: 'kg', expiryDays: 30, purchaseDate: '2024-01-15', status: 'fresh' },
    { id: 5, name: 'Eggs', category: 'eggs', quantity: 12, unit: 'pieces', expiryDays: 7, purchaseDate: '2024-01-16', status: 'fresh' },
  ];

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'expiring-soon':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'expired':
        return 'bg-destructive/20 text-destructive border-destructive/30';
      default:
        return 'bg-primary/10 text-primary border-primary/20';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      
      <div className="flex-1 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold">{t('inventory.title')}</h1>
            <p className="text-muted-foreground mt-2">Manage your household food inventory</p>
          </div>
          <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-brand-green-light text-white font-semibold rounded-lg hover:shadow-lg transition-all">
            <Plus className="w-5 h-5" />
            {t('inventory.add')}
          </button>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder={t('inventory.search')}
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
            <option value="all">{t('inventory.filterByCategory')}</option>
            <option value="vegetables">{t('categories.vegetables')}</option>
            <option value="fruits">{t('categories.fruits')}</option>
            <option value="dairy">{t('categories.dairy')}</option>
            <option value="grains">{t('categories.grains')}</option>
            <option value="eggs">{t('categories.eggs')}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="all">{t('inventory.filterByStatus')}</option>
            <option value="fresh">{t('inventory.fresh')}</option>
            <option value="expiring-soon">{t('inventory.expiringSoon')}</option>
            <option value="expired">{t('inventory.expired')}</option>
          </select>
        </div>

        {/* Items Table */}
        <div className="rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-card/50 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.itemName')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.category')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.quantity')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.expirationDate')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">{t('inventory.status')}</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-card/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground capitalize">{item.category}</td>
                    <td className="px-6 py-4 text-sm">{item.quantity} {item.unit}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">{item.expiryDays} days</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                        {item.status === 'expiring-soon' ? t('inventory.expiringSoon') :
                         item.status === 'expired' ? t('inventory.expired') :
                         t('inventory.fresh')}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-accent rounded-lg transition-colors" title={t('inventory.edit')}>
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-destructive/10 rounded-lg transition-colors" title={t('inventory.delete')}>
                          <Trash2 className="w-4 h-4 text-destructive" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No items found</p>
          </div>
        )}
      </div>
    </div>
  );
}
