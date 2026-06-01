import { useState } from "react";
import { Phone, MapPin, Clock, Mail, Car, Shield, CreditCard, Truck, Star, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import editionCarsLogo from "@/assets/edition-cars-logo.jpg";

const Footer = () => {
  const [openModal, setOpenModal] = useState<string | null>(null);
  const { getPhoneNumber, getAddress, getCityName, t } = useLanguage();
  const address = getAddress();
  const cityName = getCityName();

  const legalContent = {
    privacy: {
      title: t('legal.privacy_policy.title'),
      content: (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_1.title')}</h3>
          <div className="bg-muted/50 p-4 rounded-lg">
            <p><strong>{t('legal.privacy_policy.section_2_1.company_name')}:</strong> EDITION CARS</p>
            <p><strong>{t('legal.privacy_policy.section_2_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.privacy_policy.section_2_1.phone')}:</strong> 93 370 40 30</p>
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
            <p><strong>{t('legal.legal_notice.section_1_1.owner')}:</strong> EDITION CARS SL</p>
            <p><strong>{t('legal.legal_notice.section_1_1.address')}:</strong> {address.full}</p>
            <p><strong>{t('legal.legal_notice.section_1_1.phone')}:</strong> 93 370 40 30</p>
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
    { icon: Car, label: "Venta de vehículos", href: "/stock" },
    { icon: Car, label: "Compra de vehículos", href: "/sell" },
    { icon: CreditCard, label: "Financiación", href: "/financing" },
    { icon: Truck, label: "Entrega en toda España", href: "/services" },
    { icon: Shield, label: "Garantía Plus (hasta 3 años)", href: "/services" },
    { icon: Star, label: "Servicio VIP", href: "/services" },
  ];

  return (
    <footer className="bg-[#0a0d11] text-white border-t border-[#1F232A]">
      {/* Main footer grid */}
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand column */}
          <div className="lg:col-span-1">
            <img
              src={editionCarsLogo}
              alt="EDITION CARS"
              className="h-10 w-auto object-contain mb-5 brightness-[1.1]"
            />
            <p className="text-white/40 text-sm leading-relaxed mb-6">
              Tu concesionario de confianza para vehículos premium de ocasión en {cityName}, Barcelona.
            </p>
            <div className="flex items-center gap-2 px-3 py-2 bg-yellow-500/10 border border-yellow-500/20 rounded-sm w-fit">
              <div className="flex gap-0.5">
                {[1,2,3,4].map(i => <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />)}
                <Star className="w-3 h-3 fill-yellow-400/60 text-yellow-400" />
              </div>
              <span className="text-yellow-400 text-xs font-medium">4.1 Google</span>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-white/60 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/30" />
              Contacto
            </h3>
            <div className="space-y-4">
              <a href="tel:+34933704030" className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone size={13} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs">Teléfono principal</div>
                  <div className="text-white/70">93 370 40 30</div>
                </div>
              </a>
              <a href="tel:+34610202100" className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Phone size={13} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs">Móvil</div>
                  <div className="text-white/70">610 20 21 00</div>
                </div>
              </a>
              <a href="mailto:info@editioncars.es" className="flex items-center gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <Mail size={13} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs">Email</div>
                  <div className="text-white/70">info@editioncars.es</div>
                </div>
              </a>
              <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-white/50 text-sm hover:text-white transition-colors group">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors">
                  <MapPin size={13} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs">Dirección</div>
                  <div className="text-white/70 leading-snug">Carretera Ca l'Alaio, 3<br/>El Prat de Llobregat<br/>08820 Barcelona</div>
                </div>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-white/60 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/30" />
              Servicios
            </h3>
            <ul className="space-y-2.5">
              {services.map((s, i) => (
                <li key={i}>
                  <a href={s.href} className="flex items-center gap-2.5 text-white/40 text-sm hover:text-white/80 transition-colors group">
                    <s.icon size={13} className="text-white/25 group-hover:text-white/60 transition-colors flex-shrink-0" />
                    <span>{s.label}</span>
                    <ChevronRight size={11} className="ml-auto opacity-0 group-hover:opacity-60 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h3 className="text-xs font-medium tracking-[0.15em] uppercase text-white/60 mb-5 flex items-center gap-2">
              <span className="w-4 h-px bg-white/30" />
              Horarios
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-white/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs mb-1">Lunes – Sábado</div>
                  <div className="text-white/60 text-sm">10:00 – 14:00</div>
                  <div className="text-white/60 text-sm">16:00 – 20:00</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-sm bg-red-900/20 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                  <Clock size={13} className="text-red-400/50" />
                </div>
                <div>
                  <div className="text-white/30 text-xs mb-1">Domingo</div>
                  <div className="text-white/40 text-sm">Cerrado</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <a
                  href={address.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  <MapPin size={11} />
                  Ver en Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#1F232A]">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/20 text-xs tracking-wide">
              © 2026 EDITION CARS SL. Desarrollado por{' '}
              <a href="https://infinit.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white/40 transition-colors">INFINIT</a>
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] text-white/25">
              <button onClick={() => setOpenModal('legal')} className="hover:text-white/50 transition-colors">Aviso Legal</button>
              <span className="text-white/10">·</span>
              <button onClick={() => setOpenModal('privacy')} className="hover:text-white/50 transition-colors">Política de Privacidad</button>
              <span className="text-white/10">·</span>
              <button onClick={() => setOpenModal('terms')} className="hover:text-white/50 transition-colors">Términos y Condiciones</button>
              <span className="text-white/10">·</span>
              <button onClick={() => setOpenModal('cookies')} className="hover:text-white/50 transition-colors">Cookies</button>
            </div>
          </div>
        </div>
      </div>

      {/* Legal Modals */}
      {Object.entries(legalContent).map(([key, content]) => (
        <Dialog key={key} open={openModal === key} onOpenChange={() => setOpenModal(null)}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-[#101318] border-[#1F232A]">
            <DialogHeader>
              <DialogTitle className="text-xl font-heading font-normal text-white">{content.title}</DialogTitle>
            </DialogHeader>
            <div className="mt-4 text-sm text-white/40 font-body font-light">{content.content}</div>
          </DialogContent>
        </Dialog>
      ))}
    </footer>
  );
};

export default Footer;
