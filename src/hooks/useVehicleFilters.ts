import { useState, useMemo, useCallback } from 'react';
import type { Vehicle, FetchCarsParams } from '@/services/carsApi';

export interface VehicleFilterState {
  searchTerm: string;
  selectedBrand: string;
  selectedBodyType: string;
  selectedTransmission: string;
  selectedFuel: string;
  priceRange: [number, number];
  mileageRange: [number, number];
  yearRange: [number, number];
  sortBy: string;
}

// These MUST match the slider max values in VehicleFilters.tsx
// (price max=100000, mileage max=300000)
export const FILTER_DEFAULTS: VehicleFilterState = {
  searchTerm: '',
  selectedBrand: '',
  selectedBodyType: '',
  selectedTransmission: '',
  selectedFuel: '',
  priceRange: [0, 100000],
  mileageRange: [0, 300000],
  yearRange: [2000, new Date().getFullYear()],
  sortBy: 'updated_desc',
};

// Maps UI sort value → API order_by param
const SORT_TO_API: Record<string, string> = {
  updated_desc: '-created_at',
  updated_asc: 'created_at',
  price_asc: 'price_cents',
  price_desc: '-price_cents',
  year_desc: '-registration_date',
  year_asc: 'registration_date',
  mileage_asc: 'odometer',
  mileage_desc: '-odometer',
  brand_asc: 'make',
};

// Maps UI fuel label (Spanish) → API fuel_type value (English)
const FUEL_TO_API: Record<string, string> = {
  'Diésel': 'Diesel',
  'Gasolina': 'Petrol',
  'Eléctrico': 'Electric',
  'Híbrido': 'Hybrid',
  'GNC': 'CNG',
  'GLP': 'LPG',
  'Hidrógeno': 'Hydrogen',
  'Biocombustibles': 'Biofuels',
};

/**
 * Converts the UI filter state to API query params.
 * Only includes params that differ from defaults (avoids unnecessary query strings).
 */
export const filtersToApiParams = (filters: VehicleFilterState): FetchCarsParams => {
  const params: FetchCarsParams = {};

  if (filters.sortBy && SORT_TO_API[filters.sortBy]) {
    params.order_by = SORT_TO_API[filters.sortBy];
  }

  if (filters.searchTerm.trim()) {
    params.search = filters.searchTerm.trim();
  }

  if (filters.selectedBrand) {
    params.make = filters.selectedBrand;
  }

  if (filters.selectedBodyType) {
    params.body_type = filters.selectedBodyType;
  }

  if (filters.selectedTransmission) {
    params.transmission = filters.selectedTransmission;
  }

  if (filters.selectedFuel) {
    // Send English API value if we have a mapping, otherwise send as-is
    params.fuel_type = FUEL_TO_API[filters.selectedFuel] ?? filters.selectedFuel;
  }

  // Price in cents — only send if not at default bounds
  if (filters.priceRange[0] > 0) {
    params.price_from = filters.priceRange[0] * 100;
  }
  if (filters.priceRange[1] < FILTER_DEFAULTS.priceRange[1]) {
    params.price_to = filters.priceRange[1] * 100;
  }

  // Mileage
  if (filters.mileageRange[0] > 0) {
    params.mileage_from = filters.mileageRange[0];
  }
  if (filters.mileageRange[1] < FILTER_DEFAULTS.mileageRange[1]) {
    params.mileage_to = filters.mileageRange[1];
  }

  // Year
  if (filters.yearRange[0] > FILTER_DEFAULTS.yearRange[0]) {
    params.year_from = filters.yearRange[0];
  }
  if (filters.yearRange[1] < FILTER_DEFAULTS.yearRange[1]) {
    params.year_to = filters.yearRange[1];
  }

  return params;
};

/**
 * Derives filter dropdown options from an unfiltered vehicle list.
 * Used to ensure dropdowns always show all available values.
 */
export const deriveFilterOptions = (vehicles: Vehicle[]) => {
  const brands = [...new Set(
    vehicles
      .map(v => v.brand)
      .filter(b => b && b.toLowerCase() !== 'unknown')
      .map(b => b.toUpperCase())
  )].sort();

  const bodyTypes = [...new Set(
    vehicles
      .map(v => v.type)
      .filter(t => t && t.toLowerCase() !== 'unknown')
  )].sort();

  const transmissions = [...new Set(
    vehicles
      .map(v => v.transmission)
      .filter(t => t && t.toLowerCase() !== 'unknown')
  )].sort();

  const fuels = [...new Set(
    vehicles
      .map(v => v.fuel)
      .filter(f => f && f.toLowerCase() !== 'unknown' && f.toLowerCase() !== 'desconocido')
  )].sort();

  return { brands, bodyTypes, transmissions, fuels };
};

/**
 * Backward-compatible hook — still used by pages that do local filtering.
 */
export const useVehicleFilters = (vehicles: Vehicle[]) => {
  const [filters, setFilters] = useState<VehicleFilterState>(FILTER_DEFAULTS);

  const filterOptions = useMemo(() => deriveFilterOptions(vehicles), [vehicles]);

  // Client-side filtered list (kept for backward compatibility)
  const filteredVehicles = useMemo(() => {
    return vehicles.filter(vehicle => {
      if (filters.searchTerm) {
        const q = filters.searchTerm.toLowerCase();
        if (!`${vehicle.brand} ${vehicle.model}`.toLowerCase().includes(q)) return false;
      }
      if (filters.selectedBrand && vehicle.brand.toUpperCase() !== filters.selectedBrand) return false;
      if (filters.selectedBodyType && vehicle.type !== filters.selectedBodyType) return false;
      if (filters.selectedTransmission && vehicle.transmission !== filters.selectedTransmission) return false;
      if (filters.selectedFuel && vehicle.fuel !== filters.selectedFuel) return false;
      if (vehicle.price < filters.priceRange[0]) return false;
      if (filters.priceRange[1] < FILTER_DEFAULTS.priceRange[1] && vehicle.price > filters.priceRange[1]) return false;
      if (vehicle.mileage < filters.mileageRange[0]) return false;
      if (filters.mileageRange[1] < FILTER_DEFAULTS.mileageRange[1] && vehicle.mileage > filters.mileageRange[1]) return false;
      if (vehicle.year < filters.yearRange[0] || vehicle.year > filters.yearRange[1]) return false;
      return true;
    });
  }, [vehicles, filters]);

  const updateFilter = useCallback(<K extends keyof VehicleFilterState>(
    key: K,
    value: VehicleFilterState[K]
  ) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(FILTER_DEFAULTS);
  }, []);

  return { filters, updateFilter, clearFilters, filteredVehicles, filterOptions };
};
