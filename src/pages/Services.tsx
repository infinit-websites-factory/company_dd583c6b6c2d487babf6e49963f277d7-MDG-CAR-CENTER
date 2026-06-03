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
    icon: Car,
    color: "blue",
    gradient: "from-blue-500/20 to-blue-600/5",
    border: "border-blue-500/30",
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    badgeBg: "bg-blue-500/10 text-blue-300",
    title: "Servicio VIP",
    description: "Nos encargamos de todo: recogida, entrega, limpieza y otras gestiones que necesites. Solo tendrás que preocuparte por ponerte al volante de tu nuevo vehículo.",
    features: ["Recogida a domicilio", "Entrega puerta a puerta", "Gestión completa de trámites"],
  },
  {
    icon: Shield,
    color: "emerald",
    gradient: "from-emerald-500/20 to-emerald-600/5",
    border: "border-emerald-500/30",
    iconBg: "bg-emerald-500/15",
    iconColor: "text-emerald-400",
    badgeBg: "bg-emerald-500/10 text-emerald-300",
    title: "Garantía Plus (hasta 3 años)",
    description: "Tu vehículo de ocasión con garantía de 12 meses ampliable a 3 años. Cobertura completa de motor, caja de cambios y componentes principales.",
    features: ["12 meses de garantía base", "Ampliable hasta 3 años", "Motor, cambio y electrónica"],
  },
  {
    icon: Truck,
    color: "amber",
    gradient: "from-amber-500/20 to-amber-600/5",
    border: "border-amber-500/30",
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    badgeBg: "bg-amber-500/10 text-amber-300",
    title: "Envío a toda España",
    description: "Transportamos tu vehículo en camión cerrado a cualquier punto de España. También gestionamos envíos internacionales a Europa bajo consulta.",
    features: ["Transporte en camión cerrado", "Seguro de transporte incluido", "Envíos internacionales"],
  },
  {
    icon: CreditCard,
    color: "violet",
    gradient: "from-violet-500/20 to-violet-600/5",
    border: "border-violet-500/30",
    iconBg: "bg-violet-500/15",
    iconColor: "text-violet-400",
    badgeBg: "bg-violet-500/10 text-violet-300",
    title: "Financiación personalizada",
    description: "Trabajamos con los mejores bancos para ofrecerte opciones de financiación que se adapten a ti. Desde 12 hasta 96 meses con o sin entrada.",
    features: ["Desde 12 hasta 96 meses", "Con o sin entrada inicial", "Aprobación en 24 horas"],
  }
];

const Services = () => {
  const { getCityName, t } = useLanguage();
  const cityName = getCityName();

  return (
    <div className="min-h-screen bg-white">
      <SEO page="services" />
      <Header />

      {/* Hero Section — clean dark background, no image */}
      <section className="bg-[#101318] py-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full text-white/60 text-sm mb-6">
            <Wrench className="w-4 h-4" />
            <span>Nuestros servicios</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
            Servicios Premium para tu Vehículo
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed">
            Más de una década ofreciendo la mejor experiencia de compra-venta de vehículos premium en {cityName}.
          </p>
        </div>
      </section>

      {/* Main Services — with background image */}
      <section
        className="relative py-24 px-4"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/85 to-black/90" />
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Todo lo que necesitas en un solo lugar
            </h2>
            <p className="text-white/50 max-w-xl mx-auto">
              Descubre la gama completa de servicios que EDITION CARS pone a tu disposición.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={index}
                  className={`group relative border ${service.border} bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-2xl p-7 hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-black/30 rounded-2xl" />
                  <div className="relative z-10">
                    <div className={`w-14 h-14 ${service.iconBg} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-7 h-7 ${service.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3 leading-tight">{service.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed mb-5">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                          <CheckCircle2 className={`w-3.5 h-3.5 flex-shrink-0 ${service.iconColor}`} />
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
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[480px]">
            {/* Image */}
            <div className="relative h-[300px] lg:h-auto overflow-hidden">
              <img
                src={servicios2Image}
                alt="Vende tu coche"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20 lg:bg-gradient-to-r lg:from-transparent lg:to-white/20" />
            </div>
            {/* Content */}
            <div className="bg-gray-50 flex items-center border-l border-gray-200">
              <div className="px-8 py-16 lg:px-14 lg:py-20 space-y-7">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-900/5 border border-gray-900/10 text-gray-700 text-sm font-medium">
                  <Car className="w-4 h-4" />
                  <span>¿Quieres vender tu coche?</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Vendemos tu vehículo al mejor precio
                </h2>
                <p className="text-gray-500 leading-relaxed">
                  Tasación gratuita y sin compromiso en 24 horas. Nos encargamos de toda la gestión para que tú no tengas que preocuparte de nada.
                </p>
                <ul className="space-y-3">
                  {["Valoración gratuita en 24h", "Proceso rápido y seguro", "Pago inmediato"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/sell"
                  className="inline-flex items-center gap-2 px-7 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors"
                >
                  Tasar mi vehículo gratis
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-gray-900 py-12">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "+500", label: "Vehículos vendidos" },
              { value: "4.1★", label: "Valoración Google" },
              { value: "+15", label: "Años de experiencia" },
              { value: "24h", label: "Tiempo de respuesta" },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-white py-16 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            ¿Tienes alguna pregunta sobre nuestros servicios?
          </h2>
          <p className="text-gray-500 mb-8">Nuestro equipo está disponible para ayudarte de lunes a sábado.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+34933704030" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-black transition-colors">
              <Phone className="w-4 h-4" />
              93 370 40 30
            </a>
            <a href="/contact" className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg hover:bg-gray-50 transition-colors">
              Enviar mensaje
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      <div className="bg-white">
        <FAQ />
      </div>

      <Footer />
    </div>
  );
};

export default Services;
