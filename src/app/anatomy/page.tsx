"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import AnatomyCard from '@/components/anatomy/AnatomyCard';
import SketchfabModal, { AnatomyModel } from '@/components/anatomy/SketchfabModal';
import modelsData from '@/data/anatomy-models.json';
import { useLanguage } from '@/components/providers/LanguageProvider';

const categories = [
  "All",
  "Human Skeleton",
  "Muscles",
  "Skull",
  "Nervous System",
  "Respiratory System",
  "Digestive System",
  "Cardiovascular System"
];

export default function AnatomyLibraryPage() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<AnatomyModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getCategoryTranslation = (cat: string) => {
    if (cat === "All") return t.anatomy.all;
    const key = cat.replace(/\s+/g, '').replace(/^[A-Z]/, l => l.toLowerCase());
    return (t.anatomy.categories as any)[key] || cat;
  };

  const models: AnatomyModel[] = modelsData;

  const filteredModels = useMemo(() => {
    return models.filter((model) => {
      const matchesSearch = 
        model.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        model.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = activeCategory === "All" || model.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory, models]);

  const handleOpenModal = (model: AnatomyModel) => {
    setSelectedModel(model);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedModel(null), 300);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F5] dark:bg-[#080406] relative overflow-hidden transition-colors duration-300">
      {/* Ambient Crimson Background */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-30 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#9F1239]/20 blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#BE123C]/15 blur-[130px]" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-poppins text-slate-900 dark:text-rose-100 tracking-tight mb-4" dangerouslySetInnerHTML={{ __html: t.anatomy.title }} />
            <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-rose-200/70 max-w-2xl mx-auto font-inter">
              {t.anatomy.subtitle}
            </p>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-6 mb-14"
        >
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 dark:text-rose-300/40 group-focus-within:text-[#9F1239] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-3.5 bg-white dark:bg-[#12070D] border border-rose-900/15 dark:border-rose-900/30 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-rose-300/40 focus:outline-none focus:ring-2 focus:ring-[#9F1239] transition-all shadow-sm text-sm font-medium"
              placeholder={t.anatomy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex overflow-x-auto no-scrollbar pb-2 sm:flex-wrap sm:justify-center gap-2 w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-200 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#881337] via-[#9F1239] to-[#BE123C] text-white shadow-md shadow-rose-900/30'
                    : 'bg-white dark:bg-[#12070D] text-slate-600 dark:text-rose-200/70 border border-rose-900/10 dark:border-rose-900/30 hover:bg-rose-50 dark:hover:bg-rose-950/30 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {getCategoryTranslation(category)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Grid */}
        {filteredModels.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AnatomyCard model={model} onOpenModal={handleOpenModal} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20 text-slate-500 dark:text-rose-200/50">
            <p className="text-xl">{t.common.noResults}</p>
          </div>
        )}
      </div>

      {/* 3D Sketchfab Viewer Modal */}
      <SketchfabModal 
        model={selectedModel} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
