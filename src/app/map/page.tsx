"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Search, Navigation, Info, Clock, Building2, X } from 'lucide-react';

// Simplified Map Data
const buildings = [
  { id: 'main', name: 'Main Administration', type: 'admin', x: 50, y: 20, desc: 'University administration offices, registration, and student affairs.', depts: ['Admissions', 'Registration', 'Finance'], hours: '8:00 AM - 4:00 PM' },
  { id: 'medical', name: 'Faculty of Applied Medical Sciences', type: 'academic', x: 30, y: 50, desc: 'Home to NEURO. Classrooms, labs, and faculty offices for medical sciences.', depts: ['Medicine', 'Pharmacy', 'Nursing'], hours: '8:00 AM - 6:00 PM' },
  { id: 'library', name: 'Main Library', type: 'facility', x: 70, y: 45, desc: 'Extensive collection of books, journals, and quiet study areas.', depts: ['Study Halls', 'Computer Labs', 'Archives'], hours: '8:00 AM - 8:00 PM' },
  { id: 'student-center', name: 'Student Center', type: 'facility', x: 50, y: 65, desc: 'Hub for student activities, clubs, and food court.', depts: ['Food Court', 'Club Offices', 'Lounge'], hours: '8:00 AM - 7:00 PM' },
  { id: 'labs', name: 'Scientific Labs Complex', type: 'academic', x: 20, y: 70, desc: 'Advanced laboratories for practical experiments.', depts: ['Chemistry', 'Biology', 'Physics'], hours: '8:00 AM - 5:00 PM' },
  { id: 'sports', name: 'Sports Complex', type: 'sports', x: 85, y: 75, desc: 'Gymnasium, swimming pool, and outdoor fields.', depts: ['Gym', 'Pool', 'Courts'], hours: '9:00 AM - 8:00 PM' },
  { id: 'mosque', name: 'University Mosque', type: 'facility', x: 50, y: 85, desc: 'Main mosque for prayers.', depts: ['Prayer Halls'], hours: 'Open all day' },
  { id: 'parking1', name: 'North Parking', type: 'parking', x: 50, y: 5, desc: 'Main parking area for students and staff.', depts: [], hours: '24/7' },
];

const typeColors = {
  admin: 'fill-slate-700 dark:fill-slate-300 stroke-slate-800 dark:stroke-slate-100',
  academic: 'fill-blue-500 dark:fill-blue-600 stroke-blue-700 dark:stroke-blue-400',
  facility: 'fill-purple-500 dark:fill-purple-600 stroke-purple-700 dark:stroke-purple-400',
  sports: 'fill-orange-500 dark:fill-orange-600 stroke-orange-700 dark:stroke-orange-400',
  parking: 'fill-slate-400 dark:fill-slate-600 stroke-slate-500 dark:stroke-slate-400',
};

export default function MapPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState<typeof buildings[0] | null>(null);
  const [zoom, setZoom] = useState(1);
  
  const filteredBuildings = buildings.filter(b => 
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.depts.some(d => d.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.2, 2.5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.2, 0.5));
  const handleResetZoom = () => setZoom(1);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050816] pt-24 pb-10 flex flex-col h-screen">
      <div className="max-w-7xl mx-auto px-4 w-full flex-grow flex flex-col">
        
        {/* Header & Search */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-poppins text-slate-900 dark:text-white flex items-center">
              <MapPin className="w-8 h-8 mr-3 text-blue-600 dark:text-blue-400" />
              Campus Map
            </h1>
            <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">Navigate The Hashemite University campus</p>
          </div>
          
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search buildings, departments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-white shadow-sm"
            />
          </div>
        </div>

        {/* Map Container */}
        <div className="relative flex-grow bg-white/50 dark:bg-[#0a0f25]/50 backdrop-blur-xl rounded-3xl border border-slate-200 dark:border-white/10 shadow-xl overflow-hidden flex flex-col md:flex-row">
          
          {/* Legend - Desktop */}
          <div className="hidden md:block w-64 bg-slate-50/80 dark:bg-[#11162a]/80 border-r border-slate-200 dark:border-white/10 p-6 overflow-y-auto z-10">
            <h3 className="font-bold text-slate-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><div className="w-3 h-3 rounded-full bg-blue-500 mr-3"></div> Academic</li>
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><div className="w-3 h-3 rounded-full bg-slate-700 dark:bg-slate-300 mr-3"></div> Administration</li>
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><div className="w-3 h-3 rounded-full bg-purple-500 mr-3"></div> Facilities</li>
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><div className="w-3 h-3 rounded-full bg-orange-500 mr-3"></div> Sports</li>
              <li className="flex items-center text-sm text-slate-700 dark:text-slate-300"><div className="w-3 h-3 rounded-full bg-slate-400 mr-3"></div> Parking</li>
            </ul>

            {searchQuery && (
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Results ({filteredBuildings.length})</h3>
                <ul className="space-y-2">
                  {filteredBuildings.map(b => (
                    <li key={`res-${b.id}`}>
                      <button 
                        onClick={() => setSelectedBuilding(b)}
                        className="text-left w-full text-sm py-2 px-3 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 transition-colors"
                      >
                        {b.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive SVG Map */}
          <div className="flex-grow relative overflow-hidden bg-[#e5e9f0] dark:bg-[#0b1021]">
            
            {/* Map Controls */}
            <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white/80 dark:bg-[#1a1f35]/80 backdrop-blur p-2 rounded-xl border border-slate-200 dark:border-white/10 shadow-lg">
              <button onClick={handleZoomIn} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold">+</button>
              <button onClick={handleResetZoom} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white"><Navigation className="w-4 h-4" /></button>
              <button onClick={handleZoomOut} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-white font-bold">-</button>
            </div>

            {/* Map SVG Area */}
            <div 
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
              style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease-out' }}
            >
              <svg viewBox="0 0 100 100" className="w-[800px] h-[800px] max-w-[200%] max-h-[200%]">
                {/* Decorative Roads */}
                <path d="M 0 40 Q 50 40 50 100" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeWidth="3" strokeDasharray="1 1" />
                <path d="M 50 40 L 100 40" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeWidth="3" strokeDasharray="1 1" />
                <path d="M 50 40 L 50 0" fill="none" stroke="currentColor" className="text-slate-300 dark:text-slate-800" strokeWidth="3" strokeDasharray="1 1" />
                
                {/* Buildings */}
                {buildings.map(b => {
                  const isMatch = filteredBuildings.some(fb => fb.id === b.id);
                  const isSelected = selectedBuilding?.id === b.id;
                  
                  return (
                    <g 
                      key={b.id} 
                      transform={`translate(${b.x}, ${b.y})`}
                      onClick={() => setSelectedBuilding(b)}
                      className={`cursor-pointer transition-all duration-300 ${!isMatch && searchQuery ? 'opacity-20' : 'opacity-100 hover:opacity-80'}`}
                    >
                      <rect 
                        x="-4" y="-3" width="8" height="6" rx="1" 
                        className={`${typeColors[b.type as keyof typeof typeColors]} stroke-[0.5] ${isSelected ? 'stroke-white dark:stroke-white stroke-[1]' : ''}`}
                      />
                      {isSelected && (
                        <circle cx="0" cy="0" r="6" fill="none" stroke="#3b82f6" strokeWidth="0.5" className="animate-ping opacity-50" />
                      )}
                      <text x="0" y="4.5" fontSize="2" fill="currentColor" textAnchor="middle" className="text-slate-800 dark:text-slate-300 font-semibold pointer-events-none drop-shadow-sm">
                        {b.name.split(' ')[0]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            
            {/* Building Info Popup */}
            <AnimatePresence>
              {selectedBuilding && (
                <motion.div 
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 20, scale: 0.95 }}
                  className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-80 bg-white/90 dark:bg-[#11162a]/95 backdrop-blur-xl rounded-2xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden z-30"
                >
                  <div className={`h-2 ${
                    selectedBuilding.type === 'academic' ? 'bg-blue-500' :
                    selectedBuilding.type === 'facility' ? 'bg-purple-500' :
                    selectedBuilding.type === 'sports' ? 'bg-orange-500' :
                    selectedBuilding.type === 'admin' ? 'bg-slate-700' : 'bg-slate-400'
                  }`} />
                  <div className="p-5">
                    <button 
                      onClick={() => setSelectedBuilding(null)}
                      className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 dark:hover:text-white"
                    >
                      <X className="w-5 h-5" />
                    </button>
                    
                    <h3 className="text-lg font-bold font-poppins text-slate-900 dark:text-white pr-6 mb-2">
                      {selectedBuilding.name}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {selectedBuilding.desc}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex items-start">
                        <Building2 className="w-4 h-4 text-slate-400 mt-0.5 mr-2 shrink-0" />
                        <div className="text-sm">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Departments: </span>
                          <span className="text-slate-600 dark:text-slate-400">{selectedBuilding.depts.join(', ') || 'N/A'}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 text-slate-400 mr-2 shrink-0" />
                        <div className="text-sm">
                          <span className="font-semibold text-slate-700 dark:text-slate-300">Hours: </span>
                          <span className="text-slate-600 dark:text-slate-400">{selectedBuilding.hours}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </div>
      </div>
    </div>
  );
}
