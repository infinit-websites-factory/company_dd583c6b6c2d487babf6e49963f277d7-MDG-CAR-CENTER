import { Phone, MapPin, Mail, Clock, Menu, X, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import mdgLogo from "@/assets/mdg-logo.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const navigationLinks = [
  { href: "/", label: "Inicio" },
  { href: "/stock", label: "Vehículos" },
  { href: "/bajo-pedido", label: "Bajo pedido" },
  { href: "/sell", label: "Tasación" },
  { href: "/financing", label: "Financiación" },
  { href: "/presupuestos", label: "Presupuestos" },
  { href: "/services", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];

const socialLinks = [
  { icon: Facebook, href: "https://www.facebook.com/Mdgcarcenter/", label: "Facebook", cls: "bg-[#1877F2] hover:bg-[#1877F2]/85" },
  { icon: Instagram, href: "https://www.instagram.com/mdgcarcenter/", label: "Instagram", cls: "bg-gradient-to-br from-[#feda75] via-[#e4405f] to-[#4f5bd5] hover:opacity-90" },
];

const Header = () => {
  const { getAddress } = useLanguage();
  const address = getAddress();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location.pathname === "/" : location.pathname.startsWith(href);

  return (
    <header className="bg-[#161618] text-white border-b border-[#27272A] sticky top-0 z-50">
      {/* Top meta bar */}
      <div className="border-b border-[#27272A] bg-[#0B0B0C]">
        <div className="container mx-auto max-w-7xl px-4 flex h-10 items-center justify-between text-xs">
          {/* Left */}
          <div className="flex items-center gap-5 text-[#F4F4F5] font-medium">
            <a href="tel:+34858711456" className="flex items-center gap-1.5 hover:text-[#ffff00] transition-colors">
              <Phone size={12} className="text-[#ffff00]" />
              <span>858 711 456</span>
            </a>
            <a href="mailto:info@mdgcarcenter.com" className="hidden sm:flex items-center gap-1.5 hover:text-[#ffff00] transition-colors">
              <Mail size={12} className="text-[#ffff00]" />
              <span>info@mdgcarcenter.com</span>
            </a>
          </div>
          {/* Right */}
          <div className="flex items-center gap-4 text-[#F4F4F5] font-medium">
            <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="hidden lg:flex items-center gap-1.5 hover:text-[#ffff00] transition-colors">
              <MapPin size={12} className="text-[#ffff00]" />
              <span>{address.full}</span>
            </a>
            <div className="hover-glow cursor-default hidden md:flex items-center gap-1.5">
              <Clock size={12} className="text-[#ffff00]" />
              <span>Lun–Vie: 10:00–20:00</span>
            </div>
            {/* Social icons — official brand colors */}
            <div className="flex items-center gap-2 sm:border-l sm:border-white/15 sm:pl-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-white transition-all duration-300 hover:-translate-y-0.5 ${s.cls}`}
                >
                  <s.icon size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main header: logo left · nav center · call button right */}
      <div className="container mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between gap-4">
        {/* Logo (far left) */}
        <a href="/" className="flex-shrink-0 hover:opacity-90 transition-opacity">
          <img src={mdgLogo} alt="MDG CAR CENTER" className="h-14 md:h-16 w-auto object-contain" />
        </a>

        {/* Centered nav (desktop) */}
        <nav className="hidden lg:flex items-center justify-center gap-1 flex-1">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-3 py-2 text-[11px] font-bold uppercase tracking-wide rounded-md transition-colors whitespace-nowrap ${
                isActive(link.href)
                  ? "bg-[#ffff00] text-black px-4"
                  : "text-[#F4F4F5] hover:text-[#ffff00]"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: call button + mobile toggle */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="tel:+34858711456"
            className="hidden sm:flex items-center gap-2 px-6 py-2.5 bg-[#ffff00] text-black text-sm font-bold rounded-lg hover:bg-[#e6e600] hover:shadow-[0_8px_22px_-6px_rgba(255,255,0,0.5)] transition-all duration-300"
          >
            <Phone size={15} />
            <span>Llámanos</span>
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="lg:hidden text-[#F4F4F5] hover:text-[#ffff00] transition-colors"
            aria-label="Menu"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="lg:hidden container mx-auto max-w-7xl px-4 pb-4 flex flex-col gap-1">
          {navigationLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`px-4 py-3 text-sm font-bold uppercase tracking-wide rounded-md transition-colors ${
                isActive(link.href)
                  ? "bg-[#ffff00] text-black"
                  : "text-[#F4F4F5] hover:text-[#ffff00] hover:bg-white/5"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="tel:+34858711456"
            className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-[#ffff00] text-black text-sm font-bold rounded-lg"
          >
            <Phone size={16} />
            Llámanos · 858 711 456
          </a>
        </nav>
      )}
    </header>
  );
};

export default Header;
