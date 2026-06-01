import { useState } from "react";
import { ChevronDown, ShieldCheck, CreditCard, Truck, Car, Clock, Wrench, HelpCircle, Key } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const faqIcons = [
  ShieldCheck,
  CreditCard,
  Truck,
  Car,
  Key,
  Clock,
  Wrench,
  HelpCircle,
];

const FAQ = () => {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [showAll, setShowAll] = useState(false);

  const allFaqs = [
    {
      question: t('faq.questions.quality.question'),
      answer: t('faq.questions.quality.answer')
    },
    {
      question: t('faq.questions.warranty.question'),
      answer: t('faq.questions.warranty.answer')
    },
    {
      question: t('faq.questions.financing.question'),
      answer: t('faq.questions.financing.answer')
    },
    {
      question: t('faq.questions.delivery.question'),
      answer: t('faq.questions.delivery.answer')
    },
    {
      question: t('faq.questions.trade_in.question'),
      answer: t('faq.questions.trade_in.answer')
    },
    {
      question: t('faq.questions.test_drive.question'),
      answer: t('faq.questions.test_drive.answer')
    },
    {
      question: t('faq.questions.reserve.question'),
      answer: t('faq.questions.reserve.answer')
    },
    {
      question: t('faq.questions.schedule.question'),
      answer: t('faq.questions.schedule.answer')
    },
  ];

  const faqs = showAll ? allFaqs : allFaqs.slice(0, 5);

  return (
    <section className="py-24 px-4 bg-[#0a0d11]">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-white/50 text-sm mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>Preguntas frecuentes</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-white mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const Icon = faqIcons[index % faqIcons.length];
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border rounded-xl overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "border-white/20 bg-white/[0.06]"
                    : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10"
                }`}
              >
                <button
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? "bg-white text-[#010307]" : "bg-white/5 text-white/40"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`flex-1 text-base font-medium transition-colors duration-200 ${
                    isOpen ? "text-white" : "text-white/70"
                  }`}>
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-white" : "text-white/30"
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-6 pl-[4.25rem]">
                    <p className="text-white/60 leading-relaxed text-sm">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Show more / less */}
        {allFaqs.length > 5 && (
          <div className="text-center mt-8">
            <button
              onClick={() => setShowAll(!showAll)}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 text-white/60 text-sm rounded-lg hover:bg-white/5 hover:text-white hover:border-white/30 transition-all duration-200"
            >
              {showAll ? (
                <>Ver menos preguntas <ChevronDown className="w-4 h-4 rotate-180" /></>
              ) : (
                <>Ver {allFaqs.length - 5} preguntas más <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FAQ;
