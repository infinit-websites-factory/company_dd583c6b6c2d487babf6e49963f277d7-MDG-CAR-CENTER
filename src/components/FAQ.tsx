import { useState } from "react";
import { ShieldCheck, CreditCard, Truck, Car, Clock, Wrench, Key, HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqData = [
  { icon: ShieldCheck, color: "blue",    bg: "bg-blue-500",    light: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-600",   ring: "ring-blue-500"   },
  { icon: ShieldCheck, color: "emerald", bg: "bg-emerald-500", light: "bg-emerald-50",border: "border-emerald-200",text: "text-emerald-600",ring: "ring-emerald-500" },
  { icon: CreditCard,  color: "violet",  bg: "bg-violet-500",  light: "bg-violet-50", border: "border-violet-200", text: "text-violet-600", ring: "ring-violet-500"  },
  { icon: Truck,       color: "amber",   bg: "bg-amber-500",   light: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-600",  ring: "ring-amber-500"   },
  { icon: Car,         color: "rose",    bg: "bg-rose-500",    light: "bg-rose-50",   border: "border-rose-200",   text: "text-rose-600",   ring: "ring-rose-500"    },
  { icon: Clock,       color: "cyan",    bg: "bg-cyan-500",    light: "bg-cyan-50",   border: "border-cyan-200",   text: "text-cyan-600",   ring: "ring-cyan-500"    },
  { icon: Key,         color: "indigo",  bg: "bg-indigo-500",  light: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-600", ring: "ring-indigo-500"  },
  { icon: Wrench,      color: "fuchsia", bg: "bg-fuchsia-500", light: "bg-fuchsia-50",border: "border-fuchsia-200",text: "text-fuchsia-600",ring: "ring-fuchsia-500" },
];

const FAQ = () => {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const [showAll, setShowAll] = useState(false);

  const allFaqs = [
    { question: t('faq.questions.quality.question'),   answer: t('faq.questions.quality.answer')   },
    { question: t('faq.questions.warranty.question'),  answer: t('faq.questions.warranty.answer')  },
    { question: t('faq.questions.financing.question'), answer: t('faq.questions.financing.answer') },
    { question: t('faq.questions.delivery.question'),  answer: t('faq.questions.delivery.answer')  },
    { question: t('faq.questions.trade_in.question'),  answer: t('faq.questions.trade_in.answer')  },
    { question: t('faq.questions.test_drive.question'),answer: t('faq.questions.test_drive.answer')},
    { question: t('faq.questions.reserve.question'),   answer: t('faq.questions.reserve.answer')   },
    { question: t('faq.questions.schedule.question'),  answer: t('faq.questions.schedule.answer')  },
  ];

  const faqs = showAll ? allFaqs : allFaqs.slice(0, 5);
  const current = faqData[active % faqData.length];
  const ActiveIcon = current.icon;

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">

      {/* Section header */}
      <div className="container mx-auto max-w-6xl px-4 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-gray-500 text-sm mb-5 shadow-sm">
          <HelpCircle className="w-4 h-4" />
          Preguntas frecuentes
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-gray-900 mb-3">
          Todo lo que necesitas <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-violet-500">saber</span>
        </h2>
        <p className="text-gray-400 text-lg">{t('faq.subtitle')}</p>
      </div>

      {/* Two-panel layout */}
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT — question list */}
          <div className="lg:col-span-2 space-y-2">
            {faqs.map((faq, i) => {
              const cfg = faqData[i % faqData.length];
              const Icon = cfg.icon;
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-2xl border-2 transition-all duration-300 group
                    ${isActive
                      ? `${cfg.light} ${cfg.border} shadow-md`
                      : "bg-white border-gray-100 hover:border-gray-200 hover:shadow-sm"
                    }`}
                >
                  {/* Coloured icon */}
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300
                    ${isActive ? `${cfg.bg} shadow-lg scale-110` : "bg-gray-100 group-hover:bg-gray-200"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                  </div>

                  {/* Question text */}
                  <span className={`text-sm font-semibold leading-snug flex-1 transition-colors duration-200
                    ${isActive ? "text-gray-900" : "text-gray-600 group-hover:text-gray-800"}`}>
                    {faq.question}
                  </span>

                  {/* Arrow */}
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-300
                    ${isActive ? `${cfg.text} translate-x-0.5` : "text-gray-300 group-hover:text-gray-400"}`} />
                </button>
              );
            })}

            {/* Show more */}
            {allFaqs.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-3 rounded-2xl border-2 border-dashed border-gray-200 text-gray-400 text-sm hover:border-gray-300 hover:text-gray-600 transition-all duration-200"
              >
                {showAll ? "← Ver menos" : `+ Ver ${allFaqs.length - 5} preguntas más`}
              </button>
            )}
          </div>

          {/* RIGHT — answer panel */}
          <div className="lg:col-span-3">
            <div
              key={active}
              className={`h-full ${current.light} border-2 ${current.border} rounded-3xl p-8 md:p-10 relative overflow-hidden`}
              style={{ animation: "fadeSlideIn 0.3s ease" }}
            >
              {/* Big decorative icon background */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.06]">
                <ActiveIcon className="w-48 h-48" style={{ color: "currentColor" }} />
              </div>

              {/* Number badge */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 ${current.bg} rounded-full mb-6`}>
                <span className="text-white text-xs font-bold tracking-wider">
                  {String(active + 1).padStart(2, "0")} / {String(faqs.length).padStart(2, "0")}
                </span>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 ${current.bg} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                <ActiveIcon className="w-8 h-8 text-white" />
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-snug">
                {allFaqs[active]?.question}
              </h3>

              {/* Divider */}
              <div className={`w-12 h-1 ${current.bg} rounded-full mb-5`} />

              {/* Answer */}
              <p className="text-gray-600 leading-relaxed text-base">
                {allFaqs[active]?.answer}
              </p>

              {/* Navigation dots */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/60">
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? `w-6 h-2.5 ${current.bg}`
                        : "w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default FAQ;
