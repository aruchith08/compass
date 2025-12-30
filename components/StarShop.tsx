
import React from 'react';
import { X, Star, ShoppingBag, Zap, Palette, FileSearch, Shield, Check } from 'lucide-react';
import { useRoadmap } from '../RoadmapContext';
import { ShopItem } from '../types';

interface StarShopModalProps {
  onClose: () => void;
}

const SHOP_ITEMS: ShopItem[] = [
    { id: 'streak_freeze', name: 'Streak Freeze', description: 'Prevent points loss for one inactive day.', cost: 50, icon: 'shield', type: 'buff' },
    { id: 'theme_cyber', name: 'Cyberpunk Theme', description: 'Unlock neon aesthetic mode.', cost: 200, icon: 'palette', type: 'theme' },
    { id: 'cv_review_pro', name: 'CV Deep Scan', description: 'Unlock advanced AI resume critique prompt.', cost: 100, icon: 'file', type: 'utility' },
];

const StarShopModal: React.FC<StarShopModalProps> = ({ onClose }) => {
  const { starPoints, purchaseItem, inventory } = useRoadmap();

  const handleBuy = (item: ShopItem) => {
      purchaseItem(item.id, item.cost);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in" onClick={onClose}>
        <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>
            <div className="p-6 bg-amber-500 flex justify-between items-center text-white">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl"><ShoppingBag size={24} /></div>
                    <div>
                        <h2 className="text-xl font-bold">Star Shop</h2>
                        <div className="flex items-center gap-1.5 text-xs font-black uppercase tracking-widest bg-black/20 px-2 py-0.5 rounded-lg w-fit mt-1">
                             <Star size={10} fill="currentColor" /> {starPoints} Points Available
                        </div>
                    </div>
                </div>
                <button onClick={onClose}><X size={24} /></button>
            </div>
            
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-4">
                {SHOP_ITEMS.map(item => {
                    const isOwned = inventory.includes(item.id);
                    const canAfford = starPoints >= item.cost;
                    
                    return (
                        <div key={item.id} className={`flex items-center gap-4 p-4 rounded-2xl border ${isOwned ? 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 opacity-75' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-white/10'}`}>
                            <div className={`p-3 rounded-xl ${isOwned ? 'bg-slate-200 dark:bg-slate-700 text-slate-500' : 'bg-amber-100 dark:bg-amber-900/30 text-amber-600'}`}>
                                {item.icon === 'shield' && <Shield size={24} />}
                                {item.icon === 'palette' && <Palette size={24} />}
                                {item.icon === 'file' && <FileSearch size={24} />}
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</h3>
                                <p className="text-xs text-slate-500 dark:text-slate-400">{item.description}</p>
                            </div>
                            <button 
                                onClick={() => handleBuy(item)}
                                disabled={isOwned || !canAfford}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1 transition-all
                                    ${isOwned 
                                        ? 'bg-transparent text-emerald-500' 
                                        : canAfford 
                                            ? 'bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/20 active:scale-95' 
                                            : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                                    }
                                `}
                            >
                                {isOwned ? <Check size={16} /> : <><Star size={10} fill="currentColor" /> {item.cost}</>}
                                {isOwned ? "Owned" : ""}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    </div>
  );
};

export default StarShopModal;
