import { useState } from "react";
import { Phone, MapPin, Clock, Mail, Car, Shield, CreditCard, Truck, Star, ChevronRight, Facebook, Instagram, Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import mdgLogo from "@/assets/mdg-logo.png";

const Footer = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const { getAddress, getCityName, t } = useLanguage();
  const address = getAddress();
  const cityName = getCityName();

  const legalContent = {
    privacy: {
      title: t('legal.privacy_policy.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_1.title')}</h3>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p><strong>{t('legal.privacy_policy.section_2_1.company_name')}:</strong> MDG CAR CENTER</p>
            <p><strong>{t('legal.privacy_policy.section_2_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.privacy_policy.section_2_1.phone')}:</strong> +34 633 40 63 10</p>
          </div>
          <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_2.title')}</h3>
          <p>{t('legal.privacy_policy.section_2_2.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.privacy_policy.section_2_2.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_3.title')}</h3>
          <p>{t('legal.privacy_policy.section_2_3.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.privacy_policy.section_2_3.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_4.title')}</h3>
          <p>{t('legal.privacy_policy.section_2_4.content')}</p>
        </div>
      )
    },
    legal: {
      title: t('legal.legal_notice.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_1.title')}</h3>
          <p>{t('legal.legal_notice.section_1_1.content')}</p>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p><strong>{t('legal.legal_notice.section_1_1.owner')}:</strong> MDG CAR CENTER SL</p>
            <p><strong>{t('legal.legal_notice.section_1_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.legal_notice.section_1_1.phone')}:</strong> +34 633 40 63 10</p>
          </div>
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_2.title')}</h3>
          <p>{t('legal.legal_notice.section_1_2.content')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.legal_notice.section_1_2.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_3.title')}</h3>
          <p>{t('legal.legal_notice.section_1_3.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_4.title')}</h3>
          <p>{t('legal.legal_notice.section_1_4.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.legal_notice.section_1_5.title')}</h3>
          <p>{t('legal.legal_notice.section_1_5.content_prefix')} {cityName}{t('legal.legal_notice.section_1_5.content_suffix')}</p>
        </div>
      )
    },
    terms: {
      title: t('legal.terms_conditions.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_1.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_1.intro')}</p>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.terms_conditions.section_4_1.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_2.title')}</h3>
          <ul className="list-disc pl-6 space-y-1">
            {t('legal.terms_conditions.section_4_2.items', { returnObjects: true }).map((item: string, index: number) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_3.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_3.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_4.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_4.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_5.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_5.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.terms_conditions.section_4_6.title')}</h3>
          <p>{t('legal.terms_conditions.section_4_6.content_prefix')} {cityName}{t('legal.terms_conditions.section_4_6.content_suffix')}</p>
        </div>
      )
    },
    cookies: {
      title: t('legal.cookies.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_1.title')}</h3>
          <p>{t('legal.cookies.section_3_1.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_2.title')}</h3>
          <p>{t('legal.cookies.section_3_2.content')}</p>
          <h3 className="text-lg font-semibold">{t('legal.cookies.section_3_3.title')}</h3>
          <p>{t('legal.cookies.section_3_3.content')}</p>
        </div>
      )
    }
  };

  const services = [
    { icon: Car, label: "Venta de vehículos", href: "/stock", color: "text-[#ffff00]" },
    { icon: Sparkles, label: "Compra tu coche", href: "/sell", color: "text-[#ffff00]" },
    { icon: CreditCard, label: "Financiación a medida", href: "/financing", color: "text-[#ffff00]" },
    { icon: Truck, label: "Entrega a domicilio", href: "/services", color: "text-[#ffff00]" },
    { icon: Shield, label: "Garantía de 1 año", href: "/services", color: "text-[#ffff00]" },
    { icon: Star, label: "Importación y personalización", href: "/services", color: "text-[#ffff00]" },
  ];

  const socials = [
    { icon: Facebook, href: "https://www.facebook.com/Mdgcarcenter/", label: "Facebook", cls: "bg-[#1877F2] hover:bg-[#1877F2]/80" },
    { icon: Instagram, href: "https://www.instagram.com/mdgcarcenter/", label: "Instagram", cls: "bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] hover:opacity-90" },
  ];

  return (
    <footer className="mdg-footer bg-black text-white border-t-2 border-[#ffff00]/60">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src={mdgLogo}
              alt="MDG CAR CENTER"
              className="h-14 w-auto object-contain mb-4"
            />
            <p className="text-white/90 text-sm leading-relaxed mb-5">
              Tu concesionario de confianza para la compra, venta e importación de vehículos en {cityName}, Granada.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-[#ffff00]/10 border border-[#ffff00]/30 rounded-md w-fit mb-5">
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="w-3.5 h-3.5 fill-[#ffff00] text-[#ffff00]" />)}
              </div>
              <span className="text-[#ffff00] text-xs font-semibold">5.0 Google</span>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`no-glow w-9 h-9 rounded-lg flex items-center justify-center text-white shadow-lg transition-all hover:-translate-y-0.5 ${s.cls}`}
                >
                  <s.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#ffff00]" />
              Contacto
            </h3>
            <div className="space-y-3">
              <a href="tel:+34633406310" className="flex items-center gap-3 text-white/90 text-sm hover:text-[#ffff00] transition-colors group">
                <div className="w-8 h-8 rounded-md bg-[#ffff00]/15 border border-[#ffff00]/30 flex items-center justify-center group-hover:bg-[#ffff00]/25 transition-colors">
                  <Phone size={14} className="text-[#ffff00]" />
                </div>
                <span>+34 633 40 63 10</span>
              </a>
              <a href="mailto:mdgcarcenter@gmail.com" className="flex items-center gap-3 text-white/90 text-sm hover:text-[#ffff00] transition-colors group">
                <div className="w-8 h-8 rounded-md bg-[#ffff00]/15 border border-[#ffff00]/30 flex items-center justify-center group-hover:bg-[#ffff00]/25 transition-colors">
                  <Mail size={14} className="text-[#ffff00]" />
                </div>
                <span>mdgcarcenter@gmail.com</span>
              </a>
              <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/90 text-sm hover:text-[#ffff00] transition-colors group">
                <div className="w-8 h-8 rounded-md bg-[#ffff00]/15 border border-[#ffff00]/30 flex items-center justify-center flex-shrink-0 group-hover:bg-[#ffff00]/25 transition-colors">
                  <MapPin size={14} className="text-[#ffff00]" />
                </div>
                <span className="leading-snug">Av. Andalucía, 12<br/>18519 Purullena, Granada</span>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#ffff00]" />
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i}>
                  <a href={s.href} className="flex items-center gap-2.5 text-white/90 text-sm hover:text-white transition-colors group">
                    <s.icon size={15} className={`${s.color} flex-shrink-0`} />
                    <span>{s.label}</span>
                    <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 text-[#ffff00] transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours + Map */}
          <div>
            <h3 className="text-sm font-bold tracking-wide uppercase text-white mb-4 flex items-center gap-2">
              <span className="w-5 h-0.5 bg-[#ffff00]" />
              Horarios
            </h3>
            <div className="flex items-start gap-3 mb-4">
              <div className="w-8 h-8 rounded-md bg-[#ffff00]/15 border border-[#ffff00]/30 flex items-center justify-center flex-shrink-0">
                <Clock size={14} className="text-[#ffff00]" />
              </div>
              <div className="text-sm">
                <span className="block text-white/90">Lunes – Viernes</span>
                <span className="block text-white font-semibold">10:00 – 20:00</span>
                <span className="block text-white/85 mt-1">Sáb y Dom: Cerrado</span>
              </div>
            </div>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="no-glow inline-flex items-center gap-2 text-xs font-semibold text-black bg-[#ffff00] px-3 py-2 rounded-md hover:bg-[#e6e600] hover:shadow-[0_0_16px_-2px_rgba(255,255,0,0.6)] transition-all"
            >
              <MapPin size={13} />
              Cómo llegar
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-[#0a0a0a]">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-white/85 text-xs tracking-wide">
              © 2026 MDG CAR CENTER SL. Desarrollado por{' '}
              <a href="https://infinit.com/" target="_blank" rel="noopener noreferrer" className="text-[#ffff00] hover:underline">Powered by INFINIT</a>
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] text-white/90">
              <button onClick={() => setOpenModal('legal')} className="hover:text-[#ffff00] transition-colors">Aviso Legal</button>
              <span className="text-white/15">·</span>
              <button onClick={() => setOpenModal('privacy')} className="hover:text-[#ffff00] transition-colors">Política de Privacidad</button>
              <span className="text-white/15">·</span>
              <button onClick={() => setOpenModal('terms')} className="hover:text-[#ffff00] transition-colors">Términos y Condiciones</button>
              <span className="text-white/15">·</span>
              <button onClick={() => setOpenModal('cookies')} className="hover:text-[#ffff00] transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {Object.entries(legalContent).map(([key, content]) => (
        <Dialog key={key} open={openModal === key} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto mdg-form-light">
            <DialogHeader>
              <DialogTitle className="text-xl font-heading font-normal text-white">{content.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-sm text-white/90 font-body font-light">{content.content}</div>
          </DialogContent>
        </Dialog>
      ))}
    </footer>
  );
};

export default Footer;
