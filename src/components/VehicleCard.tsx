import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, ChevronLeft, ChevronRight, Gauge, Fuel, Settings2, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import ReservedBanner from "@/components/ReservedBanner";
import dgtB from "@/assets/dgt-b.png";
import dgtC from "@/assets/dgt-c.png";
import dgtCero from "@/assets/dgt-cero.png";
import dgtEco from "@/assets/dgt-eco.png";

interface VehicleCardProps {
  id: string;
  images: string[];
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  mileageUnit: string;
  fuel: string;
  transmission: string;
  type: string;
  status: string;
  environmentalBadge?: string;
}

const VehicleCard = ({
  id,
  images = [],
  brand,
  model,
  year,
  price,
  mileage,
  mileageUnit,
  fuel,
  transmission,
  type,
  status,
  environmentalBadge
}: VehicleCardProps) => {
  const { translateVehicleAttribute, formatPrice, t } = useLanguage();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([]);

  // Preload all images
  useEffect(() => {
    if (images.length > 1) {
      const loadPromises = images.map((src, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            setImagesLoaded(prev => {
              const newLoaded = [...prev];
              newLoaded[index] = true;
              return newLoaded;
            });
            resolve();
          };
          img.onerror = () => resolve();
          img.src = src;
        });
      });

      Promise.all(loadPromises);
    }
  }, [images]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImage = images[currentImageIndex] || '/placeholder.svg';

  const getBadgeImage = (badge?: string) => {
    if (!badge) return null;
    const badgeLower = badge.toLowerCase();
    if (badgeLower.includes('cero') || badgeLower.includes('0')) return dgtCero;
    if (badgeLower.includes('eco')) return dgtEco;
    if (badgeLower.includes('c')) return dgtC;
    if (badgeLower.includes('b')) return dgtB;
    return null;
  };

  const badgeImage = getBadgeImage(environmentalBadge);

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={`/stock/${id}`} className="block h-full" onClick={handleClick}>
      <Card className="group overflow-hidden rounded-2xl bg-[#F5F5F4] border border-[#E7E5E4] shadow-lg hover:border-[#ffff00] hover:-translate-y-1.5 hover:shadow-[0_10px_25px_rgba(255,255,0,0.25)] transition-all duration-300 flex flex-col h-full cursor-pointer">
        <div className="relative overflow-hidden rounded-t-2xl">
          {status === 'Reserved' && <ReservedBanner size="small" />}
          <img
            src={currentImage}
            alt={`${brand} ${model}`}
            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
            style={{ imageRendering: 'auto' }}
          />
          {images.length > 1 && (
            <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border border-black/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  prevImage();
                }}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 bg-black/50 hover:bg-black/70 text-white border border-black/20"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  nextImage();
                }}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
          {images.length > 1 && (
            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2.5 py-1 rounded-full font-body tracking-wide">
              {currentImageIndex + 1}/{images.length}
            </div>
          )}
        </div>

        <CardContent className="p-5 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-1 gap-3">
            <div className="min-w-0">
              <h3 className="font-heading text-xl font-bold text-slate-900 truncate">{brand} {model}</h3>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">{year} · {translateVehicleAttribute('body_type', type)}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-xl font-heading font-black text-slate-900">{formatPrice(price)}</p>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-end justify-between gap-3">
              <div className="grid grid-cols-2 gap-2 my-3 flex-1">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E5E4] text-slate-700 text-xs font-semibold">
                  <Gauge size={13} className="text-[#EAB308] flex-shrink-0" /> {mileage.toLocaleString()} {mileageUnit}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E5E4] text-slate-700 text-xs font-semibold">
                  <Fuel size={13} className="text-[#EAB308] flex-shrink-0" /> {translateVehicleAttribute('fuel', fuel)}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E5E4] text-slate-700 text-xs font-semibold">
                  <Settings2 size={13} className="text-[#EAB308] flex-shrink-0" /> {translateVehicleAttribute('transmission', transmission)}
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#E7E5E4] text-slate-700 text-xs font-semibold">
                  <Calendar size={13} className="text-[#EAB308] flex-shrink-0" /> {year}
                </div>
              </div>
              {badgeImage && (
                <div className="flex-shrink-0 mb-3">
                  <img src={badgeImage} alt={`Badge ${environmentalBadge}`} className="w-10 h-10" />
                </div>
              )}
            </div>
            <div className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-900 text-white group-hover:bg-[#ffff00] group-hover:text-black group-hover:shadow-md transition-colors duration-300">
              <Eye size={14} />
              {t('common.view_details')}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default VehicleCard;
