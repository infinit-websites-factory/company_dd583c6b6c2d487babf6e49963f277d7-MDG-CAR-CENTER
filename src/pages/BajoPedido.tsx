import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import VehicleCard from "@/components/VehicleCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Sparkles, ArrowRight, ChevronRight } from "lucide-react";
import { fetchCars, transformApiCarToVehicle, type Vehicle } from "@/services/carsApi";

const VISIBLE = 8;

const BajoPedido = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["cars"],
    queryFn: () => fetchCars(),
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const vehicles: Vehicle[] = data
    ? [...data.items.map(transformApiCarToVehicle)]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, VISIBLE)
    : [];

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col">
      <Helmet>
        <title>Coches Bajo Pedido | MDG CAR CENTER</title>
        <meta name="description" content="Coches bajo pedido en MDG CAR CENTER: importamos, modificamos y preparamos el vehículo exacto que buscas. Todo con la garantía MDG." />
      </Helmet>
      <Header />

      <main className="flex-1">
        {/* Hero / intro */}
        <section className="relative py-16 px-4 overflow-hidden border-b border-[#27272A]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,0,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="container mx-auto max-w-3xl relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161618] border border-[#ffff00]/40 text-[#ffff00] text-sm font-semibold mb-5">
              <Sparkles className="w-4 h-4" />
              Bajo pedido
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
              Catálogo <span className="text-[#ffff00]">bajo pedido</span>
            </h1>
            <div className="w-16 h-1 bg-[#ffff00] mx-auto mb-6 rounded-full" />
            <p className="text-[#D4D4D8] leading-relaxed mb-4">
              Aquí encontrarás una selección de coches disponibles para encargo, adaptados a tus necesidades. Nos ocupamos de todo el proceso de importación, modificación y preparación para que compres exactamente el vehículo que buscas.
            </p>
            <p className="text-[#D4D4D8] leading-relaxed mb-8">
              Si no lo tienes claro, nuestro equipo te asesora para elegir el coche perfecto. Todo, con la garantía MDG.
            </p>
            <Link
              to="/presupuestos"
              className="group inline-flex items-center gap-2 px-8 py-3.5 bg-[#ffff00] text-black text-sm font-bold rounded-xl hover:bg-[#e6e600] hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_rgba(255,255,0,0.4)] transition-all duration-300"
            >
              Solicita tu coche a la carta
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <p className="text-white/80 text-xs mt-3">
              ¿Buscas algo más exclusivo y personalizado? Cuéntanos tu idea:{" "}
              <Link to="/presupuestos" className="text-[#ffff00] font-semibold underline hover:text-[#ffff00]/80">haz clic aquí</Link>.
            </p>
          </div>
        </section>

        {/* Vehicle selection */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="flex items-end justify-between mb-8 flex-wrap gap-3">
              <div>
                <p className="text-[#ffff00] text-sm tracking-[0.2em] uppercase mb-2 font-semibold">Disponibles</p>
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-white">Vehículos que puedes encargar</h2>
              </div>
              <Link to="/stock" className="inline-flex items-center gap-2 text-sm font-semibold text-white/90 hover:text-[#ffff00] transition-colors">
                Ver todo el catálogo <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            {isError ? (
              <div className="text-center py-16 text-[#D4D4D8]">
                No se pudieron cargar los vehículos en este momento.{" "}
                <Link to="/presupuestos" className="text-[#ffff00] underline">Solicita el tuyo a la carta</Link>.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, i) => (
                      <div key={i} className="space-y-3">
                        <Skeleton className="h-48 w-full rounded-lg bg-white/10" />
                        <Skeleton className="h-4 w-3/4 bg-white/10" />
                        <Skeleton className="h-4 w-1/2 bg-white/10" />
                      </div>
                    ))
                  : vehicles.map((v) => <VehicleCard key={v.id} {...v} />)}
              </div>
            )}

            {!isLoading && !isError && vehicles.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white text-lg mb-2">No hay resultados por el momento.</p>
                <p className="text-[#D4D4D8] mb-6">Dinos qué coche buscas y lo encontramos por ti.</p>
                <Link to="/presupuestos" className="inline-flex items-center gap-2 px-7 py-3 bg-[#ffff00] text-black text-sm font-bold rounded-xl hover:bg-[#e6e600] transition-colors">
                  Solicitar a la carta <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>

      <FAQ />

      <Footer />
    </div>
  );
};

export default BajoPedido;
