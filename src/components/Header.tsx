import { Phone, MapPin, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import editionCarsLogo from "@/assets/edition-cars-logo.jpg";
import { useLocation } from "react-router-dom";

const Header = () => {
  const { getPhoneNumber, getAddress, t } = useLanguage();
  const address = getAddress();
  const location = useLocation();

  const navigationLinks = [
    { href: "/", label: t('header.home') },
    { href: "/stock", label: t('header.vehicles') },
    { href: "/sell", label: t('header.sell_your_car') },
    { href: "/financing", label: t('header.financing') },
    { href: "/services", label: t('header.services') },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/contact", label: t('header.contact') },
  ];

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="bg-[#101318] text-white border-b border-[#1F232A] sticky top-0 z-50">
      {/* Top bar: contact info */}
      <div className="border-b border-[#1F232A] bg-[#0a0d11]">
        <div className="container mx-auto max-w-7xl px-4 flex h-10 items-center justify-between">
          <div className="flex items-center gap-6 text-xs text-white/80">
            <a href={`tel:+34933704030`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              <span>93 370 40 30</span>
            </a>
            <a href={`tel:+34610202100`} className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Phone size={11} />
              <span>610 20 21 00</span>
            </a>
            <a href="mailto:info@editioncars.es" className="hidden md:flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={11} />
              <span>info@editioncars.es</span>
            </a>
          </div>
          <div className="flex items-center gap-4 text-xs text-white/80">
            <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-1.5 hover:text-white transition-colors">
              <MapPin size={11} />
              <span>{address.full}</span>
            </a>
            <div className="flex items-center gap-1.5">
              <Clock size={11} />
              <span>Lun–Sáb: 10:00–14:00, 16:00–20:00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header: logo + horizontal centered nav */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex h-[70px] items-center justify-between gap-6">
          {/* Logo */}
          <a href="/" className="flex-shrink-0 hover:opacity-80 transition-opacity">
            <img
              src={editionCarsLogo}
              alt="EDITION CARS"
              className="h-[46px] w-auto object-contain"
            />
          </a>

          {/* Centered horizontal nav */}
          <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
            {navigationLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-colors rounded-sm ${
                  isActive(link.href)
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <a
            href="tel:+34933704030"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-white text-[#010307] text-sm font-semibold rounded-sm hover:bg-white/90 transition-colors flex-shrink-0"
          >
            <Phone size={14} />
            <span>Llámanos</span>
          </a>

          {/* Mobile: phone icon */}
          <a href="tel:+34933704030" className="md:hidden flex items-center gap-2 text-white/70 hover:text-white transition-colors">
            <Phone size={18} />
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
