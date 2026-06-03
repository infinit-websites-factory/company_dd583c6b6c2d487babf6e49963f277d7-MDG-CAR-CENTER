export interface CarApiResponse {
  id: string;
  title: string;
  ad_description: string;
  price_cents: number;
  currency_code: string;
  status: string;
  make: string;
  model: string;
  registration_date: string;
  odometer: {
    value: number;
    unit: string;
  };
  fuel: string;
  transmission: string;
  body_type: string;
  color: string;
  num_doors: number;
  num_seats: number;
  engine_size: number | null;
  engine_size_unit?: string;
  engine_power: number;
  photo_urls: string[];
  created_at: string;
  updated_at: string;
  days_in_stock: number;
  country_details?: {
    country_code: string;
    environmental_badge: string;
  };
}

export interface PaginatedCarsApiResponse {
  items: CarApiResponse[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

export type CarsApiResponse = CarApiResponse[];

export interface Vehicle {
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
  description?: string;
  color?: string;
  doors?: number;
  seats?: number;
  engineSize?: number | null;
  engineSizeUnit?: string;
  enginePower?: number;
  createdAt: string;
  updatedAt: string;
  environmentalBadge?: string;
}

// Default fallback profile ID
const DEFAULT_PROFILE_ID = '630688fb-a7f8-44b8-ac55-4d853dc8cfa7';

// UUID v4 regex pattern
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

/**
 * Extract profile ID from subdomain if domain is infinitsite.com
 * Returns the profile ID if valid UUID, otherwise returns default
 */
const getProfileIdFromSubdomain = (): string => {
  if (typeof window === 'undefined') {
    return DEFAULT_PROFILE_ID;
  }

  const hostname = window.location.hostname;

  if (!hostname.endsWith('.infinitsite.com')) {
    return DEFAULT_PROFILE_ID;
  }

  const subdomain = hostname.replace('.infinitsite.com', '');

  if (UUID_REGEX.test(subdomain)) {
    console.log('Using profile ID from subdomain:', subdomain);
    return subdomain;
  }

  console.log('Subdomain is not a valid UUID, using default profile ID');
  return DEFAULT_PROFILE_ID;
};

// Get the profile ID (either from subdomain or default)
export const PROFILE_ID = getProfileIdFromSubdomain();

// API endpoints using the dynamic profile ID
const API_BASE_URL = 'https://multipost-public.app.infinit.cc';
const API_URL = `${API_BASE_URL}/api/public/inventory/profiles/${PROFILE_ID}`;
export const CONTACT_FORM_API_URL = `${API_BASE_URL}/api/interactions/contact-form`;
const GOOGLE_REVIEWS_URL = `${API_BASE_URL}/api/public/dealers/by-profile/${PROFILE_ID}/google-reviews`;

// --- Google Reviews types ---
export interface GoogleReviewAuthor {
  displayName: string;
  photoUri: string;
  uri: string;
}

export interface GoogleReviewItem {
  name: string;
  rating: number;
  text: { text: string; languageCode: string };
  originalText: { text: string; languageCode: string };
  publishTime: string;
  relativePublishTimeDescription: string;
  authorAttribution: GoogleReviewAuthor;
  googleMapsUri: string;
}

export interface GoogleReviewsData {
  google_rating: number;
  google_review_count: number;
  google_reviews_sample: GoogleReviewItem[];
}

export const fetchGoogleReviews = async (): Promise<GoogleReviewsData> => {
  const response = await fetch(GOOGLE_REVIEWS_URL, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  if (!response.ok) throw new Error(`Reviews API failed: ${response.status}`);
  const json = await response.json();
  return json.result.data as GoogleReviewsData;
};

// --- Paginated fetch params ---
export interface FetchCarsParams {
  page?: number;
  size?: number;
  order_by?: string;
  search?: string;
  make?: string;
  body_type?: string;
  transmission?: string;
  fuel_type?: string;
  price_from?: number; // in cents
  price_to?: number;   // in cents
  mileage_from?: number;
  mileage_to?: number;
  year_from?: number;
  year_to?: number;
}

// Fetch all cars (legacy — used by VehicleGallery homepage section)
export const fetchCars = async (): Promise<PaginatedCarsApiResponse> => {
  const response = await fetch(`${API_URL}?size=100`, {
    method: 'GET',
    headers: { 'accept': 'application/json', 'cache-control': 'no-cache' },
  });
  if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
  return response.json();
};

// Fetch cars with server-side pagination, filtering and sorting
export const fetchCarsPaginated = async (params: FetchCarsParams): Promise<PaginatedCarsApiResponse> => {
  const url = new URL(API_URL);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      url.searchParams.set(key, String(value));
    }
  });
  const response = await fetch(url.toString(), {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  if (!response.ok) throw new Error(`API call failed with status: ${response.status}`);
  return response.json();
};

// Fetch a single car directly by ID (no cache dependency)
export const fetchCarById = async (id: string): Promise<CarApiResponse> => {
  const url = `${API_URL}/cars/${id}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: { 'accept': 'application/json' },
  });
  if (!response.ok) throw new Error(`Car not found: ${response.status}`);
  return response.json();
};

export const transformApiCarToVehicle = (apiCar: CarApiResponse): Vehicle => {
  const registrationYear = apiCar.registration_date
    ? new Date(apiCar.registration_date).getFullYear()
    : new Date().getFullYear();

  const badgeValue = apiCar.country_details?.environmental_badge;

  console.log('API Car badge value:', badgeValue, 'for', apiCar.make, apiCar.model);

  return {
    id: apiCar.id,
    images: apiCar.photo_urls?.length > 0 ? apiCar.photo_urls : ['/placeholder.svg'],
    brand: apiCar.make || 'Unknown',
    model: apiCar.model || 'Unknown',
    year: registrationYear,
    price: apiCar.price_cents ? apiCar.price_cents / 100 : 0,
    mileage: apiCar.odometer?.value || 0,
    mileageUnit: apiCar.odometer?.unit || 'km',
    fuel: apiCar.fuel || 'Unknown',
    transmission: apiCar.transmission || 'Unknown',
    type: apiCar.body_type || 'Unknown',
    status: apiCar.status || 'Published',
    description: apiCar.ad_description,
    color: apiCar.color,
    doors: apiCar.num_doors,
    seats: apiCar.num_seats,
    engineSize: apiCar.engine_size,
    engineSizeUnit: apiCar.engine_size_unit || 'cc',
    enginePower: apiCar.engine_power,
    createdAt: apiCar.created_at,
    updatedAt: apiCar.updated_at,
    environmentalBadge: badgeValue
  };
};
