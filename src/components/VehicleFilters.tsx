import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface VehicleFiltersProps {
  searchTerm?: string;
  onSearchChange: (value: string) => void;
  selectedBrand?: string;
  onBrandChange: (value: string) => void;
  selectedBodyType?: string;
  onBodyTypeChange: (value: string) => void;
  selectedTransmission?: string;
  onTransmissionChange: (value: string) => void;
  selectedFuel?: string;
  onFuelChange: (value: string) => void;
  priceRange?: [number, number];
  onPriceRangeChange: (value: [number, number]) => void;
  mileageRange?: [number, number];
  onMileageRangeChange: (value: [number, number]) => void;
  yearRange?: [number, number];
  onYearRangeChange: (value: [number, number]) => void;
  onClearFilters: () => void;
  brands?: string[];
  bodyTypes?: string[];
  transmissions?: string[];
  fuels?: string[];
}

const VehicleFilters = ({
  searchTerm = '',
  onSearchChange,
  selectedBrand = '',
  onBrandChange,
  selectedBodyType = '',
  onBodyTypeChange,
  selectedTransmission = '',
  onTransmissionChange,
  selectedFuel = '',
  onFuelChange,
  priceRange = [0, 100000],
  onPriceRangeChange,
  mileageRange = [0, 300000],
  onMileageRangeChange,
  yearRange = [2000, new Date().getFullYear()],
  onYearRangeChange,
  onClearFilters,
  brands = [],
  bodyTypes = [],
  transmissions = [],
  fuels = []
}: VehicleFiltersProps) => {
  const { t, translateVehicleAttribute, formatPrice, getCurrencySymbol } = useLanguage();

  // Safely access array values with fallbacks
  const safePriceRange = priceRange || [0, 100000];
  const safeMileageRange = mileageRange || [0, 300000];
  const safeYearRange = yearRange || [2000, new Date().getFullYear()];

  const hasActiveFilters = searchTerm || selectedBrand || selectedBodyType || selectedTransmission || selectedFuel ||
    safePriceRange[0] > 0 || safePriceRange[1] < 100000 ||
    safeMileageRange[0] > 0 || safeMileageRange[1] < 300000 ||
    safeYearRange[0] > 2000 || safeYearRange[1] < new Date().getFullYear();

  const inputCls = "bg-[#161618] rounded-xl border border-zinc-700/80 text-white font-medium text-sm placeholder:text-zinc-400 shadow-sm transition-all duration-300 hover:border-zinc-500 focus:ring-0 focus:border-[#ffff00] focus-visible:ring-0 focus-visible:border-[#ffff00]";
  const triggerCls = "bg-[#161618] rounded-xl border border-zinc-700/80 text-white font-medium text-sm data-[placeholder]:text-zinc-400 shadow-sm transition-all duration-300 hover:border-zinc-500 focus:ring-0 focus:border-[#ffff00] data-[state=open]:border-[#ffff00] [&>svg]:text-zinc-300";
  const contentCls = "bg-[#161618] border-zinc-700 text-white";
  const itemCls = "text-white focus:bg-[#ffff00]/20 focus:text-white data-[state=checked]:text-[#ffff00]";
  const labelCls = "text-sm font-bold tracking-wide text-white mb-2 block";
  const rangeCls = "flex justify-between gap-2 mt-3";
  const pillCls = "bg-[#1E1E22] text-white border border-zinc-700 text-xs font-bold px-2.5 py-1 rounded-md shadow-sm";
  const dot = <span className="bg-[#ffff00] w-1.5 h-1.5 rounded-full inline-block ml-1.5 align-middle" />;

  const handleApply = () => {
    document.getElementById("stock-results")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#0F0F11] p-6 rounded-2xl border border-zinc-800 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#ffff00]" />
                  {t('filters.title')}
                </h3>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClearFilters}
                    className="text-zinc-400 hover:text-black hover:bg-[#ffff00]"
                  >
                    <X size={16} className="mr-1" />
                    {t('filters.clear_filters')}
                  </Button>
                )}
              </div>

              {/* Search */}
              <div className="space-y-2">
                <label className={labelCls}>{t('filters.search_label')}{dot}</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-300" size={16} />
                  <Input
                    placeholder={t('search.placeholder')}
                    className={`pl-10 ${inputCls}`}
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                  />
                </div>
              </div>

              {/* Brand Filter */}
              <div className="space-y-2">
                <label className={labelCls}>{t('filters.brand')}{dot}</label>
                <Select value={selectedBrand} onValueChange={(value) => onBrandChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className={triggerCls}>
                    <SelectValue placeholder={t('filters.brand_all')} />
                  </SelectTrigger>
                  <SelectContent className={contentCls}>
                    <SelectItem value="all" className={itemCls}>{t('filters.brand_all')}</SelectItem>
                    {brands.map((brand) => (
                      <SelectItem key={brand} value={brand} className={itemCls}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Body Type Filter */}
              <div className="space-y-2">
                <label className={labelCls}>{t('filters.body_type')}</label>
                <Select value={selectedBodyType} onValueChange={(value) => onBodyTypeChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className={triggerCls}>
                    <SelectValue placeholder={t('filters.body_type_all')} />
                  </SelectTrigger>
                  <SelectContent className={contentCls}>
                    <SelectItem value="all" className={itemCls}>{t('filters.body_type_all')}</SelectItem>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type} className={itemCls}>
                        {translateVehicleAttribute('body_type', type)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Transmission Filter */}
              <div className="space-y-2">
                <label className={labelCls}>{t('filters.transmission')}</label>
                <Select value={selectedTransmission} onValueChange={(value) => onTransmissionChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className={triggerCls}>
                    <SelectValue placeholder={t('filters.transmission_all')} />
                  </SelectTrigger>
                  <SelectContent className={contentCls}>
                    <SelectItem value="all" className={itemCls}>{t('filters.transmission_all')}</SelectItem>
                    {transmissions.map((transmission) => (
                      <SelectItem key={transmission} value={transmission} className={itemCls}>
                        {translateVehicleAttribute('transmission', transmission)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Fuel Filter */}
              <div className="space-y-2">
                <label className={labelCls}>{t('filters.fuel')}</label>
                <Select value={selectedFuel} onValueChange={(value) => onFuelChange(value === 'all' ? '' : value)}>
                  <SelectTrigger className={triggerCls}>
                    <SelectValue placeholder={t('filters.fuel_all')} />
                  </SelectTrigger>
                  <SelectContent className={contentCls}>
                    <SelectItem value="all" className={itemCls}>{t('filters.fuel_all')}</SelectItem>
                    {fuels.map((fuel) => (
                      <SelectItem key={fuel} value={fuel} className={itemCls}>
                        {translateVehicleAttribute('fuel', fuel)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className={labelCls}>{t('filters.price')}{dot}</label>
                <div className="px-2">
                  <Slider
                    value={safePriceRange}
                    onValueChange={onPriceRangeChange}
                    max={100000}
                    step={1000}
                    className="w-full"
                  />
                  <div className={rangeCls}>
                    <span className={pillCls}>{formatPrice(safePriceRange[0] || 0)}</span>
                    <span className={`${pillCls} ${safePriceRange[1] < 100000 ? 'text-[#ffff00]' : ''}`}>{safePriceRange[1] >= 100000 ? `${formatPrice(100000)}+` : formatPrice(safePriceRange[1] || 0)}</span>
                  </div>
                </div>
              </div>

              {/* Mileage Range */}
              <div className="space-y-3">
                <label className={labelCls}>{t('filters.mileage')}</label>
                <div className="px-2">
                  <Slider
                    value={safeMileageRange}
                    onValueChange={onMileageRangeChange}
                    max={300000}
                    step={5000}
                    className="w-full"
                  />
                  <div className={rangeCls}>
                    <span className={pillCls}>{safeMileageRange[0]?.toLocaleString() || '0'} km</span>
                    <span className={`${pillCls} ${safeMileageRange[1] < 300000 ? 'text-[#ffff00]' : ''}`}>{safeMileageRange[1] >= 300000 ? '300,000+' : `${safeMileageRange[1]?.toLocaleString() || '0'}`} km</span>
                  </div>
                </div>
              </div>

              {/* Year Range */}
              <div className="space-y-3">
                <label className={labelCls}>{t('filters.year')}</label>
                <div className="px-2">
                  <Slider
                    value={safeYearRange}
                    onValueChange={onYearRangeChange}
                    min={2000}
                    max={new Date().getFullYear()}
                    step={1}
                    className="w-full"
                  />
                  <div className={rangeCls}>
                    <span className={pillCls}>{safeYearRange[0] || 2000}</span>
                    <span className={pillCls}>{safeYearRange[1] || new Date().getFullYear()}</span>
                  </div>
                </div>
              </div>

              {/* Apply CTA */}
              <button
                type="button"
                onClick={handleApply}
                className="w-full py-3 rounded-lg bg-[#ffff00] text-black text-sm font-bold hover:bg-[#e6e600] hover:shadow-[0_8px_22px_-6px_rgba(255,255,0,0.5)] transition-all duration-300"
              >
                {t('filters.title') === 'Filtros' ? 'Aplicar filtros' : 'Apply filters'}
              </button>
            </div>
  );
};

export default VehicleFilters;