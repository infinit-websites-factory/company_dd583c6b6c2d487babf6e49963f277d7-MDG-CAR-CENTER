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
  es: "+34933704030",
  en: "+34933704030",
  fr: "+34933704030",
};

const ADDRESSES: Record<Language, AddressInfo> = {
  es: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelona, España",
    full: "Carretera Ca l'Alaio, 3 - El Prat de Llobregat - 08820 Barcelona",
    mapsUrl: "https://maps.app.goo.gl/j94p4AomKP1eQmBe9",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0405601081934!2d2.0816076758755564!3d41.32973137130727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49eb971dab66f%3A0x3978cef3b06e5d0a!2sEDITION%20CARS%20SL.!5e0!3m2!1sen!2sin!4v1780290117324!5m2!1sen!2sin"
  },
  en: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelona, Spain",
    full: "Carretera Ca l'Alaio, 3 - El Prat de Llobregat - 08820 Barcelona",
    mapsUrl: "https://maps.app.goo.gl/j94p4AomKP1eQmBe9",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0405601081934!2d2.0816076758755564!3d41.32973137130727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49eb971dab66f%3A0x3978cef3b06e5d0a!2sEDITION%20CARS%20SL.!5e0!3m2!1sen!2sin!4v1780290117324!5m2!1sen!2sin"
  },
  fr: {
    street: "Carretera Ca l'Alaio, 3",
    city: "08820 El Prat de Llobregat, Barcelone, Espagne",
    full: "Carretera Ca l'Alaio, 3 - El Prat de Llobregat - 08820 Barcelona",
    mapsUrl: "https://maps.app.goo.gl/j94p4AomKP1eQmBe9",
    mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0405601081934!2d2.0816076758755564!3d41.32973137130727!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12a49eb971dab66f%3A0x3978cef3b06e5d0a!2sEDITION%20CARS%20SL.!5e0!3m2!1sen!2sin!4v1780290117324!5m2!1sen!2sin"
  }
};

const CURRENCIES: Record<Language, { code: string; symbol: string }> = {
  es: { code: "EUR", symbol: "€" },
  en: { code: "EUR", symbol: "€" },
  fr: { code: "EUR", symbol: "€" }
};

const formatPhoneNumber = (phone: string, language: Language): string => {
  // Returns: 93 370 40 30
  const digits = phone.replace('+34', '');
  if (digits.length === 9) {
    return `${digits.substring(0, 2)} ${digits.substring(2, 5)} ${digits.substring(5, 7)} ${digits.substring(7)}`;
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
    return "34610202100";
  };

  const getAddress = () => {
    return ADDRESSES[language];
  };

  const getCityName = () => {
    return "El Prat de Llobregat";
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
