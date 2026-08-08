"use client";

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import AnatomyCard from '@/components/anatomy/AnatomyCard';
import SketchfabModal, { AnatomyModel } from '@/components/anatomy/SketchfabModal';
import modelsData from '@/data/anatomy-models.json';

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
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedModel, setSelectedModel] = useState<AnatomyModel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    setTimeout(() => setSelectedModel(null), 300); // Wait for animation
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#050816] relative overflow-hidden transition-colors duration-300">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40 dark:opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] blur-[120px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gradient-to-tl from-[#06B6D4] to-[#2563EB] blur-[120px] mix-blend-screen" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-20 md:py-28 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center justify-center"
          >
            <div className="mb-6 flex justify-center text-[#2563EB] dark:text-[#06B6D4]">
              {/* Decorative DNA/Neural icon */}
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4.5 16.5c3.6-1.8 7.2-1.8 10.8 0 3.6 1.8 7.2 1.8 10.8 0" />
                <path d="M4.5 7.5c3.6 1.8 7.2 1.8 10.8 0 3.6-1.8 7.2-1.8 10.8 0" />
                <line x1="8" y1="10" x2="8" y2="14" />
                <line x1="16" y1="10" x2="16" y2="14" />
                <circle cx="4.5" cy="16.5" r="1.5" />
                <circle cx="15.5" cy="16.5" r="1.5" />
                <circle cx="26.5" cy="16.5" r="1.5" />
                <circle cx="4.5" cy="7.5" r="1.5" />
                <circle cx="15.5" cy="7.5" r="1.5" />
                <circle cx="26.5" cy="7.5" r="1.5" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-poppins text-gray-900 dark:text-white tracking-tight mb-4">
              Explore the Human Body in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2563EB] to-[#7C3AED]">3D</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Dive into our interactive 3D anatomy library. Visualize structures, bones, and organs with unprecedented detail and precision.
            </p>
          </motion.div>
        </div>

        {/* Search & Filters */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center gap-8 mb-16"
        >
          {/* Search Bar */}
          <div className="relative w-full max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#2563EB] transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white/50 dark:bg-black/20 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all shadow-sm"
              placeholder="Search for models, categories, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 w-full">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white shadow-lg shadow-[#2563EB]/25 scale-105'
                    : 'bg-white dark:bg-white/5 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/10 hover:scale-105'
                }`}
              >
                {category}
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
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">No models found</h3>
            <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      <SketchfabModal 
        model={selectedModel} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
