import { createContext, useContext, useState, ReactNode } from "react";
import { translations, TranslationKey } from "@/translations";

export type Language = "es" | "en" | "fr";

interface AddressInfo {
  street: string;
  city: string;
  full: string;
  mapsUrl: string;
  mapsEmbedUrl: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  getPhoneNumber: () => string;
  getPhoneNumberWithPrefix: () => string;
  getWhatsAppNumber: () => string;
  getAddress: () => AddressInfo;
  getCityName: () => string;
  getCurrency: () => string;
  getCurrencySymbol: () => string;
  formatPrice: (price: number) => string;
  t: (key: TranslationKey, options?: { returnObjects?: boolean }) => any;
  translateVehicleAttribute: (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string) => string;
}

const PHONE_NUMBERS = {
  es: "+34858711456",
  en: "+34858711456",
  fr: "+34858711456",
};

const MDG_MAPS_URL = "https://www.google.es/maps/place/mdg+car+center/@37.3173657,-3.1955497,17z/data=!3m1!4b1!4m6!3m5!1s0xd6e29d5807258d3:0x588dc54ac7e99612!8m2!3d37.3173615!4d-3.1929748!16s%2Fg%2F11s693c34x";
const MDG_MAPS_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3173.0618960455804!2d-3.1929748!3d37.3173615!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6e29d5807258d3%3A0x588dc54ac7e99612!2smdg%20car%20center!5e0!3m2!1sen!2sin!4v1785145661591!5m2!1sen!2sin";

const ADDRESSES: Record<Language, AddressInfo> = {
  es: {
    street: "Av. Andalucía, 12",
    city: "Purullena, Granada, España",
    full: "Av. Andalucía, 12, Purullena, Granada, España",
    mapsUrl: MDG_MAPS_URL,
    mapsEmbedUrl: MDG_MAPS_EMBED_URL
  },
  en: {
    street: "Av. Andalucía, 12",
    city: "Purullena, Granada, Spain",
    full: "Av. Andalucía, 12, Purullena, Granada, Spain",
    mapsUrl: MDG_MAPS_URL,
    mapsEmbedUrl: MDG_MAPS_EMBED_URL
  },
  fr: {
    street: "Av. Andalucía, 12",
    city: "Purullena, Grenade, Espagne",
    full: "Av. Andalucía, 12, Purullena, Granada, Espagne",
    mapsUrl: MDG_MAPS_URL,
    mapsEmbedUrl: MDG_MAPS_EMBED_URL
  }
};

const CURRENCIES: Record<Language, { code: string; symbol: string }> = {
  es: { code: "EUR", symbol: "€" },
  en: { code: "EUR", symbol: "€" },
  fr: { code: "EUR", symbol: "€" }
};

const formatPhoneNumber = (phone: string, language: Language): string => {
  // Returns: 858 711 456
  const digits = phone.replace('+34', '');
  if (digits.length === 9) {
    return `${digits.substring(0, 3)} ${digits.substring(3, 6)} ${digits.substring(6)}`;
  }
  return digits;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>("es");

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const getPhoneNumber = () => {
    return formatPhoneNumber(PHONE_NUMBERS[language], language);
  };

  const getPhoneNumberWithPrefix = () => {
    return PHONE_NUMBERS[language];
  };

  const getWhatsAppNumber = () => {
    return "34633406310";
  };

  const getAddress = () => {
    return ADDRESSES[language];
  };

  const getCityName = () => {
    return "Purullena";
  };

  const getCurrency = () => {
    return CURRENCIES[language].code;
  };

  const getCurrencySymbol = () => {
    return CURRENCIES[language].symbol;
  };

  const formatPrice = (price: number): string => {
    const currency = CURRENCIES[language];
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: currency.code,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const t = (key: TranslationKey, options?: { returnObjects?: boolean }): any => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }

    if (options?.returnObjects) {
      return value;
    }

    return typeof value === 'string' ? value : key;
  };

  const translateVehicleAttribute = (category: 'fuel' | 'transmission' | 'body_type' | 'color', value: string): string => {
    if (!value) return value;

    try {
      const translationKey = `vehicle_attributes.${category}.${value}` as TranslationKey;
      const translated = t(translationKey);

      if (translated === translationKey) {
        return value;
      }

      return translated;
    } catch {
      return value;
    }
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, getPhoneNumber, getPhoneNumberWithPrefix, getWhatsAppNumber, getAddress, getCityName, getCurrency, getCurrencySymbol, formatPrice, t, translateVehicleAttribute }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
