
import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, CalendarClock, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { User } from '../types';

interface TimetableModalProps {
  user: User | null;
  onClose: () => void;
}

const TimetableModal: React.FC<TimetableModalProps> = ({ user, onClose }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`timetable_${user.username}`);
      if (saved) setImageSrc(saved);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset error
    setError(null);

    // Basic size check (warn if > 5MB)
    if (file.size > 5 * 1024 * 1024) {
       setError("Image is large (>5MB). It might fail to save to local storage.");
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImageSrc(result);
      if (user) {
        try {
          localStorage.setItem(`timetable_${user.username}`, result);
        } catch (err) {
          setError("Storage full! Image is too large to save locally. Please use a smaller image or screenshot.");
        }
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setImageSrc(null);
    setError(null);
    if (user) {
      localStorage.removeItem(`timetable_${user.username}`);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scale-in">
        
        {/* Header */}
        <div className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 p-4 md:p-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
               <CalendarClock className="text-indigo-600 dark:text-indigo-400" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Class Timetable</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden md:block">Keep your schedule handy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-slate-500">
            <X size={20} />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center min-h-[300px]">
           {error && (
             <div className="w-full mb-4 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm">
                <AlertCircle size={16} />
                {error}
             </div>
           )}

           {!imageSrc ? (
             <div 
               onClick={triggerUpload}
               className="w-full h-full min-h-[300px] border-3 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group p-10"
             >
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                   <Upload size={32} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Upload Timetable Image</h3>
                <p className="text-slate-500 text-sm mt-1 text-center">Click to browse<br/>(JPG, PNG, WEBP supported)</p>
             </div>
           ) : (
             <div className="relative w-full h-full flex flex-col items-center">
                <img 
                  src={imageSrc} 
                  alt="Timetable" 
                  className="max-w-full max-h-[65vh] rounded-lg shadow-md object-contain"
                />
             </div>
           )}
           
           <input 
             type="file" 
             ref={fileInputRef}
             className="hidden"
             accept="image/*"
             onChange={handleFileChange}
           />
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex justify-between items-center">
            {imageSrc ? (
               <div className="flex w-full justify-between gap-4">
                 <button 
                   onClick={handleDelete}
                   className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors text-sm font-medium"
                 >
                   <Trash2 size={16} />
                   <span className="hidden sm:inline">Remove</span>
                 </button>
                 <button 
                   onClick={triggerUpload}
                   className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                 >
                   <ImageIcon size={16} />
                   <span>Change Image</span>
                 </button>
               </div>
            ) : (
              <span className="text-xs text-slate-400 mx-auto">Supported formats: Any image file supported by your browser.</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default TimetableModal;
