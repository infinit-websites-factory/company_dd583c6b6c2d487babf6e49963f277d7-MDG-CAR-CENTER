import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { Loader2, AlertCircle } from "lucide-react";
import VehicleCard from "@/components/VehicleCard";
import VehicleFilters from "@/components/VehicleFilters";
import {
  fetchCarsPaginated,
  fetchCars,
  transformApiCarToVehicle,
  type Vehicle,
} from "@/services/carsApi";
import {
  VehicleFilterState,
  FILTER_DEFAULTS,
  useVehicleFilters,
  filtersToApiParams,
  deriveFilterOptions,
} from "@/hooks/useVehicleFilters";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";

const PAGE_SIZE = 30;

const Stock = () => {
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Use the existing hook for filter state management
  const { filters, updateFilter, clearFilters } = useVehicleFilters([]);

  // Debounce rapidly-changing inputs — selects do NOT need debouncing
  const debouncedSearch = useDebouncedValue(filters.searchTerm, 400);
  const debouncedPrice = useDebouncedValue(filters.priceRange, 400);
  const debouncedMileage = useDebouncedValue(filters.mileageRange, 400);
  const debouncedYear = useDebouncedValue(filters.yearRange, 400);

  // Compose the effective API params (debounced values override)
  const apiFilters: VehicleFilterState = {
    ...filters,
    searchTerm: debouncedSearch,
    priceRange: debouncedPrice,
    mileageRange: debouncedMileage,
    yearRange: debouncedYear,
  };
  const apiParams = filtersToApiParams(apiFilters);

  // Read initial search from URL once, then clean URL
  useEffect(() => {
    if (!initialSearch) return;
    updateFilter("searchTerm", initialSearch);
    const next = new URLSearchParams(searchParams);
    next.delete("search");
    setSearchParams(next, { replace: true });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Unfiltered fetch — only to populate dropdown options
  const { data: allCarsData } = useQuery({
    queryKey: ["cars-all-for-filters"],
    queryFn: () => fetchCars(),
    staleTime: 10 * 60 * 1000,
    retry: 1,
  });
  const allVehicles: Vehicle[] = allCarsData
    ? allCarsData.items.map(transformApiCarToVehicle)
    : [];
  const filterOptions = deriveFilterOptions(allVehicles);

  // Infinite query for the filtered, paginated listing
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars-paginated", apiParams],
    queryFn: ({ pageParam = 1 }) =>
      fetchCarsPaginated({ ...apiParams, page: pageParam as number, size: PAGE_SIZE }),
    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // Flatten all pages into one array
  const vehicles: Vehicle[] = data
    ? data.pages.flatMap((page) => page.items.map(transformApiCarToVehicle))
    : [];
  const totalVehicles = data?.pages[0]?.total ?? 0;

  // IntersectionObserver — fires 200px before sentinel reaches viewport
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  );

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: "200px",
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, [handleObserver]);

  const sortOptions = [
    { value: "updated_desc", label: t("stock_page.sort_options.updated_desc") },
    { value: "updated_asc", label: t("stock_page.sort_options.updated_asc") },
    { value: "price_asc", label: t("stock_page.sort_options.price_asc") },
    { value: "price_desc", label: t("stock_page.sort_options.price_desc") },
    { value: "year_desc", label: t("stock_page.sort_options.year_desc") },
    { value: "year_asc", label: t("stock_page.sort_options.year_asc") },
    { value: "mileage_asc", label: t("stock_page.sort_options.mileage_asc") },
    { value: "mileage_desc", label: t("stock_page.sort_options.mileage_desc") },
    { value: "brand_asc", label: t("stock_page.sort_options.brand_asc") },
  ];

  const hasActiveFilters =
    filters.searchTerm ||
    filters.selectedBrand ||
    filters.selectedBodyType ||
    filters.selectedTransmission ||
    filters.selectedFuel ||
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < FILTER_DEFAULTS.priceRange[1] ||
    filters.mileageRange[0] > 0 ||
    filters.mileageRange[1] < FILTER_DEFAULTS.mileageRange[1];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <SEO page="stock" />
      <Header />

      <main>
        {/* Page header */}
        <div className="relative border-b border-[#27272A] py-12 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.04)_0%,transparent_70%)] pointer-events-none" />
          <div className="relative z-10 container mx-auto px-4 max-w-7xl text-center">
            <h1 className="text-4xl font-heading font-semibold text-white mb-2">
              {t("stock_page.title")}
            </h1>
            <p className="text-[#D4D4D8] max-w-xl mx-auto">
              {t("stock_page.subtitle")}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sticky filter sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <VehicleFilters
                  searchTerm={filters.searchTerm}
                  onSearchChange={(v) => updateFilter("searchTerm", v)}
                  selectedBrand={filters.selectedBrand}
                  onBrandChange={(v) => updateFilter("selectedBrand", v)}
                  selectedBodyType={filters.selectedBodyType}
                  onBodyTypeChange={(v) => updateFilter("selectedBodyType", v)}
                  selectedTransmission={filters.selectedTransmission}
                  onTransmissionChange={(v) => updateFilter("selectedTransmission", v)}
                  selectedFuel={filters.selectedFuel}
                  onFuelChange={(v) => updateFilter("selectedFuel", v)}
                  priceRange={filters.priceRange}
                  onPriceRangeChange={(v) => updateFilter("priceRange", v)}
                  mileageRange={filters.mileageRange}
                  onMileageRangeChange={(v) => updateFilter("mileageRange", v)}
                  yearRange={filters.yearRange}
                  onYearRangeChange={(v) => updateFilter("yearRange", v)}
                  onClearFilters={clearFilters}
                  brands={filterOptions.brands}
                  bodyTypes={filterOptions.bodyTypes}
                  transmissions={filterOptions.transmissions}
                  fuels={filterOptions.fuels}
                />
              </div>
            </div>

            {/* Results area */}
            <div id="stock-results" className="lg:col-span-3 scroll-mt-24">
              {/* Sort + results count bar */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
                <p className="text-sm text-[#D4D4D8]">
                  {isLoading ? (
                    "Cargando vehículos..."
                  ) : (
                    <>
                      <span className="font-bold text-lg text-[#ffff00]">{totalVehicles}</span>{" "}
                      {totalVehicles !== 1
                        ? t("stock_page.results_count_plural")
                        : t("stock_page.results_count")}
                      {hasActiveFilters && (
                        <> · <span className="text-white/85">{t("stock_page.found")}</span></>
                      )}
                    </>
                  )}
                </p>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#D4D4D8]">{t("stock_page.sort_by")}</span>
                  <Select
                    value={filters.sortBy}
                    onValueChange={(v) => updateFilter("sortBy", v)}
                  >
                    <SelectTrigger className="w-52 bg-[#F5F5F4] border-[#E7E5E4] text-slate-900 focus:ring-[#ffff00]/40">
                      <SelectValue placeholder={t("stock_page.sort_placeholder")} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#F5F5F4] border-[#E7E5E4] text-slate-900">
                      {sortOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value} className="text-slate-900 focus:bg-[#ffff00]/20 focus:text-slate-900">
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Error state */}
              {isError && (
                <Alert className="mb-6 bg-white border-slate-200 text-slate-900">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {t("vehicle_gallery.error_loading")}
                  </AlertDescription>
                </Alert>
              )}

              {/* Vehicle grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {isLoading
                  ? Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="h-48 w-full rounded-lg bg-white/10" />
                        <Skeleton className="h-4 w-3/4 bg-white/10" />
                        <Skeleton className="h-4 w-1/2 bg-white/10" />
                        <Skeleton className="h-8 w-full bg-white/10" />
                      </div>
                    ))
                  : vehicles.length > 0
                  ? vehicles.map((vehicle) => (
                      <VehicleCard key={vehicle.id} {...vehicle} />
                    ))
                  : !isLoading && (
                      <div className="col-span-full text-center py-16">
                        <p className="text-[#D4D4D8] text-lg mb-4">
                          {t("stock_page.no_results")}
                        </p>
                        <button
                          onClick={clearFilters}
                          className="text-[#ffff00] underline hover:no-underline text-sm"
                        >
                          {t("stock_page.clear_filters")}
                        </button>
                      </div>
                    )}
              </div>

              {/* Infinite scroll sentinel */}
              <div ref={loadMoreRef} className="flex justify-center py-8">
                {isFetchingNextPage && (
                  <div className="flex items-center gap-2 text-[#D4D4D8] text-sm">
                    <Loader2 className="h-5 w-5 animate-spin text-[#ffff00]" />
                    <span>Cargando más vehículos...</span>
                  </div>
                )}
                {!hasNextPage && vehicles.length > 0 && !isLoading && (
                  <p className="text-white/85 text-sm">
                    Mostrando {vehicles.length} de {totalVehicles} vehículos
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Stock;
