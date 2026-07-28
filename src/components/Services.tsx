import { Truck, Shield, CreditCard, ArrowRight, CheckCircle2, Sparkles, Star, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Truck,
    accentIcon: Sparkles,
    tag: "A domicilio",
    shape: "rounded-tl-[2.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[2.5rem]",
  },
  {
    icon: Shield,
    accentIcon: Star,
    tag: "Garantizado",
    shape: "rounded-tl-[0.5rem] rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-br-[0.5rem]",
  },
  {
    icon: CreditCard,
    accentIcon: Zap,
    tag: "Flexible",
    shape: "rounded-tl-[2.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[2.5rem]",
  },
];

const Services = () => {
  const { t } = useLanguage();

  const serviceData = [
    {
      title: t('services.vip.title'),
      description: t('services.vip.description'),
      additionalInfo: t('services.vip.additional_info'),
    },
    {
      title: t('services.warranty.title'),
      description: t('services.warranty.description'),
      additionalInfo: t('services.warranty.additional_info'),
    },
    {
      title: t('services.financing.title'),
      description: t('services.financing.description'),
      additionalInfo: undefined,
    },
  ];

  return (
    <section className="py-24 px-4 bg-[#0B0B0C] relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#ffff00] rounded-full blur-3xl opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#ffff00] rounded-full blur-3xl opacity-[0.04] pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-[#D4D4D8] text-sm tracking-[0.25em] uppercase mb-3">Lo que ofrecemos</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-5">
            Nuestras <span className="text-[#ffff00]">garantías</span> MDG
          </h2>
          <p className="text-[#D4D4D8] max-w-xl mx-auto leading-relaxed">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceData.map((service, index) => {
            const cfg = services[index];
            const Icon = cfg.icon;
            const AccentIcon = cfg.accentIcon;

            return (
              <div
                key={index}
                className="mdg-feature-card group relative rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 cursor-default overflow-hidden"
              >
                {/* Top brand accent line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#ffff00] transition-all duration-500 group-hover:h-2.5" />

                {/* Floating accent icon top-right */}
                <div className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#ffff00]/10 border border-[#ffff00]/25 flex items-center justify-center opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">
                  <AccentIcon className="w-4 h-4 text-[#ffff00]" />
                </div>

                {/* Background circle decoration */}
                <div className="absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-[#ffff00] opacity-[0.05] group-hover:opacity-[0.1] group-hover:scale-110 transition-all duration-500" />

                {/* Tag */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#ffff00] text-black mb-6">
                  {cfg.tag}
                </span>

                {/* Icon — circular yellow badge */}
                <div className="relative w-16 h-16 bg-[#ffff00] rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-400">
                  <Icon className="w-8 h-8 text-black" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 leading-tight">
                  {service.title}
                </h3>

                {/* Divider */}
                <div className="w-10 h-1 bg-[#ffff00] rounded-full mb-4 group-hover:w-16 transition-all duration-500" />

                {/* Description */}
                <p className="text-[#D4D4D8] text-sm leading-relaxed mb-5 group-hover:text-white/90 transition-colors">
                  {service.description}
                </p>

                {/* Additional info */}
                {service.additionalInfo && (
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/5 border border-[#27272A]">
                    <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#ffff00]" />
                    <span className="text-white/85 text-xs italic leading-relaxed">{service.additionalInfo}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <a
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#ffff00] text-black text-sm font-bold rounded-xl hover:bg-[#e6e600] shadow-lg hover:shadow-[0_10px_28px_-4px_rgba(255,255,0,0.4)] transition-all duration-300 hover:-translate-y-0.5"
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
