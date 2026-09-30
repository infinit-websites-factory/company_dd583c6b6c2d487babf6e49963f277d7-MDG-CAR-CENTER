import { useEffect, useRef, useState } from "react";
import { Car, Shield, CreditCard, Truck, ArrowRight, CheckCircle2, Star, Wrench, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import heroImage from "@/assets/servicios-hero.png";
import servicios2Image from "@/assets/img3.jpg";

const mainServices = [
  {
    icon: Star,
    tag: "A la carta",
    title: "Importación y personalización",
    description: "Buscamos, importamos y personalizamos el coche de tus sueños. Si quieres cualquier tipo de customización, te la hacemos con el toque MDG.",
    features: ["Búsqueda a medida", "Importación de vehículos", "Personalización a tu gusto"],
  },
  {
    icon: Shield,
    tag: "Garantizado",
    title: "Garantía de 1 año",
    description: "Todos nuestros vehículos incluyen 12 meses de garantía MDG y se entregan revisados para que compres con total tranquilidad.",
    features: ["12 meses de garantía MDG", "Cobertura conforme a la ley", "Vehículos revisados"],
  },
  {
    icon: Truck,
    tag: "Sin salir de casa",
    title: "Entrega a domicilio",
    description: "Si no puedes venir a recogerlo, no te preocupes. Llevamos tu vehículo hasta la puerta de tu casa, a cualquier punto de España.",
    features: ["Entrega en toda España", "Coordinamos la entrega contigo", "Recíbelo en tu domicilio"],
  },
  {
    icon: CreditCard,
    tag: "Flexible",
    title: "Financiación a medida",
    description: "Benefíciate de una financiación a tu medida. Trabajamos con distintas entidades para adaptarnos a ti y a tu presupuesto.",
    features: ["Cuotas a tu medida", "Trato personalizado", "Trabajamos con varias entidades"],
  }
];

const Services = () => {
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();

  // Scroll-reveal for the "Sell your vehicle" card content
  const sellRef = useRef<HTMLDivElement>(null);
  const [sellInView, setSellInView] = useState(false);
  useEffect(() => {
    const el = sellRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSellInView(true);
          obs.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <SEO page="services" />
      <Header />

      {/* Hero Section — background image with dark overlay, centered premium text */}
      <section className="relative py-28 md:py-36 px-4 overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImage} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/85" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(255,255,0,0.10)_0%,transparent_60%)]" />
        </div>
        <div className="relative z-10 container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#ffff00]/15 border border-[#ffff00]/40 rounded-full text-[#ffff00] text-sm mb-6 backdrop-blur-sm">
            <Wrench className="w-4 h-4" />
            <span className="tracking-wide uppercase font-semibold">Nuestros servicios</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight drop-shadow-xl">
            Todo con nuestras <span className="text-[#ffff00]">garantías MDG</span>
          </h1>
          <div className="w-16 h-1 bg-[#ffff00] mx-auto mb-6 rounded-full" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed drop-shadow">
            Compra, venta e importación de vehículos a la carta, con entrega a domicilio y financiación a medida en {cityName}, Granada.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="relative py-24 px-4 bg-[#0B0B0C] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,0,0.04)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-14">
            <p className="inline-block px-3 py-1 rounded-full bg-[#161618] border border-[#ffff00]/40 text-[#ffff00] text-xs tracking-[0.25em] uppercase mb-4 font-semibold">Lo que ofrecemos</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-[#D4D4D8] max-w-xl mx-auto">
              Descubre la gama completa de servicios que MDG CAR CENTER pone a tu disposición.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className="group relative border border-[#27272A] hover:border-[#ffff00] bg-[#161618] rounded-2xl p-7 pt-9 shadow-[0_6px_18px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.04)] hover:shadow-[0_18px_38px_-6px_rgba(255,255,0,0.2)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                  {/* top brand accent line */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ffff00] transition-all duration-500 group-hover:h-2.5" />
                  {/* floating pill top-right */}
                  <span className="absolute top-4 right-4 z-10 inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0B0B0C]/80 backdrop-blur-sm border border-[#27272A] text-[#ffff00]">
                    {service.tag}
                  </span>
                  {/* decorative corner circle */}
                  <div className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#ffff00] opacity-[0.06] group-hover:opacity-[0.12] group-hover:scale-110 transition-all duration-500" />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-full bg-[#ffff00] flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-all duration-400">
                      <IconComponent className="w-7 h-7 text-black" />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight">{service.title}</h3>
                    <p className="text-[#D4D4D8] text-sm leading-relaxed mb-5">{service.description}</p>
                    <ul className="space-y-2 pt-4 border-t border-[#27272A]">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-white/90">
                          <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0 text-[#ffff00]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sell Your Car Section */}
      <section className="relative bg-[#0B0B0C] py-20 px-4 overflow-hidden">
        {/* ambient glow blobs */}
        <div className="mdg-pulse absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-[#ffff00]/10 blur-3xl pointer-events-none" />
        <div className="mdg-pulse absolute bottom-1/4 -right-24 w-72 h-72 rounded-full bg-[#ffff00]/[0.06] blur-3xl pointer-events-none" style={{ animationDelay: "-3s" }} />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="mdg-feature-card group grid grid-cols-1 lg:grid-cols-2 min-h-[440px] rounded-3xl overflow-hidden transition-all duration-500">
            {/* Image */}
            <div className="relative h-[300px] lg:h-auto p-4 [perspective:1200px]">
              {/* idle float wrapper (pauses on hover) */}
              <div className="mdg-float w-full h-full min-h-[260px] group-hover:[animation-play-state:paused]">
                {/* pop-up frame on hover */}
                <div
                  className="relative w-full h-full overflow-hidden rounded-2xl will-change-transform group-hover:-translate-y-2.5 group-hover:scale-[1.03] group-hover:shadow-[0_28px_55px_-12px_rgba(0,0,0,0.85)]"
                  style={{ transition: "transform 0.5s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.5s ease" }}
                >
                  <img
                    src={servicios2Image}
                    alt="Vende tu coche"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161618]/70 via-transparent to-transparent" />
                  {/* yellow sheen from the bottom-left on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_at_0%_100%,rgba(255,255,0,0.12)_0%,transparent_55%)]" />
                  {/* yellow outline flash on hover */}
                  <div className="absolute inset-0 rounded-2xl ring-0 ring-[#ffff00]/0 group-hover:ring-2 group-hover:ring-[#ffff00]/40 transition-all duration-500" />
                  <div className="absolute inset-0 rounded-2xl shadow-[inset_0_0_60px_rgba(0,0,0,0.6)]" />
                </div>
              </div>
            </div>
            {/* Content */}
            <div className="flex items-center">
              <div
                ref={sellRef}
                className={`px-8 py-14 lg:px-14 lg:py-20 space-y-7 transition-all duration-700 ease-out ${sellInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0B0B0C]/70 backdrop-blur-md border border-[#ffff00]/30 text-[#ffff00] text-sm font-medium">
                  <Car className="w-4 h-4" />
                  <span>¿Quieres vender tu coche?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  Vendemos tu vehículo al mejor precio
                </h2>
                <p className="text-[#D4D4D8] leading-relaxed">
                  Tasación gratuita y sin compromiso. Nos encargamos de toda la gestión para que tú no tengas que preocuparte de nada.
                </p>
                <ul className="flex flex-wrap gap-2.5">
                  {["Valoración gratuita y sin compromiso", "Proceso rápido y seguro", "Entrega y recogida en toda España"].map((f, i) => (
                    <li
                      key={i}
                      className={`group/item inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-[#27272A] text-white/85 text-xs font-medium transition-all duration-500 ease-out hover:border-[#ffff00]/50 hover:bg-[#ffff00]/[0.06] ${sellInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                      style={{ transitionDelay: sellInView ? `${0.2 + i * 0.1}s` : "0s" }}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#ffff00] flex-shrink-0 transition-all duration-300 group-hover/item:scale-110 group-hover/item:drop-shadow-[0_0_6px_rgba(255,255,0,0.6)]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/sell"
                  className="mdg-sweep group/cta relative inline-flex items-center gap-2 px-7 py-3.5 bg-[#ffff00] text-black text-sm font-bold rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(255,255,0,0.4)]"
                >
                  <span className="relative z-10">Tasar mi vehículo gratis</span>
                  <ArrowRight className="relative z-10 w-4 h-4 transition-transform duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover/cta:translate-x-[6px]" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <style>{`
          .mdg-sweep::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(45deg, transparent 20%, rgba(255,255,255,0.4) 50%, transparent 80%);
            transform: translateX(-160%);
            animation: mdgSweep 3.5s ease-in-out infinite;
            pointer-events: none;
            z-index: 5;
          }
          @keyframes mdgSweep {
            0% { transform: translateX(-160%); }
            100% { transform: translateX(160%); }
          }
          .mdg-float { animation: mdgFloat 5s ease-in-out infinite; }
          @keyframes mdgFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          .mdg-pulse { animation: mdgPulse 6s ease-in-out infinite; }
          @keyframes mdgPulse {
            0%, 100% { opacity: 0.5; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.15); }
          }
          @media (prefers-reduced-motion: reduce) {
            .mdg-float, .mdg-pulse { animation: none; }
            .mdg-sweep::after { animation: none; }
          }
        `}</style>
      </section>

      {/* Stats bar */}
      <section className="bg-[#121214] py-12 border-y border-[#27272A]">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "5.0★", label: "Valoración Google" },
              { value: "12", label: "Meses de garantía" },
              { value: "Toda España", label: "Entrega a domicilio" },
              { value: "24h", label: "Tiempo de respuesta" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-[#ffff00] mb-1">{stat.value}</div>
                <div className="text-white/90 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-[#0B0B0C] py-16 px-4 border-t border-[#27272A]">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            ¿Tienes alguna pregunta sobre nuestros servicios?
          </h2>
          <p className="text-[#D4D4D8] mb-8">Nuestro equipo está disponible para ayudarte de lunes a viernes de 10:00 a 20:00.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+34633406310" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#161618] border border-[#ffff00]/50 text-[#ffff00] text-sm font-bold rounded-lg hover:border-[#ffff00] hover:shadow-[0_0_15px_rgba(255,255,0,0.25)] transition-all duration-300">
              <Phone className="w-4 h-4" />
              +34 633 40 63 10
            </a>
            <a href="/contact" className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#ffff00] text-black text-sm font-bold rounded-lg hover:bg-[#e6e600] hover:shadow-[0_8px_24px_-4px_rgba(255,255,0,0.4)] transition-all duration-300">
              Enviar mensaje
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />
    </div>
  );
};

export default Services;
