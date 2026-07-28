import { useState } from "react";
import { Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import contactBackground from "@/assets/contact.png";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const Contact = () => {
  const { toast } = useToast();
  const { language, getPhoneNumber, getAddress, t } = useLanguage();
  const address = getAddress();

  const getFlag = () => {
    switch (language) {
      case "es": return "🇪🇸";
      case "en": return "🇬🇧";
      case "fr": return "🇫🇷";
      default: return "🇪🇸";
    }
  };
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
    acceptMarketing: false,
    acceptPrivacy: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.acceptMarketing) {
      toast({
        title: "Error",
        description: t('contact_page.errors.privacy_required'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: formData.nombre,
        lead_lastname: formData.apellido,
        lead_phone_number: formData.telefono,
        lead_email: formData.email,
        message: formData.mensaje
      };

      const response = await fetch(CONTACT_FORM_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: t('contact_page.errors.submission_error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const phoneNumber = getPhoneNumber();

  const contactInfo = [
    {
      icon: Phone,
      title: t('contact_page.info.call_us.title'),
      description: t('contact_page.info.call_us.description'),
      contact: phoneNumber,
      href: `tel:${phoneNumber}`
    },
    {
      icon: MapPin,
      title: t('contact_page.info.visit_us.title'),
      description: `${t('contact_page.info.visit_us.description')} ${address.full}`,
      contact: address.full,
      href: address.mapsUrl
    }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <SEO page="contact" />
      <Header />

      {/* Hero Section with Form */}
      <div
        className="relative pt-8"
        style={{
          backgroundImage: `url(${contactBackground})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
      >
        {/* Dark gradient overlay fading to page background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-[#0B0B0C]/85 to-[#0B0B0C]" />
        <div className="relative z-10 px-4 lg:pt-16 pt-10 pb-28 lg:pb-32 mx-auto max-w-screen-sm text-center lg:px-6">
          <h1 className="mb-4 text-4xl tracking-tight font-extrabold text-white drop-shadow-lg">
            {t('contact_page.title')}
          </h1>
          <p className="mb-8 text-[#D4D4D8] sm:text-xl pb-5 md:pb-0 drop-shadow font-medium">
            {t('contact_page.subtitle')}
          </p>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="relative z-10 py-16 md:py-20 px-4 bg-[#0B0B0C]">
        {/* yellow radial glow behind the form */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,0,0.05)_0%,transparent_60%)] pointer-events-none" />
        <div className="container mx-auto max-w-2xl relative z-20">
          <Card className="mdg-form-light bg-white border border-slate-200 rounded-2xl shadow-2xl -mt-24 relative z-20">
            <CardContent className="p-8 sm:p-10">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-900/30 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t('contact_page.success.title')}
                  </h3>
                  <p className="text-[#D4D4D8] mb-6">
                    {t('contact_page.success.description')}
                  </p>
                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        nombre: "",
                        apellido: "",
                        email: "",
                        telefono: "",
                        mensaje: "",
                        acceptMarketing: false,
                        acceptPrivacy: false
                      });
                    }}
                    className="bg-[#ffff00] hover:bg-[#e6e600] text-black font-bold"
                  >
                    {t('contact_page.success.send_another')}
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nombre" className="text-slate-900 font-semibold text-sm mb-2 block">{t('contact_page.form.name')} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                        placeholder={t('contact_page.form.name_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="apellido" className="text-slate-900 font-semibold text-sm mb-2 block">{t('contact_page.form.surname')} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="apellido"
                        name="apellido"
                        value={formData.apellido}
                        onChange={handleInputChange}
                        required
                        className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                        placeholder={t('contact_page.form.surname_placeholder')}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-900 font-semibold text-sm mb-2 block">{t('contact_page.form.email')} <span className="text-amber-500">*</span></Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                        placeholder={t('contact_page.form.email_placeholder')}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="telefono" className="text-slate-900 font-semibold text-sm mb-2 block">{t('contact_page.form.phone')} <span className="text-amber-500">*</span></Label>
                      <div className="flex">
                        <div className="flex items-center px-3 bg-[#0B0B0C] border border-r-0 border-[#27272A] rounded-l-md">
                          <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                        </div>
                        <Input
                          id="telefono"
                          name="telefono"
                          type="tel"
                          value={formData.telefono}
                          onChange={handleInputChange}
                          required
                          className="bg-[#0B0B0C] border-[#27272A] text-white rounded-l-none focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                          placeholder={t('contact_page.form.phone_placeholder')}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mensaje" className="text-slate-900 font-semibold text-sm mb-2 block">{t('contact_page.form.message')} <span className="text-amber-500">*</span></Label>
                    <Textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      required
                      rows={4}
                      placeholder={t('contact_page.form.message_placeholder')}
                      className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="acceptMarketing"
                        checked={formData.acceptMarketing}
                        onCheckedChange={(checked) => 
                          setFormData({ ...formData, acceptMarketing: checked as boolean })
                        }
                      />
                      <Label htmlFor="acceptMarketing" className="text-slate-700 text-xs font-medium leading-relaxed">
                        {t('contact_page.form.accept_marketing')}{" "}
                        <button
                          type="button"
                          onClick={() => setOpenPrivacyModal(true)}
                          className="text-amber-600 font-bold hover:underline"
                        >
                          {t('contact_page.form.privacy_policy')}
                        </button>.
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#ffff00] hover:bg-yellow-300 text-black font-extrabold uppercase tracking-wider py-4 h-auto rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {isSubmitting ? t('contact_page.form.submitting') : t('contact_page.form.submit')}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 px-4 bg-[#0B0B0C]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <a
                  key={index}
                  href={info.href}
                  target={info.icon === MapPin ? "_blank" : undefined}
                  rel={info.icon === MapPin ? "noopener noreferrer" : undefined}
                  className="group block"
                >
                  <div className="mdg-feature-card rounded-2xl p-8 transition-all duration-500 hover:-translate-y-1.5 h-full">
                    <div className="flex items-start gap-6">
                      <div className="w-14 h-14 shrink-0 rounded-xl bg-[#ffff00] flex items-center justify-center shadow-lg shadow-[#ffff00]/20 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-7 h-7 text-black" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {info.title}
                        </h3>
                        <p className="text-[#D4D4D8] text-sm leading-relaxed">
                          {info.description}
                        </p>
                        <div className="mt-4 pt-4 border-t border-[#27272A]">
                          <span className="text-white font-bold text-lg group-hover:text-[#ffff00] transition-colors">
                            {info.contact}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-20 px-4 bg-[#0B0B0C] border-t border-[#27272A]">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <p className="text-[#ffff00] text-sm tracking-[0.22em] uppercase mb-2 font-semibold">MDG CAR CENTER</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              {t('contact_page.location.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Address + hours card */}
            <div className="mdg-feature-card rounded-2xl p-8 flex flex-col justify-center gap-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffff00] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#ffff00]/20">
                  <MapPin className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {t('contact_page.location.address_title')}
                  </h3>
                  <p className="text-white/90 leading-relaxed">
                    {address.street}<br />
                    {address.city}
                  </p>
                </div>
              </div>

              <div className="border-t border-[#27272A]" />

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#ffff00] flex items-center justify-center flex-shrink-0 shadow-lg shadow-[#ffff00]/20">
                  <Clock className="w-6 h-6 text-black" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {t('contact_page.location.hours_title')}
                  </h3>
                  <div className="space-y-1 text-white/90">
                    <p>{t('contact_page.location.hours.weekday')}</p>
                    <p>{t('contact_page.location.hours.saturday')}</p>
                    <p>{t('contact_page.location.hours.sunday')}</p>
                  </div>
                </div>
              </div>

              <a
                href={address.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center justify-center gap-2 py-3 px-6 rounded-xl bg-[#ffff00] text-black text-sm font-bold hover:bg-[#e6e600] hover:shadow-[0_8px_22px_-6px_rgba(255,255,0,0.55)] transition-all duration-300"
              >
                <MapPin className="w-4 h-4" />
                Cómo llegar
              </a>
            </div>

            {/* Google Map */}
            <div className="mdg-feature-card relative overflow-hidden rounded-2xl min-h-[420px]">
              <iframe
                src={address.mapsEmbedUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(1.1) saturate(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`${t('contact_page.location.title')} - MDG CAR CENTER, ${address.city}`}
              ></iframe>
              {/* Custom yellow marker overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
                <div className="relative flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-[#ffff00] border-2 border-black flex items-center justify-center shadow-[0_0_18px_rgba(255,255,0,0.7)]">
                    <MapPin className="w-5 h-5 text-black" />
                  </div>
                  <span className="w-2 h-2 rotate-45 -mt-1 bg-[#ffff00] border-r-2 border-b-2 border-black" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-2 bg-black/40 blur-sm rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQ />

      <Footer />

      {/* Privacy Policy Modal */}
      <Dialog open={openPrivacyModal} onOpenChange={setOpenPrivacyModal}>
        <DialogContent className="mdg-form-light max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{t('legal.privacy_policy.title')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-muted-foreground">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{t('legal.privacy_policy.section_2_1.title')}</h3>
              <div className="bg-white/5 p-4 rounded-lg">
                <p><strong>{t('legal.privacy_policy.section_2_1.company_name')}:</strong> MDG CAR CENTER</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.address')}:</strong> {address.full}</p>
                <p><strong>{t('legal.privacy_policy.section_2_1.phone')}:</strong> {getPhoneNumber()}</p>
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
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Contact;