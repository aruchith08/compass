
import React, { useState } from 'react';
import { useRoadmap } from '../RoadmapContext';
import { ExternalLink, Search, BookOpen, Filter } from 'lucide-react';

const Resources: React.FC = () => {
  const { items } = useRoadmap();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Extract unique categories from resources
  const categories = ['All', ...Array.from(new Set(items.filter(i => i.resource_name).map(i => i.category)))].sort();

  // Filter resources
  const resources = items
    .filter(item => item.resource_name && item.resource_link)
    .filter(item => {
      const matchesSearch = item.resource_name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Learning Resources</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">Curated list from the roadmap source.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Category Filter */}
          <div className="relative">
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-500">
                <Filter size={14} />
             </div>
             <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full sm:w-40 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-200 text-sm rounded-lg focus:outline-none focus:border-emerald-500 block pl-9 p-2.5 appearance-none cursor-pointer"
             >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
             </select>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search resources..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 text-slate-900 dark:text-slate-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-100/50 dark:bg-slate-950/50 border-b border-white/10">
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Resource Name</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Related Task</th>
                <th className="p-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
              {resources.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-500 dark:text-indigo-400">
                        <BookOpen size={16} />
                      </div>
                      <span className="font-medium text-slate-900 dark:text-slate-200">{item.resource_name}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.category}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">
                    {item.name}
                  </td>
                  <td className="p-4 text-right">
                    <a 
                      href={item.resource_link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center p-2 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors"
                    >
                      <span className="text-sm font-medium mr-2">Open</span>
                      <ExternalLink size={14} />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {resources.length === 0 && (
          <div className="p-8 text-center text-slate-500">
            No resources found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;
