import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ImageGallery({ images }: { images: string[] }) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image) => (
          <img
            key={image}
            src={image}
            onClick={() => setSelectedImage(image)}
            className="cursor-zoom-in hover:opacity-90 transition-opacity"
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <img src={selectedImage} className="max-h-[90vh] max-w-[90vw]" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 