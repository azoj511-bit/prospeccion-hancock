import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface MediaItem {
  id: number;
  url: string;
  type: 'image' | 'video';
  title: string;
  category: string;
  year: number;
}

interface LightboxProps {
  items: MediaItem[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({
  items,
  currentIndex,
  isOpen,
  onClose,
  onPrev,
  onNext,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Disable body scroll when lightbox is open
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || items.length === 0) return null;

  const currentItem = items[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 p-4 sm:p-6 select-none animate-in fade-in duration-300"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-[110] rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-brand-gold"
        aria-label="Close lightbox"
      >
        <X className="h-6 w-6" />
      </button>

      {/* Navigation Left */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      )}

      {/* Media Content Container */}
      <div 
        className="relative max-h-[80%] max-w-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {currentItem.type === 'video' ? (
          <div className="aspect-video w-[800px] max-w-full rounded-lg overflow-hidden border border-brand-gold/15 bg-brand-blue/90 shadow-2xl">
            <iframe
              src={currentItem.url}
              title={currentItem.title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <img
            src={currentItem.url}
            alt={currentItem.title}
            className="max-h-[75vh] max-w-full rounded-lg object-contain border border-brand-gold/10 bg-brand-blue/10 shadow-2xl animate-in zoom-in-95 duration-300 select-text"
            loading="eager"
          />
        )}
      </div>

      {/* Caption footer */}
      <div 
        className="mt-4 text-center max-w-xl text-white font-sans"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="text-[10px] uppercase font-bold tracking-wider text-brand-gold border border-brand-gold/30 rounded-full px-2.5 py-0.5 inline-block mb-1.5 bg-brand-gold/5">
          {currentItem.category} • {currentItem.year}
        </span>
        <h4 className="font-serif text-base font-semibold leading-relaxed">{currentItem.title}</h4>
      </div>

      {/* Index Counter */}
      {items.length > 1 && (
        <div className="absolute bottom-4 text-xs font-semibold text-white/50 font-mono tracking-widest uppercase">
          {currentIndex + 1} / {items.length}
        </div>
      )}

      {/* Navigation Right */}
      {items.length > 1 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 top-1/2 z-[110] -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white hover:bg-white/20 transition focus:outline-none focus:ring-2 focus:ring-brand-gold"
          aria-label="Next image"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};
