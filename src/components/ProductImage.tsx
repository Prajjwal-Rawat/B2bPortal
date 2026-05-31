import { useState } from 'react';
import { Package } from 'lucide-react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}

const FALLBACK =
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=900&q=80';

const ProductImage = ({ src, alt, className = '', eager = false }: ProductImageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-slate-100 ${className}`}>
      {!failed ? (
        <img
          src={currentSrc}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className="block h-full w-full object-cover"
          onError={() => {
            if (currentSrc !== FALLBACK) {
              setCurrentSrc(FALLBACK);
            } else {
              setFailed(true);
            }
          }}
        />
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-slate-100 text-slate-400">
          <Package size={28} strokeWidth={1.5} />
          <span className="text-[10px] font-medium">Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
