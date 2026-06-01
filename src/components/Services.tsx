import { Car, Shield, CreditCard, ArrowRight, CheckCircle2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const serviceThemes = [
  {
    gradient: "from-blue-900/60 via-blue-950/80 to-[#101318]",
    border: "border-blue-700/30",
    iconBg: "bg-blue-500/15 border-blue-500/30",
    iconColor: "text-blue-400",
    hoverBorder: "hover:border-blue-500/50",
    accentLine: "bg-blue-500",
    badge: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  },
  {
    gradient: "from-emerald-900/60 via-emerald-950/80 to-[#101318]",
    border: "border-emerald-700/30",
    iconBg: "bg-emerald-500/15 border-emerald-500/30",
    iconColor: "text-emerald-400",
    hoverBorder: "hover:border-emerald-500/50",
    accentLine: "bg-emerald-500",
    badge: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
  },
  {
    gradient: "from-violet-900/60 via-violet-950/80 to-[#101318]",
    border: "border-violet-700/30",
    iconBg: "bg-violet-500/15 border-violet-500/30",
    iconColor: "text-violet-400",
    hoverBorder: "hover:border-violet-500/50",
    accentLine: "bg-violet-500",
    badge: "bg-violet-500/10 text-violet-300 border-violet-500/20",
  },
];

const Services = () => {
  const { t } = useLanguage();

  const services = [
    {
      icon: Car,
      title: t('services.vip.title'),
      description: t('services.vip.description'),
      additionalInfo: t('services.vip.additional_info'),
      tag: "Exclusivo",
    },
    {
      icon: Shield,
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      additionalInfo: t('services.warranty.additional_info'),
      tag: "Garantizado",
    },
    {
      icon: CreditCard,
      title: t('services.financing.title'),
      description: t('services.financing.description'),
      additionalInfo: undefined,
      tag: "Flexible",
    }
  ];

  return (
    <section className="py-24 px-4 bg-[#0a0d11]">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-white/40 text-sm tracking-[0.2em] uppercase mb-3">Lo que ofrecemos</p>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-5">
            Nuestros servicios en EDITION CARS
          </h2>
          <p className="text-lg text-white/45 mx-auto max-w-2xl leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const theme = serviceThemes[index];
            return (
              <div
                key={index}
                className={`group relative border ${theme.border} ${theme.hoverBorder} rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-default`}
                style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.3)" }}
              >
                {/* Gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} transition-opacity duration-500`} />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${theme.accentLine} opacity-60`} />

                {/* Glow effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)" }}
                />

                <div className="relative z-10 p-8">
                  {/* Tag */}
                  <div className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium mb-6 ${theme.badge}`}>
                    {service.tag}
                  </div>

                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl border ${theme.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className={`w-7 h-7 ${theme.iconColor}`} />
                  </div>

                  <h3 className="text-xl font-heading font-semibold text-white mb-4 leading-tight">
                    {service.title}
                  </h3>

                  <p className="text-white/50 leading-relaxed mb-5 text-sm group-hover:text-white/65 transition-colors duration-300">
                    {service.description}
                  </p>

                  {service.additionalInfo && (
                    <div className={`flex items-start gap-2 text-xs border border-white/10 rounded-lg p-3 mt-4 bg-white/[0.03]`}>
                      <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${theme.iconColor}`} />
                      <span className="text-white/50 italic">{service.additionalInfo}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3 border border-white/20 text-white/70 text-sm rounded-lg hover:bg-white/5 hover:text-white hover:border-white/40 transition-all duration-200"
          >
            {t('common.more_information')}
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
