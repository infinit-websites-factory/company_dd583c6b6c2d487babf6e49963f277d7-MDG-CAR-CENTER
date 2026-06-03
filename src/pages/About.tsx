import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Phone, Mail, Quote, Car, Star, Clock, Trophy } from "lucide-react";
import nosotros1 from "@/assets/nosotros1.jpg";
import nosotros2 from "@/assets/nosotros2.jpg";

const stats = [
  { icon: Trophy, value: "+30", label: "Años de experiencia", color: "from-amber-500 to-orange-600", bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700" },
  { icon: Car, value: "+500", label: "Vehículos vendidos", color: "from-blue-500 to-blue-700", bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700" },
  { icon: Star, value: "4.1★", label: "Valoración Google", color: "from-emerald-500 to-green-700", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700" },
  { icon: Clock, value: "24h", label: "Tiempo de respuesta", color: "from-violet-500 to-purple-700", bg: "bg-violet-50", border: "border-violet-200", text: "text-violet-700" },
];

const About = () => {
  const { getAddress } = useLanguage();
  const address = getAddress();

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero — dark gradient with diagonal cut */}
      <section className="relative bg-[#101318] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(59,130,246,0.15)_0%,transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_30%,rgba(139,92,246,0.1)_0%,transparent_60%)]" />
        <div className="container mx-auto max-w-6xl px-4 py-24 relative z-10">
          <div className="text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/60 text-xs tracking-[0.25em] uppercase mb-6">
              Quiénes somos
            </span>
            <h1 className="text-5xl md:text-7xl font-heading font-semibold text-white mb-6 leading-tight">
              Sobre <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-violet-400">Edition Cars</span>
            </h1>
            <p className="text-white/40 max-w-xl mx-auto text-lg">
              Una historia de pasión, dedicación y excelencia en el sector del automóvil desde los años 90.
            </p>
          </div>
        </div>
        {/* Diagonal bottom edge */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-white" style={{ clipPath: 'polygon(0 100%, 100% 0%, 100% 100%)' }} />
      </section>

      {/* Photos section */}
      <section className="pt-4 pb-0 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img
                src={nosotros1}
                alt="EDITION CARS showroom — Frank Torralbo"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs rounded-full">
                  Frank Torralbo — Showroom
                </span>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-2xl shadow-lg">
              <img
                src={nosotros2}
                alt="EDITION CARS oficina — Diego Vega"
                className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs rounded-full">
                  Diego Vega — Dirección
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story + Quote */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">

            {/* Story text */}
            <div className="lg:col-span-3 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-blue-700 text-xs font-medium mb-2">
                <Car className="w-3.5 h-3.5" /> Nuestra historia
              </div>
              {[
                "Frank Torralbo y Diego Vega son dos jóvenes empresarios que ya a principios de los 90's empiezan a destacar en el sector del automóvil.",
                "Tras una década de experiencia deciden unir sus esfuerzos y crear algo diferente cuyo único objetivo es la absoluta satisfacción de sus clientes.",
                "Es así como a principios del nuevo milenio surge Edition Cars.",
                "Dicho objetivo es hoy en día nuestro lema; y lo conseguimos a base de proporcionar a nuestros clientes el vehículo que mejor se adapta a sus deseos y necesidades.",
                "Amplia selección de vehículos con la máxima calidad al mejor precio, así como un servicio post-venta exclusivo: garantía en talleres propios, coche de sustitución, servicio integral de mantenimiento, etc.",
                "Edition Cars, aún siendo una empresa joven, goza ya de un reconocido prestigio en el sector, y cuenta con una extensa cartera de clientes fieles absolutamente satisfechos.",
              ].map((text, i) => (
                <p key={i} className="text-gray-600 leading-relaxed border-l-2 border-transparent hover:border-blue-400 hover:pl-3 transition-all duration-300">
                  {text}
                </p>
              ))}
            </div>

            {/* Quote card */}
            <div className="lg:col-span-2 space-y-4 sticky top-24">
              <div className="relative bg-gradient-to-br from-[#101318] to-gray-900 rounded-2xl p-8 shadow-2xl overflow-hidden">
                {/* Background glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-violet-500/10 rounded-full blur-2xl" />

                <Quote className="w-10 h-10 text-blue-400/30 mb-4" />
                <p className="text-white/80 text-lg leading-relaxed italic relative z-10">
                  "Desde aquí queremos darle nuestra más cordial bienvenida, esperando poder atenderle pronto como se merece!"
                </p>
                <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white font-bold text-sm">
                    F&D
                  </div>
                  <div>
                    <p className="font-semibold text-white">Frank & Diego</p>
                    <p className="text-white/40 text-xs">Fundadores de EDITION CARS</p>
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
                      className={`${s.bg} border ${s.border} rounded-xl p-4 text-center group hover:-translate-y-1 transition-all duration-300 hover:shadow-md`}
                    >
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-2`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className={`text-2xl font-bold ${s.text}`}>{s.value}</div>
                      <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact strip */}
      <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-heading font-semibold text-gray-900 mb-2">Encuéntranos</h2>
            <p className="text-gray-500">Estamos en El Prat de Llobregat, Barcelona</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              {
                icon: MapPin,
                label: "Dirección",
                content: "Carretera Ca l'Alaio, 3\nEl Prat de Llobregat\n08820 Barcelona",
                href: address.mapsUrl,
                grad: "from-blue-500 to-blue-700",
                bg: "hover:border-blue-300",
              },
              {
                icon: Phone,
                label: "Teléfono",
                content: "93 370 40 30\n610 20 21 00",
                href: "tel:+34933704030",
                grad: "from-emerald-500 to-green-700",
                bg: "hover:border-emerald-300",
              },
              {
                icon: Mail,
                label: "Email",
                content: "info@editioncars.es",
                href: "mailto:info@editioncars.es",
                grad: "from-violet-500 to-purple-700",
                bg: "hover:border-violet-300",
              },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className={`flex items-start gap-4 p-5 bg-white border border-gray-200 ${item.bg} rounded-2xl hover:shadow-lg transition-all duration-300 group`}
                >
                  <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.grad} flex items-center justify-center flex-shrink-0 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{item.label}</p>
                    {item.content.split("\n").map((line, j) => (
                      <p key={j} className="text-gray-700 text-sm font-medium">{line}</p>
                    ))}
                  </div>
                </a>
              );
            })}
          </div>

          {/* Map */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
            <iframe
              src={address.mapsEmbedUrl}
              width="100%"
              height="380"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="EDITION CARS ubicación"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
