
import React, { useState, useEffect, useRef } from 'react';
import { X, Upload, Trash2, CalendarClock, Image as ImageIcon, AlertCircle, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { User } from '../types';

interface TimetableModalProps {
  user: User | null;
  onClose: () => void;
}

const TimetableModal: React.FC<TimetableModalProps> = ({ user, onClose }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Zoom & Pan State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Container ref for bounds checking if needed in future
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`timetable_${user.username}`);
      if (saved) setImageSrc(saved);
    }
  }, [user]);

  // Reset zoom when image changes
  useEffect(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, [imageSrc]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);

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
    setZoom(1);
    setPan({ x: 0, y: 0 });
    if (user) {
      localStorage.removeItem(`timetable_${user.username}`);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  // --- Zoom Handlers ---
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 4));
  
  const handleZoomOut = () => {
    setZoom(prev => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) setPan({ x: 0, y: 0 }); // Reset pan if fully zoomed out
      return newZoom;
    });
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  // --- Pan Logic (Unified for Mouse & Touch) ---
  const handleStart = (clientX: number, clientY: number) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: clientX - pan.x, y: clientY - pan.y });
    }
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (isDragging && zoom > 1) {
      setPan({ x: clientX - dragStart.x, y: clientY - dragStart.y });
    }
  };

  const handleEnd = () => setIsDragging(false);

  // Mouse Events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) e.preventDefault();
    handleMove(e.clientX, e.clientY);
  };

  // Touch Events
  const onTouchStart = (e: React.TouchEvent) => {
    if (zoom > 1) {
       // Only capture touch if zoomed in
       handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (isDragging && zoom > 1) {
       // Prevent scrolling only when panning the image
       handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="relative w-full max-w-4xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh] animate-scale-in">
        
        {/* Header */}
        <div className="bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl border-b border-slate-200 dark:border-white/10 p-4 flex justify-between items-center z-10 shrink-0">
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
        <div className="flex-1 overflow-hidden relative bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center">
           {error && (
             <div className="absolute top-4 left-4 right-4 z-20 p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-800 rounded-lg flex items-center gap-2 text-rose-600 dark:text-rose-400 text-sm">
                <AlertCircle size={16} />
                {error}
             </div>
           )}

           {!imageSrc ? (
             <div className="p-6 w-full h-full flex flex-col items-center justify-center">
                <div 
                  onClick={triggerUpload}
                  className="w-full max-w-md aspect-video border-3 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-all group p-10"
                >
                    <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 group-hover:scale-110 transition-transform">
                      <Upload size={32} className="text-slate-400 dark:text-slate-500 group-hover:text-emerald-500" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">Upload Timetable Image</h3>
                    <p className="text-slate-500 text-sm mt-1 text-center">Click to browse<br/>(JPG, PNG, WEBP supported)</p>
                </div>
             </div>
           ) : (
             <div 
                className="relative w-full h-full overflow-hidden flex items-center justify-center bg-slate-200/50 dark:bg-slate-950"
                ref={imageContainerRef}
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={handleEnd}
                style={{ 
                    cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
                    touchAction: zoom > 1 ? 'none' : 'auto' // Prevent scrolling when zoomed in on mobile
                }}
             >
                <img 
                  src={imageSrc} 
                  alt="Timetable" 
                  className="max-w-full max-h-full object-contain transition-transform duration-75 select-none"
                  style={{ transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})` }}
                  draggable={false}
                />

                {/* Zoom Controls Overlay */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-20 animate-fade-in">
                   <div className="bg-slate-900/80 backdrop-blur-md text-white p-1.5 rounded-lg shadow-lg flex items-center gap-1 border border-white/10">
                       <button 
                          onClick={handleZoomOut} 
                          className="p-2 hover:bg-white/20 rounded-md transition-colors disabled:opacity-30" 
                          disabled={zoom <= 1}
                          title="Zoom Out"
                       >
                           <ZoomOut size={20} />
                       </button>
                       <span className="min-w-[48px] text-center text-xs font-bold font-mono">{Math.round(zoom * 100)}%</span>
                       <button 
                          onClick={handleZoomIn} 
                          className="p-2 hover:bg-white/20 rounded-md transition-colors disabled:opacity-30" 
                          disabled={zoom >= 4}
                          title="Zoom In"
                       >
                           <ZoomIn size={20} />
                       </button>
                       <div className="w-px h-5 bg-white/20 mx-1"></div>
                       <button 
                          onClick={handleReset} 
                          className="p-2 hover:bg-white/20 rounded-md transition-colors" 
                          title="Reset View"
                       >
                           <RotateCcw size={20} />
                       </button>
                   </div>
                </div>
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
        <div className="p-4 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex justify-between items-center shrink-0">
            {imageSrc ? (
               <div className="flex w-full justify-between gap-4">
                 <button 
                   onClick={handleDelete}
                   className="flex items-center gap-2 px-4 py-2 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors text-sm font-medium"
                 >
                   <Trash2 size={16} />
                   <span className="hidden sm:inline">Remove</span>
                 </button>
                 <div className="flex gap-2">
                    <button 
                      onClick={triggerUpload}
                      className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors text-sm font-medium"
                    >
                      <ImageIcon size={16} />
                      <span>Change</span>
                    </button>
                 </div>
               </div>
            ) : (
              <span className="text-xs text-slate-400 mx-auto">Supported formats: JPG, PNG, WEBP</span>
            )}
        </div>
      </div>
    </div>
  );
};

export default TimetableModal;
