import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Quote, Car, Star, Clock, Trophy, Truck, CheckCircle2, Plus, MapPin } from "lucide-react";
import nosotros1 from "@/assets/nosotros1.jpg";
import nosotros2 from "@/assets/nosotros2.jpg";

const stats = [
  { icon: Star, value: "5.0★", label: "Valoración Google" },
  { icon: Trophy, value: "12", label: "Meses de garantía" },
  { icon: Truck, value: "Toda España", label: "Entrega a domicilio" },
  { icon: Clock, value: "24h", label: "Tiempo de respuesta" },
];

// Real deliveries from mdgcarcenter.com/ventas: [model, customer, location]
// Photo index maps to /deliveries/{n}.jpg (in order of the ventas page).
const RAW: [string, string, string][] = [
  ["Mercedes Clase A 200", "María José", ""],
  ["Seat Leon Cupra", "", "Cáceres"],
  ["Mercedes CLA 45 AMG", "", "Barcelona"],
  ["Mercedes A45 AMG", "", "Asturias"],
  ["Hyundai I30N Performance", "", "Guadix"],
  ["BMW 118D", "", ""],
  ["Honda Civic Type R", "", "Madrid"],
  ["Audi A5 Sportback", "", "El Ejido"],
  ["Honda Civic Type R", "", "Madrid"],
  ["Mercedes-Benz C200", "", "Mallorca"],
  ["Mercedes A35 AMG Edition 1", "", "Almería"],
  ["BMW X6", "", "Almería"],
  ["VW Golf GTI 8", "", "Madrid"],
  ["BMW Serie 1 120I", "", "Almería"],
  ["VW Golf TCR", "", ""],
  ["Honda Civic Type R", "", ""],
  ["Mercedes-Benz A35 AMG", "", ""],
  ["Audi S3 Sportback", "", "Badajoz"],
  ["VW Golf 7.5 GTI", "", ""],
  ["Audi RS3", "", "Huelva"],
  ["Yamaha R1", "", "Valencia"],
  ["Land Rover Evoque", "", ""],
  ["Honda Civic Type R GT", "", ""],
  ["Mercedes C63 AMG", "", "Lugo"],
  ["Porsche Macan S", "", "Granada"],
  ["Audi RS Q3 Sportback", "", "Guadix"],
  ["BMW 435I", "", "Cáceres"],
  ["BMW M3 Competition", "", ""],
  ["BMW 435I Grancoupe", "", "Úbeda"],
  ["Hyundai I30 N Performance", "", "Asturias"],
  ["Honda Civic Type R GT", "", "A Coruña"],
  ["VW Golf 7.5 GTI Performance", "", ""],
  ["Jeep Wrangler Rubicon", "", "Cádiz"],
  ["Honda Civic Type R", "", "Valladolid"],
  ["BMW M2", "", ""],
  ["Volkswagen Golf 7.5 GTI", "", "Granada"],
  ["BMW X5 40I", "", ""],
  ["Audi A1", "", ""],
  ["BMW 218D", "", ""],
  ["Honda Civic Type R", "", ""],
  ["Audi A3", "", ""],
  ["VW Golf 8 GTI Clubsport 45 Aniversario", "", ""],
  ["Mercedes GLC 300E", "", "Madrid"],
  ["Honda Civic Type R", "", ""],
  ["Mercedes AMG A 45", "", "Asturias"],
  ["BMW M4 Competition", "", ""],
  ["Honda Civic Type R", "", "Sevilla"],
  ["BMW Serie 1 125I", "", "Guadix"],
  ["Audi S3 Sportback Quattro", "", "Málaga"],
  ["BMW X6 M50D", "", ""],
  ["BMW Serie 1 118D", "", "Málaga"],
  ["Mercedes-Benz C220 Coupe", "", "Guadix"],
  ["Mercedes-Benz CLA 220 AMG Edition 1", "", ""],
  ["BMW X6 M50D", "", "Huelva"],
  ["BMW X6", "", "Granada"],
  ["VW Golf GTI", "", "Huelva"],
  ["BMW X6", "", ""],
  ["VW Golf GTI", "", ""],
  ["Peugeot 308 GTI 1.6 272CV", "", "Cádiz"],
  ["Audi A3 Cabrio", "", "Benidorm"],
  ["Smart", "", "Roquetas"],
  ["Ford Focus RS", "", "Murcia"],
  ["Hyundai I30N Performance", "", ""],
  ["Ford Focus RS Pack Performance", "", "Asturias"],
  ["Seat Leon Cupra", "", ""],
  ["Hyundai I30N Performance", "", "Murcia"],
  ["VW Golf GTD", "", "Granada"],
  ["BMW 320D", "", "Granada"],
  ["Audi A3 Sportback", "", ""],
  ["BMW 320D", "", ""],
  ["Audi A3 Sportback", "", "Sanlúcar"],
  ["Mini Cooper SD 170CV", "", ""],
  ["Audi A5 Sportback", "", "Mallorca"],
  ["Ford Fiesta St", "", ""],
  ["BMW 218D Paquete M", "", ""],
  ["BMW X1 25D Paquete M", "", ""],
  ["Seat León Cupra 290CV", "", "Lleida"],
  ["Volkswagen Golf GTD", "", ""],
  ["Volkswagen Tiguan R-Line 190CV", "", "Cádiz"],
  ["BMW M3", "", "Granada"],
  ["Honda Civic Type R", "", "Almería"],
  ["Mercedes-Benz A45 AMG 4MATIC", "", ""],
  ["Ford Focus RS", "", "Almería"],
  ["Volkswagen Golf 7.5 GTD", "", "Sevilla"],
  ["Renault Twingo RS", "", ""],
  ["Mini Cooper S", "", ""],
  ["Volkswagen Golf R 300", "", "Castellón"],
  ["Volkswagen Golf 7.5 2.0 TDI R-Line", "", "Badajoz"],
  ["Audi RS3 TFSI Quattro", "", "Madrid"],
  ["Audi S3 Sportback", "", ""],
  ["Ford Focus RS", "", "Roquetas"],
  ["Ford Focus RS", "", ""],
];

type Category = "mercedes" | "deportivos" | "bmw";

const categoryOf = (model: string): Category => {
  const s = model.toLowerCase();
  if (/(mercedes|cla|amg|c63|c ?200|c ?220|a35|a45|clase a)/.test(s)) return "mercedes";
  if (/(bmw|audi|porsche|land rover|evoque|jeep|mini|tiguan|serie)/.test(s)) return "bmw";
  return "deportivos";
};

const captionOf = (model: string, customer: string, location: string, i: number): string => {
  if (i === 0) {
    return "Este Clase A 200 fue de los más demandados desde que subimos la primera foto. ¡Enhorabuena María José y a disfrutarlo!";
  }
  const dest = location ? ` rumbo a ${location}` : "";
  const loc = location ? ` en ${location}` : "";
  const templates = [
    `Nueva entrega MDG: ${model}${customer ? ` para ${customer}` : ""}${dest}. ¡Enhorabuena y a disfrutarlo!`,
    `${customer ? `${customer} ya conduce` : "Ya rueda"} su ${model}${loc}, con la confianza y la garantía MDG.`,
    `Entregado con ilusión: ${model}${customer ? ` a ${customer}` : ""}${dest}. Gracias por confiar en MDG Car Center.`,
    `Otro sueño cumplido: ${model}${customer ? ` a ${customer}` : ""}${loc}. Kilómetros que merecen la pena por el coche perfecto.`,
  ];
  return templates[i % templates.length];
};

type Delivery = {
  id: string;
  model: string;
  customer: string;
  location: string;
  category: Category;
  image: string;
  quote: string;
  featured: boolean;
  rating?: string;
};

const deliveries: Delivery[] = RAW.map(([model, customer, location], i) => ({
  id: String(i + 1),
  model,
  customer,
  location,
  category: categoryOf(model),
  image: `/deliveries/${i + 1}.jpg`,
  quote: captionOf(model, customer, location, i),
  featured: i === 0,
  rating: i === 0 ? "5.0" : undefined,
}));

const categories = [
  { key: "all", label: "Todas las Entregas" },
  { key: "mercedes", label: "Mercedes-AMG" },
  { key: "deportivos", label: "Deportivos (Cupra / i30N)" },
  { key: "bmw", label: "BMW & Premium" },
] as const;

const PAGE = 9;

// Matches the used-vehicle card effect exactly
const cardGlow =
  "shadow-[0_6px_18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-[#ffff00] hover:-translate-y-2 hover:shadow-[0_16px_32px_-6px_rgba(255,255,0,0.2)] transition-all duration-500";

const onImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
  e.currentTarget.src = "/placeholder.svg";
};

// --- Geographic projection (equirectangular, longitude compressed by cos(lat)) ---
const VB_W = 820;
const VB_H = 690;
const LON_MIN = -9.4;
const LAT_MAX = 43.95;
const COS_LAT = 0.77;
const GEO_SCALE = 74;
const GEO_PAD = 40;
const project = (lon: number, lat: number): [number, number] => [
  GEO_PAD + (lon - LON_MIN) * COS_LAT * GEO_SCALE,
  GEO_PAD + (LAT_MAX - lat) * GEO_SCALE,
];

// Accurate simplified mainland border [lon, lat], clockwise from the NW (Galicia).
// Derived from real coastline / Spain–Portugal border coordinates.
const SPAIN_LONLAT: [number, number][] = [
  // North (Cantabrian) coast, W → E
  [-8.40, 43.37], [-7.69, 43.79], [-6.55, 43.55], [-5.85, 43.66], [-4.50, 43.42],
  [-3.80, 43.46], [-2.92, 43.40], [-1.98, 43.32], [-1.79, 43.36],
  // France border through the Pyrenees to the Mediterranean
  [-0.30, 42.85], [0.66, 42.70], [1.45, 42.60], [3.17, 42.44],
  // East (Mediterranean) coast, N → S
  [2.16, 41.38], [0.87, 40.72], [0.05, 40.10], [-0.33, 39.46], [0.22, 38.73],
  [-0.48, 38.34], [-0.72, 37.63], [-1.62, 37.35],
  // South coast, E → W
  [-2.19, 36.72], [-3.10, 36.75], [-4.42, 36.72], [-5.00, 36.42], [-5.36, 36.15],
  [-5.61, 36.01], [-6.04, 36.18], [-6.29, 36.53], [-6.35, 36.80], [-6.95, 37.20], [-7.41, 37.17],
  // Spain–Portugal border, S → N
  [-7.25, 37.80], [-7.10, 38.20], [-6.95, 38.90], [-7.03, 39.60], [-6.86, 40.27],
  [-6.80, 41.00], [-6.52, 41.65], [-6.90, 41.95], [-8.20, 42.05], [-8.87, 41.92],
  // Galician Atlantic coast, S → N back to start
  [-8.85, 42.28], [-9.05, 42.62], [-9.28, 42.92], [-9.18, 43.20],
];
// Project the boundary, then expand it slightly outward from its centroid so
// coastal pins (Málaga, Almería, Valencia, Barcelona…) sit inside the outline.
const _spainPts = SPAIN_LONLAT.map((p) => project(p[0], p[1]));
const _spainCx = _spainPts.reduce((a, p) => a + p[0], 0) / _spainPts.length;
const _spainCy = _spainPts.reduce((a, p) => a + p[1], 0) / _spainPts.length;
const _SPAIN_BUFFER = 1.07;
const SPAIN_PATH =
  _spainPts
    .map(([x, y], i) => {
      const bx = _spainCx + (x - _spainCx) * _SPAIN_BUFFER;
      const by = _spainCy + (y - _spainCy) * _SPAIN_BUFFER;
      return `${i === 0 ? "M" : "L"}${bx.toFixed(1)} ${by.toFixed(1)}`;
    })
    .join(" ") + " Z";

// Delivery hubs with real coordinates — projected to % over the SVG
const HUB_COORDS: { city: string; lon: number; lat: number; island?: boolean }[] = [
  { city: "Asturias", lon: -5.85, lat: 43.36 },
  { city: "Barcelona", lon: 2.17, lat: 41.39 },
  { city: "Madrid", lon: -3.70, lat: 40.42 },
  { city: "Cáceres", lon: -6.37, lat: 39.47 },
  { city: "Valencia", lon: -0.38, lat: 39.47 },
  { city: "Badajoz", lon: -6.97, lat: 38.88 },
  { city: "Murcia", lon: -1.13, lat: 37.99 },
  { city: "Huelva", lon: -6.94, lat: 37.26 },
  { city: "Sevilla", lon: -5.98, lat: 37.39 },
  { city: "Guadix", lon: -3.13, lat: 37.30 },
  { city: "Granada", lon: -3.60, lat: 37.18 },
  { city: "Cádiz", lon: -6.29, lat: 36.53 },
  { city: "Málaga", lon: -4.42, lat: 36.72 },
  { city: "Almería", lon: -2.46, lat: 36.84 },
  { city: "Mallorca", lon: 2.65, lat: 39.57, island: true },
];
const HUBS = HUB_COORDS.map((h) => {
  const [x, y] = project(h.lon, h.lat);
  return { city: h.city, x: +((x / VB_W) * 100).toFixed(2), y: +((y / VB_H) * 100).toFixed(2), island: !!h.island };
});

const cityDeliveries = (city: string) => deliveries.filter((d) => d.location === city);

const DeliveryCard = ({ d }: { d: Delivery }) => (
  <div className={`group flex flex-col bg-[#161618] border border-[#27272A] rounded-2xl overflow-hidden ${cardGlow}`}>
    <div className="relative overflow-hidden">
      <img
        src={d.image}
        onError={onImgError}
        loading="lazy"
        alt={`Entrega ${d.model}${d.customer ? ` — ${d.customer}` : ""}`}
        className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {d.location && (
        <span className="absolute top-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[11px] font-medium">
          <MapPin className="w-3 h-3 text-[#ffff00]" /> {d.location}
        </span>
      )}
    </div>
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-[#ffff00] font-bold text-lg mb-1">{d.model}</h3>
      {d.customer && <p className="text-white/85 text-xs mb-3">Entregado a {d.customer}</p>}
      <p className="text-[#D4D4D8] text-sm leading-relaxed mb-5 flex-1">{d.quote}</p>
      <div className="flex items-center gap-1.5 pt-3 border-t border-[#27272A] text-xs font-semibold text-[#ffff00]">
        <CheckCircle2 className="w-4 h-4" /> Entregado con Garantía MDG
      </div>
    </div>
  </div>
);

const About = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeCat, setActiveCat] = useState<string>("all");
  const [visibleCount, setVisibleCount] = useState(PAGE);

  const filtered =
    activeCat === "all" ? deliveries : deliveries.filter((d) => d.category === activeCat);
  const featured = filtered.find((d) => d.featured);
  const rest = filtered.filter((d) => d !== featured);
  const visibleRest = rest.slice(0, visibleCount);

  const selectCat = (key: string) => {
    setActiveCat(key);
    setVisibleCount(PAGE);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <Header />

      {/* Hero — dark */}
      <section className="relative overflow-hidden border-b border-[#27272A]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,0,0.06)_0%,transparent_60%)]" />
        <div className="container mx-auto max-w-6xl px-4 py-24 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#161618] border border-[#ffff00]/40 text-[#ffff00] text-xs tracking-[0.25em] uppercase mb-6 font-semibold">
              Quiénes somos
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-semibold text-white mb-6 leading-tight">
              Sobre <span className="text-[#ffff00]">MDG Car Center</span>
            </h1>
            <p className="text-[#D4D4D8] max-w-xl mx-auto text-lg">
              Una empresa joven y dinámica, apasionada por los coches y comprometida con la satisfacción de cada cliente.
            </p>
          </div>
        </div>
      </section>

      {/* Showroom cards */}
      <section className="pt-14 pb-0 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4">
            {[
              { img: nosotros1, label: "Nuestro stock" },
              { img: nosotros2, label: "Showroom en Purullena" },
            ].map((item, i) => (
              <div
                key={i}
                className={`relative group overflow-hidden rounded-2xl bg-[#161618] border border-[#27272A] ${cardGlow}`}
              >
                <img
                  src={item.img}
                  alt={`MDG Car Center — ${item.label}`}
                  className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="inline-block px-3 py-1 bg-[#ffff00] text-black font-semibold text-xs rounded-full">
                    {item.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story + Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
            {/* Story */}
            <div className="lg:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161618] border border-[#27272A] rounded-full text-[#ffff00] text-xs font-semibold mb-2">
                <Car className="w-3.5 h-3.5" /> Nuestra historia
              </div>
              {[
                "MDG Car Center es una empresa joven y dinámica, apasionada por nuestro trabajo. Hace tiempo que nos dedicamos a comprar y vender coches, y por fin dimos el salto para tener un espacio donde poder exponer nuestros vehículos.",
                "Nos especializamos en la compra, venta e importación de vehículos nacionales e importados, realizando una completa inspección de calidad a todos nuestros coches antes de adquirirlos.",
                "Si no lo tienes muy claro, contamos con personal especializado que te aconsejará qué vehículo se adapta mejor a tus necesidades y a tu presupuesto.",
                "¿Buscas el coche de tus sueños? Nosotros te ayudamos. Y si quieres cualquier tipo de personalización, te la hacemos con el toque MDG.",
                "Todos nuestros vehículos incluyen 12 meses de garantía MDG, financiación a medida y la posibilidad de entrega a domicilio en toda España.",
                "En MDG Car Center, cada cliente es lo más importante: nuestro objetivo es que tu experiencia con nosotros sea un éxito de principio a fin.",
              ].map((text, i) => (
                <p
                  key={i}
                  className="text-[#D4D4D8] leading-relaxed border-l-2 border-transparent hover:border-[#ffff00] hover:pl-3 transition-all duration-300"
                >
                  {text}
                </p>
              ))}
            </div>

            {/* Quote card */}
            <div className="lg:col-span-2 space-y-4 lg:sticky lg:top-24">
              <div className={`relative bg-[#161618]/80 backdrop-blur-xl border border-[#27272A] rounded-2xl p-8 overflow-hidden ${cardGlow}`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ffff00]/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#ffff00]/10 rounded-full blur-2xl" />

                <div className="w-11 h-11 rounded-full bg-[#ffff00] flex items-center justify-center mb-4 shadow-[0_0_18px_rgba(255,255,0,0.5)] relative z-10">
                  <Quote className="w-5 h-5 text-black" />
                </div>
                <p className="text-white/90 text-lg leading-relaxed italic relative z-10">
                  "Te damos nuestra más cordial bienvenida. Ven a visitarnos y déjanos ayudarte a encontrar el coche de tus sueños."
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#ffff00] flex items-center justify-center text-black font-bold text-sm">
                    MDG
                  </div>
                  <div>
                    <p className="font-semibold text-white">Equipo MDG</p>
                    <p className="text-[#D4D4D8] text-xs">MDG Car Center · Purullena, Granada</p>
                  </div>
                </div>
              </div>

              {/* Stats grid */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s, i) => {
                  const Icon = s.icon;
                  return (
                    <div
                      key={i}
                      className={`bg-[#161618] border border-[#27272A] rounded-xl p-4 text-center group ${cardGlow}`}
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#ffff00] flex items-center justify-center mx-auto mb-2">
                        <Icon className="w-4 h-4 text-black" />
                      </div>
                      <div className="text-2xl font-bold text-white">{s.value}</div>
                      <div className="text-[#D4D4D8] text-xs mt-0.5">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SPAIN DELIVERY RADAR MAP */}
      <section className="relative py-20 px-4 border-t border-[#27272A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,0,0.05)_0%,transparent_65%)] pointer-events-none" />
        <div className="container mx-auto max-w-6xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#ffff00] text-sm tracking-[0.28em] uppercase mb-3 font-semibold">
              Mapa de Entregas MDG
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Entregamos ilusión en cada rincón de España
            </h2>
            <p className="text-[#D4D4D8] max-w-2xl mx-auto">
              Más de 75 vehículos entregados de norte a sur.
            </p>
          </div>

          {/* Radar map */}
          <div className="relative mx-auto w-full max-w-2xl" style={{ aspectRatio: "820 / 690" }}>
            <svg viewBox="0 0 820 690" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
              <defs>
                <radialGradient id="mdgMapGlow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="rgba(255,255,0,0.10)" />
                  <stop offset="100%" stopColor="rgba(255,255,0,0)" />
                </radialGradient>
              </defs>
              {/* radar rings + crosshair */}
              {[150, 260, 370].map((r) => (
                <circle key={r} cx="410" cy="345" r={r} fill="none" stroke="rgba(255,255,0,0.08)" strokeWidth="1" />
              ))}
              <line x1="410" y1="0" x2="410" y2="690" stroke="rgba(255,255,0,0.05)" />
              <line x1="0" y1="345" x2="820" y2="345" stroke="rgba(255,255,0,0.05)" />
              {/* Spain silhouette */}
              <path d={SPAIN_PATH} fill="#161618" stroke="rgba(255,255,0,0.35)" strokeWidth="2" strokeLinejoin="round" />
              <path d={SPAIN_PATH} fill="url(#mdgMapGlow)" />
            </svg>

            {/* Dots overlay */}
            {HUBS.map((h) => {
              const items = cityDeliveries(h.city);
              const rep = items[0];
              const active = selectedCity === h.city;
              return (
                <button
                  key={h.city}
                  onClick={() => setSelectedCity(active ? null : h.city)}
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 z-20"
                  aria-label={`Entregas en ${h.city}`}
                >
                  {/* ping */}
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-[#ffff00]/60 animate-ping" />
                  {/* dot */}
                  <span
                    className={`relative block rounded-full bg-[#ffff00] shadow-[0_0_12px_rgba(255,255,0,0.9)] transition-all duration-300 ${h.island ? "ring-1 ring-white/40" : ""} ${
                      active ? "w-4 h-4 ring-2 ring-[#ffff00]/60" : "w-3 h-3 group-hover:w-4 group-hover:h-4"
                    }`}
                  />
                  {/* count badge */}
                  {items.length > 0 && (
                    <span className="absolute -top-2.5 -right-3 min-w-[16px] h-4 px-1 rounded-full bg-black border border-[#ffff00]/60 text-[#ffff00] text-[9px] font-bold flex items-center justify-center leading-none">
                      {items.length}
                    </span>
                  )}
                  {/* tooltip */}
                  <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-44 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-30">
                    <div className="bg-[#0B0B0C]/90 backdrop-blur-md border border-[#ffff00]/30 rounded-xl overflow-hidden shadow-[0_10px_30px_-6px_rgba(0,0,0,0.85)]">
                      {rep && (
                        <img src={rep.image} onError={onImgError} className="w-full h-20 object-cover" alt={h.city} />
                      )}
                      <div className="p-2.5">
                        <p className="text-[#ffff00] text-xs font-bold truncate">{rep?.model ?? "Entregas"}</p>
                        <p className="text-white/90 text-[11px] flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {h.city} · {items.length} entrega{items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* label */}
                  <span
                    className={`absolute top-full left-1/2 -translate-x-1/2 mt-1.5 text-[10px] font-semibold whitespace-nowrap transition-colors ${
                      active ? "text-[#ffff00]" : "text-white/85 group-hover:text-white"
                    }`}
                  >
                    {h.city}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Click-to-filter tray */}
          <div className="mt-14">
            {selectedCity ? (
              <div key={selectedCity} style={{ animation: "mdgTrayUp 0.35s ease" }}>
                <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#ffff00]" />
                    Entregas en {selectedCity}
                    <span className="text-[#ffff00]">({cityDeliveries(selectedCity).length})</span>
                  </h3>
                  <button
                    onClick={() => setSelectedCity(null)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#ffff00] text-black text-sm font-bold hover:bg-[#e6e600] hover:shadow-[0_8px_24px_-4px_rgba(255,255,0,0.4)] transition-all duration-300"
                  >
                    [ Ver las 75 Entregas en España ]
                  </button>
                </div>
                {cityDeliveries(selectedCity).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cityDeliveries(selectedCity).map((d) => (
                      <DeliveryCard key={d.id} d={d} />
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-[#D4D4D8] text-sm py-8">
                    Aún no hay entregas registradas en {selectedCity}.
                  </p>
                )}
              </div>
            ) : (
              <p className="text-center text-[#D4D4D8] text-sm">
                Pulsa un punto del mapa para ver las entregas de esa zona, o explora todas más abajo.
              </p>
            )}
          </div>
        </div>
        <style>{`@keyframes mdgTrayUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </section>

      {/* CLUB DE ENTREGAS MDG */}
      <section className="relative py-20 px-4 border-t border-[#27272A] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,0,0.04)_0%,transparent_70%)] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <p className="text-[#ffff00] text-sm tracking-[0.28em] uppercase mb-3 font-semibold">
              Club de Entregas MDG
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Historias detrás de cada volante
            </h2>
            <p className="text-[#D4D4D8] max-w-2xl mx-auto leading-relaxed">
              Cada vehículo entregado es una nueva relación de confianza. Descubre las experiencias de nuestros clientes en toda España.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {categories.map((c) => {
              const count =
                c.key === "all"
                  ? deliveries.length
                  : deliveries.filter((d) => d.category === c.key).length;
              return (
                <button
                  key={c.key}
                  onClick={() => selectCat(c.key)}
                  className={`px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                    activeCat === c.key
                      ? "bg-[#ffff00] text-black border-[#ffff00] shadow-[0_0_18px_-2px_rgba(255,255,0,0.5)]"
                      : "bg-[#161618] text-white/90 border-[#27272A] hover:border-[#ffff00]/50 hover:text-white"
                  }`}
                >
                  {c.label}
                  <span className={`ml-2 text-xs ${activeCat === c.key ? "text-black/60" : "text-white/85"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Featured delivery */}
          {featured && (
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[#161618] border border-[#27272A] rounded-2xl overflow-hidden mb-8 ${cardGlow}`}
            >
              {/* Image */}
              <div className="relative overflow-hidden group min-h-[280px] lg:min-h-[420px]">
                <img
                  src={featured.image}
                  onError={onImgError}
                  alt={`Entrega ${featured.model} — ${featured.customer}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#161618]/40" />
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#ffff00] text-black text-xs font-bold uppercase tracking-wider">
                  Entrega destacada
                </span>
              </div>
              {/* Content */}
              <div className="p-8 lg:p-10 flex flex-col justify-center">
                <span className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-lg bg-white/5 border border-[#27272A] text-white font-semibold text-sm mb-4">
                  <Car className="w-4 h-4 text-[#ffff00]" />
                  {featured.model}
                </span>
                <span className="inline-flex w-fit items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffff00] text-black text-xs font-bold mb-5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Entregado a {featured.customer}
                </span>
                <p className="text-[#D4D4D8] text-lg leading-relaxed mb-6">{featured.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#ffff00]/10 border border-[#ffff00]/30">
                    <Star className="w-4 h-4 fill-[#ffff00] text-[#ffff00]" />
                    <span className="text-[#ffff00] font-bold text-sm">{featured.rating}</span>
                    <span className="text-white/85 text-xs">reseña verificada</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#D4D4D8] text-xs">
                    <MapPin className="w-3.5 h-3.5 text-[#ffff00]" /> {featured.location}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Deliveries grid */}
          {visibleRest.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleRest.map((d) => (
                <DeliveryCard key={d.id} d={d} />
              ))}
            </div>
          )}

          {/* Load more */}
          {visibleCount < rest.length && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount((c) => c + PAGE)}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border-2 border-[#27272A] text-white text-sm font-bold hover:bg-[#ffff00] hover:text-black hover:border-[#ffff00] hover:shadow-[0_8px_24px_-4px_rgba(255,255,0,0.4)] transition-all duration-300"
              >
                Cargar Más Entregas
                <span className="text-xs opacity-70">({rest.length - visibleCount})</span>
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
