import { useState, useCallback } from 'react';
import ImageCard from './components/ImageCard';
import Lightbox from './components/Lightbox';

// Gallery images using Picsum Photos for beautiful placeholder images
const galleryImages = [
  {
    id: 1,
    src: 'https://picsum.photos/id/1015/800/800',
    title: 'Mountain River',
    description: 'A serene river flowing through majestic mountains',
  },
  {
    id: 2,
    src: 'https://picsum.photos/id/1018/800/800',
    title: 'Misty Forest',
    description: 'Foggy morning in a dense evergreen forest',
  },
  {
    id: 3,
    src: 'https://picsum.photos/id/1019/800/800',
    title: 'Ocean Sunset',
    description: 'Breathtaking sunset over the calm ocean waves',
  },
  {
    id: 4,
    src: 'https://picsum.photos/id/1035/800/800',
    title: 'Desert Dunes',
    description: 'Golden sand dunes stretching to the horizon',
  },
  {
    id: 5,
    src: 'https://picsum.photos/id/1036/800/800',
    title: 'Coastal Cliffs',
    description: 'Dramatic rocky cliffs meeting the blue sea',
  },
  {
    id: 6,
    src: 'https://picsum.photos/id/1039/800/800',
    title: 'Autumn Trail',
    description: 'A winding path through colorful autumn foliage',
  },
  {
    id: 7,
    src: 'https://picsum.photos/id/1043/800/800',
    title: 'Lake Reflection',
    description: 'Crystal clear lake reflecting the surrounding peaks',
  },
  {
    id: 8,
    src: 'https://picsum.photos/id/1047/800/800',
    title: 'Starry Night',
    description: 'The Milky Way visible over a peaceful landscape',
  },
  {
    id: 9,
    src: 'https://picsum.photos/id/1049/800/800',
    title: 'Waterfall Paradise',
    description: 'A magnificent waterfall in a tropical setting',
  },
];

export default function App() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openLightbox = useCallback((index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  }, []);

  const goToIndex = useCallback((index: number) => {
    setCurrentImageIndex(index);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="py-12 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-purple-500/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Image Gallery
          </h1>
          <p className="text-lg text-purple-200/80 max-w-2xl mx-auto">
            Explore our stunning collection of nature photography. Click any image
            to view it in full size with smooth lightbox navigation.
          </p>
        </div>
      </header>

      {/* Gallery Grid */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <ImageCard
              key={image.id}
              image={image}
              onClick={() => openLightbox(index)}
            />
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <div className="flex items-center gap-2 text-purple-200/70 text-sm">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                ←
              </kbd>
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                →
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="w-px h-4 bg-white/20" />
            <div className="flex items-center gap-2 text-purple-200/70 text-sm">
              <kbd className="px-2 py-1 bg-white/10 rounded text-xs font-mono">
                ESC
              </kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      <Lightbox
        images={galleryImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={goToNext}
        onPrev={goToPrev}
        onGoToIndex={goToIndex}
      />

      {/* Footer */}
      <footer className="py-8 text-center text-purple-200/50 text-sm border-t border-white/5">
        <p>Click on any image to open the lightbox • Use arrow keys to navigate</p>
      </footer>
    </div>
  );
}
