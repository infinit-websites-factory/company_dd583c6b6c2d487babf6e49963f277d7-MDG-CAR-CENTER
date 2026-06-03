import { Car, Shield, CreditCard, ArrowRight, CheckCircle2, Sparkles, Star, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const services = [
  {
    icon: Car,
    accentIcon: Sparkles,
    tag: "Exclusivo",
    gradient: "from-blue-600 via-blue-500 to-cyan-400",
    glow: "shadow-blue-200",
    tagBg: "bg-blue-100 text-blue-700",
    iconBg: "bg-blue-600",
    border: "border-blue-100",
    hoverBorder: "hover:border-blue-300",
    textAccent: "text-blue-600",
    checkColor: "text-blue-500",
    bgFrom: "from-blue-50",
    shape: "rounded-tl-[2.5rem] rounded-tr-[0.5rem] rounded-bl-[0.5rem] rounded-br-[2.5rem]",
  },
  {
    icon: Shield,
    accentIcon: Star,
    tag: "Garantizado",
    gradient: "from-emerald-600 via-emerald-500 to-teal-400",
    glow: "shadow-emerald-200",
    tagBg: "bg-emerald-100 text-emerald-700",
    iconBg: "bg-emerald-600",
    border: "border-emerald-100",
    hoverBorder: "hover:border-emerald-300",
    textAccent: "text-emerald-600",
    checkColor: "text-emerald-500",
    bgFrom: "from-emerald-50",
    shape: "rounded-tl-[0.5rem] rounded-tr-[2.5rem] rounded-bl-[2.5rem] rounded-br-[0.5rem]",
  },
  {
    icon: CreditCard,
    accentIcon: Zap,
    tag: "Flexible",
    gradient: "from-violet-600 via-violet-500 to-purple-400",
    glow: "shadow-violet-200",
    tagBg: "bg-violet-100 text-violet-700",
    iconBg: "bg-violet-600",
    border: "border-violet-100",
    hoverBorder: "hover:border-violet-300",
    textAccent: "text-violet-600",
    checkColor: "text-violet-500",
    bgFrom: "from-violet-50",
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
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-100 rounded-full blur-3xl opacity-30 pointer-events-none" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm tracking-[0.25em] uppercase mb-3">Lo que ofrecemos</p>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-5">
            Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-600">servicios</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto leading-relaxed">
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
                className={`group relative bg-gradient-to-b ${cfg.bgFrom} to-white border-2 ${cfg.border} ${cfg.hoverBorder} ${cfg.shape} p-8 transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${cfg.glow} cursor-default overflow-hidden`}
              >
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cfg.gradient} transition-all duration-500 group-hover:h-2`} />

                {/* Floating accent icon top-right */}
                <div className={`absolute top-5 right-5 w-8 h-8 rounded-full bg-gradient-to-br ${cfg.gradient} flex items-center justify-center opacity-20 group-hover:opacity-40 group-hover:scale-125 transition-all duration-500`}>
                  <AccentIcon className="w-4 h-4 text-white" />
                </div>

                {/* Background circle decoration */}
                <div className={`absolute -bottom-12 -right-12 w-40 h-40 rounded-full bg-gradient-to-br ${cfg.gradient} opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-500`} />

                {/* Tag */}
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${cfg.tagBg} mb-6`}>
                  {cfg.tag}
                </span>

                {/* Icon */}
                <div className={`relative w-16 h-16 ${cfg.iconBg} ${cfg.shape} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight group-hover:text-gray-800 transition-colors">
                  {service.title}
                </h3>

                {/* Divider */}
                <div className={`w-10 h-0.5 bg-gradient-to-r ${cfg.gradient} rounded-full mb-4 group-hover:w-16 transition-all duration-500`} />

                {/* Description */}
                <p className="text-gray-500 text-sm leading-relaxed mb-5 group-hover:text-gray-600 transition-colors">
                  {service.description}
                </p>

                {/* Additional info */}
                {service.additionalInfo && (
                  <div className={`flex items-start gap-2.5 p-3 rounded-xl bg-white border ${cfg.border} shadow-sm`}>
                    <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${cfg.checkColor}`} />
                    <span className="text-gray-500 text-xs italic leading-relaxed">{service.additionalInfo}</span>
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
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white text-sm font-semibold rounded-2xl hover:from-blue-700 hover:to-violet-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
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
