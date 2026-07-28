import { useState } from "react";
import { ShieldCheck, CreditCard, Truck, Car, Clock, Wrench, Key, HelpCircle, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqIcons = [ShieldCheck, ShieldCheck, CreditCard, Truck, Car, Clock, Key, Wrench];

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
  const ActiveIcon = faqIcons[active % faqIcons.length];

  return (
    <section className="relative py-24 bg-[#0B0B0C] overflow-hidden">
      {/* Soft top-down spotlight */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(180deg, rgba(255,255,0,0.03) 0%, transparent 40%)" }}
      />

      {/* Section header */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4 mb-14 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#161618] border border-[#ffff00]/40 rounded-full text-[#ffff00] text-sm mb-5 font-semibold">
          <HelpCircle className="w-4 h-4" />
          Preguntas frecuentes
        </div>
        <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">
          Todo lo que necesitas <span className="text-[#ffff00]">saber</span>
        </h2>
        <p className="text-[#D4D4D8] text-lg">{t('faq.subtitle')}</p>
      </div>

      {/* Two-panel layout */}
      <div className="relative z-10 container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT — question list */}
          <div className="lg:col-span-2 space-y-2">
            {faqs.map((faq, i) => {
              const Icon = faqIcons[i % faqIcons.length];
              const isActive = active === i;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`w-full text-left flex items-center gap-4 px-5 py-4 rounded-xl border-2 border-l-4 transition-all duration-300 group
                    ${isActive
                      ? "bg-[#1F1F23] border-[#27272A] border-l-[#ffff00] shadow-[0_0_24px_-8px_rgba(255,255,0,0.4)]"
                      : "bg-[#18181B] border-[#27272A] border-l-transparent hover:border-l-[#ffff00]/50"
                    }`}
                >
                  {/* Icon */}
                  <div className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center transition-all duration-300
                    ${isActive ? "bg-[#ffff00] shadow-lg scale-110" : "bg-white/5 group-hover:bg-[#ffff00]/15"}`}>
                    <Icon className={`w-5 h-5 ${isActive ? "text-black" : "text-[#D4D4D8] group-hover:text-[#ffff00]"}`} />
                  </div>

                  {/* Question text */}
                  <span className={`text-sm font-semibold leading-snug flex-1 transition-colors duration-200
                    ${isActive ? "text-white" : "text-white/80 group-hover:text-white"}`}>
                    {faq.question}
                  </span>

                  {/* Arrow */}
                  <ArrowRight className={`w-4 h-4 flex-shrink-0 transition-all duration-300
                    ${isActive ? "text-[#ffff00] translate-x-0.5" : "text-white/85 group-hover:text-white/85"}`} />
                </button>
              );
            })}

            {/* Show more */}
            {allFaqs.length > 5 && (
              <button
                onClick={() => setShowAll(!showAll)}
                className="w-full py-3 rounded-xl border-2 border-dashed border-[#27272A] text-[#D4D4D8] text-sm font-medium hover:border-[#ffff00] hover:text-white transition-all duration-200"
              >
                {showAll ? "← Ver menos" : `+ Ver ${allFaqs.length - 5} preguntas más`}
              </button>
            )}
          </div>

          {/* RIGHT — answer panel (premium dark) */}
          <div className="lg:col-span-3">
            <div
              key={active}
              className="h-full bg-[#161618] border border-[#27272A] rounded-2xl p-8 md:p-10 relative overflow-hidden"
              style={{ animation: "fadeSlideIn 0.3s ease" }}
            >
              {/* Big decorative icon background */}
              <div className="absolute -right-8 -bottom-8 opacity-[0.05] text-[#ffff00]">
                <ActiveIcon className="w-48 h-48" />
              </div>
              {/* Brand glow */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#ffff00]/10 rounded-full blur-3xl pointer-events-none" />

              {/* Number badge — yellow text */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#ffff00]/10 border border-[#ffff00]/30 rounded-full mb-6 relative z-10">
                <span className="text-[#ffff00] text-xs font-bold tracking-wider">
                  {String(active + 1).padStart(2, "0")} / {String(faqs.length).padStart(2, "0")}
                </span>
              </div>

              {/* Icon — circular yellow badge */}
              <div className="w-16 h-16 bg-[#ffff00] rounded-full flex items-center justify-center mb-6 shadow-lg relative z-10">
                <ActiveIcon className="w-8 h-8 text-black" />
              </div>

              {/* Question */}
              <h3 className="text-xl md:text-2xl font-bold text-white mb-5 leading-snug relative z-10">
                {allFaqs[active]?.question}
              </h3>

              {/* Divider */}
              <div className="w-12 h-1 bg-[#ffff00] rounded-full mb-5 relative z-10" />

              {/* Answer */}
              <p className="text-[#E4E4E7] leading-relaxed text-base relative z-10">
                {allFaqs[active]?.answer}
              </p>

              {/* Navigation dots */}
              <div className="flex items-center gap-2 mt-8 pt-6 border-t border-white/10 relative z-10">
                {faqs.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === active
                        ? "w-6 h-2.5 bg-[#ffff00]"
                        : "w-2.5 h-2.5 bg-white/20 hover:bg-white/40"
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
