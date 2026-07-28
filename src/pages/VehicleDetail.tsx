import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, Share2, MapPin, Phone, Calendar, Mail, User, X } from "lucide-react";
import { fetchCarById, transformApiCarToVehicle, type Vehicle, CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ReservedBanner from "@/components/ReservedBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";
import { toast } from "sonner";
import { useToast } from "@/hooks/use-toast";
import dgtB from "@/assets/dgt-b.png";
import dgtC from "@/assets/dgt-c.png";
import dgtCero from "@/assets/dgt-cero.png";
import dgtEco from "@/assets/dgt-eco.png";
const VehicleDetail = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const { toast: toastHook } = useToast();
  const { language, getPhoneNumber, getAddress, t, translateVehicleAttribute, formatPrice, getCurrencySymbol } = useLanguage();
  const address = getAddress();

  const getFlag = () => {
    switch (language) {
      case "es": return "🇪🇸";
      case "en": return "🇬🇧";
      case "fr": return "🇫🇷";
      default: return "🇪🇸";
    }
  };
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [isSubmittingAppointment, setIsSubmittingAppointment] = useState(false);
  const [isSubmittingReservation, setIsSubmittingReservation] = useState(false);
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [isContactSubmitted, setIsContactSubmitted] = useState(false);

  // Form data states
  const [appointmentFormData, setAppointmentFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    fecha: "",
    hora: "",
    mensaje: "",
    acceptTerms: false
  });

  const [reservationFormData, setReservationFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: "",
    acceptTerms: false
  });

  const [contactFormData, setContactFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    mensaje: ""
  });
  const {
    data: carData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['car', id],
    queryFn: () => fetchCarById(id!),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
  const vehicle: Vehicle | undefined = carData ? transformApiCarToVehicle(carData) : undefined;
  useEffect(() => {
    if (isError) {
      navigate('/stock');
    }
  }, [isError, navigate]);
  if (isLoading || !vehicle) {
    return <div className="min-h-screen bg-[#0B0B0C]">
        <Header />
        <div className="container mx-auto px-4 pt-8 pb-8">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-video bg-muted rounded"></div>
              <div className="space-y-4">
                <div className="h-6 bg-muted rounded w-2/3"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-10 bg-muted rounded w-1/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>;
  }
  const nextImage = () => {
    setCurrentImageIndex(prev => (prev + 1) % vehicle.images.length);
  };
  const prevImage = () => {
    setCurrentImageIndex(prev => (prev - 1 + vehicle.images.length) % vehicle.images.length);
  };
  const monthlyPayment = Math.round(vehicle.price / 84); // 84 months financing

  const getBadgeImage = (badge?: string) => {
    if (!badge) return null;
    const badgeLower = badge.toLowerCase();
    // Check more specific patterns first to avoid incorrect matches
    if (badgeLower.includes('cero') || badgeLower.includes('0')) return dgtCero;
    if (badgeLower.includes('eco')) return dgtEco;
    if (badgeLower.includes('c')) return dgtC;
    if (badgeLower.includes('b')) return dgtB;
    return null;
  };

  const badgeImage = getBadgeImage(vehicle.environmentalBadge);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(t('vehicle_detail.actions.link_copied'));
  };
  const handleReserve = () => {
    toast.success(t('vehicle_detail.reserve.success'));
  };

  const handleReservationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservationFormData.acceptTerms) {
      toastHook({
        title: "Error",
        description: t('vehicle_detail.errors.privacy_required'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingReservation(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: reservationFormData.nombre,
        lead_lastname: reservationFormData.apellido,
        lead_phone_number: reservationFormData.telefono,
        lead_email: reservationFormData.email,
        message: `RESERVA!\n${reservationFormData.mensaje}`,
        interest_car_id: id
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

      toast.success(t('vehicle_detail.reserve.success'));
      setIsReservationModalOpen(false);
      setReservationFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        mensaje: "",
        acceptTerms: false
      });
    } catch (error) {
      console.error('Error submitting reservation:', error);
      toastHook({
        title: "Error",
        description: t('vehicle_detail.errors.reservation_error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmittingReservation(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appointmentFormData.acceptTerms) {
      toastHook({
        title: "Error",
        description: t('vehicle_detail.errors.privacy_required'),
        variant: "destructive"
      });
      return;
    }

    setIsSubmittingAppointment(true);

    try {
      // Format date from YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = appointmentFormData.fecha.split('-');
      const formattedDate = `${day}/${month}/${year}`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: appointmentFormData.nombre,
        lead_lastname: appointmentFormData.apellido,
        lead_phone_number: appointmentFormData.telefono,
        lead_email: appointmentFormData.email,
        message: `CITA - ${formattedDate} ${appointmentFormData.hora}\n${appointmentFormData.mensaje}`,
        interest_car_id: id,
        meeting_date: appointmentFormData.fecha,
        meeting_time: appointmentFormData.hora
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

      toast.success(t('vehicle_detail.appointment.success'));
      setIsAppointmentModalOpen(false);
      setAppointmentFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        fecha: "",
        hora: "",
        mensaje: "",
        acceptTerms: false
      });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      toastHook({
        title: "Error",
        description: t('vehicle_detail.errors.appointment_error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmittingAppointment(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsSubmittingContact(true);

    try {
      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: contactFormData.nombre,
        lead_lastname: contactFormData.apellido,
        lead_phone_number: contactFormData.telefono,
        lead_email: contactFormData.email,
        message: contactFormData.mensaje,
        interest_car_id: id
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

      setIsContactSubmitted(true);
      setContactFormData({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        mensaje: ""
      });
    } catch (error) {
      console.error('Error submitting contact:', error);
      toastHook({
        title: "Error",
        description: t('vehicle_detail.errors.contact_error'),
        variant: "destructive"
      });
    } finally {
      setIsSubmittingContact(false);
    }
  };
  return <div className="min-h-screen bg-[#0B0B0C]">
      <SEO page="vehicle_detail" vehicleName={vehicle ? `${vehicle.brand} ${vehicle.model}` : undefined} />
      <Header />
      
      <main className="container mx-auto px-4 pt-8 pb-8">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/stock')} className="p-0 h-auto text-muted-foreground hover:text-muted-foreground hover:bg-transparent">
            <ChevronLeft className="w-4 h-4 mr-1" />
            {t('vehicle_detail.breadcrumb.back_to_stock')}
          </Button>
        </nav>

        {/* Vehicle Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold text-white">
              {vehicle.brand} {vehicle.model}
            </h1>
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                vehicle.year,
                translateVehicleAttribute('transmission', vehicle.transmission),
                translateVehicleAttribute('fuel', vehicle.fuel),
                `${vehicle.mileage.toLocaleString()} ${vehicle.mileageUnit}`,
              ].map((b, i) => (
                <span
                  key={i}
                  style={{ animationDelay: `${i * 0.07}s` }}
                  className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#161618] border border-[#27272A] text-white/80 text-xs font-medium cursor-default transition-all duration-300 hover:-translate-y-0.5 hover:border-[#ffff00] hover:text-white hover:shadow-[0_0_12px_rgba(255,255,0,0.25)] animate-[mdgPillIn_0.45s_ease-out_both]"
                >
                  {b}
                </span>
              ))}
            </div>
          </div>
          <Button variant="outline" size="sm" onClick={handleShare} className="flex items-center gap-2 bg-white border-slate-200 text-slate-900/80 hover:border-[#ffff00] hover:text-white hover:bg-[#161618]">
            <Share2 className="w-4 h-4" />
            {t('vehicle_detail.actions.share')}
          </Button>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#161618] border border-[#27272A] group">
              {vehicle.status === 'Reserved' && <ReservedBanner size="large" />}
              <img src={vehicle.images[currentImageIndex]} alt={`${vehicle.brand} ${vehicle.model}`} className="w-full h-full object-cover" />
              {/* inner vignette */}
              <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_0_80px_rgba(0,0,0,0.55)]" />

              {vehicle.images.length > 1 && <>
                  <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 hover:bg-[#ffff00] hover:text-black hover:border-[#ffff00] transition-all">
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-white opacity-0 group-hover:opacity-100 hover:bg-[#ffff00] hover:text-black hover:border-[#ffff00] transition-all">
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-md border border-white/10 text-white/90 px-2.5 py-1 rounded-full text-xs">
                    {currentImageIndex + 1} / {vehicle.images.length}
                  </div>
                </>}
            </div>

            {/* Thumbnail strip — horizontal scroll with yellow scrollbar */}
            {vehicle.images.length > 1 && <div className="mdg-thumbs flex gap-2 overflow-x-auto pb-2.5 snap-x">
                {vehicle.images.map((image, index) => <button key={index} onClick={() => setCurrentImageIndex(index)} className={`snap-start shrink-0 w-28 sm:w-32 aspect-video rounded-lg overflow-hidden border-2 transition-all duration-300 ${currentImageIndex === index ? 'border-[#ffff00] opacity-100 shadow-[0_0_14px_-2px_rgba(255,255,0,0.5)]' : 'border-[#27272A] opacity-50 hover:opacity-90'}`}>
                    <img src={image} alt={`${t('vehicle_detail.gallery.view_label')} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>)}
              </div>}

            <style>{`
              .mdg-thumbs { scrollbar-width: thin; scrollbar-color: #ffff00 #161618; }
              .mdg-thumbs::-webkit-scrollbar { height: 8px; }
              .mdg-thumbs::-webkit-scrollbar-track { background: #161618; border-radius: 9999px; }
              .mdg-thumbs::-webkit-scrollbar-thumb { background: #ffff00; border-radius: 9999px; }
              .mdg-thumbs::-webkit-scrollbar-thumb:hover { background: #e6e600; }
              @keyframes mdgPillIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
            `}</style>

            {/* Vehicle Description */}
            <div className="bg-[#161618] border border-[#27272A] rounded-2xl overflow-hidden">
              <div className="px-6 py-4 border-b border-[#27272A] flex items-center gap-2">
                <span className="w-1.5 h-5 bg-[#ffff00] rounded-full" />
                <h2 className="font-bold text-white">{t('vehicle_detail.details.title')}</h2>
              </div>
              <div className="p-6">
                {vehicle.description ? (
                  <div className="text-sm text-white/90 leading-relaxed whitespace-pre-line">
                    {vehicle.description}
                  </div>
                ) : (
                  <div className="space-y-3 text-sm text-white/90">
                    <p><strong className="text-white">{vehicle.brand} {vehicle.model}</strong></p>
                    <p>{t('vehicle_detail.details.financing')}</p>
                    <p>{t('vehicle_detail.details.warranty')}</p>
                    <p>{t('vehicle_detail.details.transfer_costs')} {formatPrice(260)}.</p>
                    <p>{t('vehicle_detail.details.trade_in')}</p>
                    <p>{t('vehicle_detail.details.delivery')}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Spec sheet grid */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1.5 h-5 bg-[#ffff00] rounded-full" />
                <h2 className="text-xl font-bold text-white">{t('vehicle_detail.specifications.title')}</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: t('vehicle_detail.specifications.year'), value: vehicle.year },
                  { label: t('vehicle_detail.specifications.mileage'), value: `${vehicle.mileage.toLocaleString()} ${vehicle.mileageUnit}` },
                  { label: t('vehicle_detail.specifications.fuel'), value: translateVehicleAttribute('fuel', vehicle.fuel) },
                  { label: t('vehicle_detail.specifications.transmission'), value: translateVehicleAttribute('transmission', vehicle.transmission) },
                  { label: t('vehicle_detail.specifications.body_type'), value: translateVehicleAttribute('body_type', vehicle.type) },
                  vehicle.enginePower ? { label: t('vehicle_detail.specifications.engine_power'), value: `${vehicle.enginePower} CV` } : null,
                  vehicle.engineSize ? { label: t('vehicle_detail.specifications.engine_size'), value: `${vehicle.engineSize} ${vehicle.engineSizeUnit}` } : null,
                  vehicle.color ? { label: t('vehicle_detail.specifications.color'), value: translateVehicleAttribute('color', vehicle.color) } : null,
                  vehicle.doors ? { label: t('vehicle_detail.specifications.doors'), value: vehicle.doors } : null,
                  vehicle.seats ? { label: t('vehicle_detail.specifications.seats'), value: vehicle.seats } : null,
                ].filter(Boolean).map((sp: { label: string; value: string | number }, i) => (
                  <div key={i} className="mdg-feature-card rounded-xl p-4 transition-all duration-300">
                    <div className="text-lg font-bold text-white leading-tight truncate">{sp.value}</div>
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#D4D4D8] mt-1">{sp.label}</div>
                  </div>
                ))}
                {badgeImage && (
                  <div className="mdg-feature-card rounded-xl p-4 flex flex-col items-start transition-all duration-300">
                    <img src={badgeImage} alt={`Badge ${vehicle.environmentalBadge}`} className="w-9 h-9" />
                    <div className="text-[10px] uppercase tracking-[0.15em] text-[#D4D4D8] mt-1">{t('vehicle_detail.specifications.environmental_badge')}</div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Vehicle Information */}
          <div className="space-y-6 sticky top-24 self-start">
            {/* Pricing */}
            <div className="bg-[#161618] border border-[#27272A] rounded-2xl p-5">
              <div className="text-xs uppercase tracking-[0.15em] text-[#D4D4D8] mb-1">{t('vehicle_detail.pricing.label')}</div>
              <div className="text-4xl font-heading font-bold text-[#ffff00]">
                {formatPrice(vehicle.price)}
              </div>
            </div>

            {/* Reserve Button */}
            {vehicle.status !== 'Reserved' && (
            <Card className="bg-[#ffff00]/[0.08] border border-[#ffff00]/40 shadow-[0_0_30px_rgba(255,255,0,0.06)]">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-[#ffff00] rounded-full animate-pulse"></div>
                  <span className="font-bold text-white">{t('vehicle_detail.reserve.title')} {vehicle.brand} {vehicle.model}</span>
                </div>
                <p className="text-sm mb-4 text-[#D4D4D8]">
                  {t('vehicle_detail.reserve.description')}
                </p>
                <Dialog open={isReservationModalOpen} onOpenChange={setIsReservationModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-[#ffff00] hover:bg-[#e6e600] text-black font-bold rounded-xl hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_rgba(255,255,0,0.4)] transition-all duration-300">
                      {t('vehicle_detail.reserve.button')}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md mdg-form-light">
                    <DialogHeader>
                      <DialogTitle className="text-lg font-semibold text-foreground">
                        {t('vehicle_detail.reserve.modal_title')} {vehicle.brand} {vehicle.model}
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleReservationSubmit} className="space-y-6 mt-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reservationName" className="text-[#D4D4D8]">{t('vehicle_detail.form.name')}</Label>
                          <Input
                            id="reservationName"
                            placeholder={t('vehicle_detail.form.name_placeholder')}
                            required
                            className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                            value={reservationFormData.nombre}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, nombre: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reservationSurname" className="text-[#D4D4D8]">{t('vehicle_detail.form.surname')}</Label>
                          <Input
                            id="reservationSurname"
                            placeholder={t('vehicle_detail.form.surname_placeholder')}
                            required
                            className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                            value={reservationFormData.apellido}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, apellido: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="reservationEmail" className="text-[#D4D4D8]">{t('vehicle_detail.form.email')}</Label>
                          <Input
                            id="reservationEmail"
                            type="email"
                            placeholder={t('vehicle_detail.form.email_placeholder')}
                            required
                            className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                            value={reservationFormData.email}
                            onChange={(e) => setReservationFormData({ ...reservationFormData, email: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="reservationPhone" className="text-[#D4D4D8]">{t('vehicle_detail.form.phone')}</Label>
                          <div className="flex">
                            <div className="flex items-center px-3 bg-[#0B0B0C] border border-r-0 border-[#27272A] rounded-l-md">
                              <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                            </div>
                            <Input
                              id="reservationPhone"
                              placeholder={t('vehicle_detail.form.phone_placeholder')}
                              className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)] rounded-l-none"
                              required
                              value={reservationFormData.telefono}
                              onChange={(e) => setReservationFormData({ ...reservationFormData, telefono: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="reservationMessage" className="text-[#D4D4D8]">{t('vehicle_detail.form.message')}</Label>
                        <Textarea
                          id="reservationMessage"
                          placeholder={`${t('vehicle_detail.form.message_placeholder_reserve')} ${vehicle.brand} ${vehicle.model}`}
                          className="min-h-[80px] resize-none bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                          required
                          rows={5}
                          value={reservationFormData.mensaje}
                          onChange={(e) => setReservationFormData({ ...reservationFormData, mensaje: e.target.value })}
                        />
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="reservationTerms"
                          required
                          className="mt-1"
                          checked={reservationFormData.acceptTerms}
                          onCheckedChange={(checked) => setReservationFormData({ ...reservationFormData, acceptTerms: checked as boolean })}
                        />
                        <Label htmlFor="reservationTerms" className="text-sm text-[#D4D4D8]">
                          {t('vehicle_detail.form.accept_terms')}{" "}
                          <button type="button" onClick={() => setOpenPrivacyModal(true)} className="text-[#ffff00] hover:text-[#ffff00]/70 underline cursor-pointer">
                            {t('vehicle_detail.form.privacy_policy')}
                          </button>.
                        </Label>
                      </div>

                      <Button type="submit" disabled={isSubmittingReservation} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3">
                        {isSubmittingReservation ? t('vehicle_detail.form.submitting') : t('vehicle_detail.form.confirm_reservation')}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
            )}

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <a href={`tel:${getPhoneNumber()}`} className="mdg-feature-card flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all duration-300">
                <Phone className="w-4 h-4" />
                {t('vehicle_detail.actions.call_now')}
              </a>
              <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
                <DialogTrigger asChild>
                  <button type="button" className="mdg-feature-card flex items-center justify-center gap-2 rounded-xl py-3 px-4 text-sm font-semibold text-white transition-all duration-300">
                    <Calendar className="w-4 h-4" />
                    {t('vehicle_detail.actions.schedule_appointment')}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md mdg-form-light">
                  <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-foreground">
                      {t('vehicle_detail.appointment.modal_title')}
                    </DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAppointmentSubmit} className="space-y-6 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentName" className="text-[#D4D4D8]">{t('vehicle_detail.form.name')}</Label>
                        <Input
                          id="appointmentName"
                          placeholder={t('vehicle_detail.form.name_placeholder')}
                          required
                          className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                          value={appointmentFormData.nombre}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, nombre: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentSurname" className="text-[#D4D4D8]">{t('vehicle_detail.form.surname')}</Label>
                        <Input
                          id="appointmentSurname"
                          placeholder={t('vehicle_detail.form.surname_placeholder')}
                          required
                          className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                          value={appointmentFormData.apellido}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, apellido: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentEmail" className="text-[#D4D4D8]">{t('vehicle_detail.form.email')}</Label>
                        <Input
                          id="appointmentEmail"
                          type="email"
                          placeholder={t('vehicle_detail.form.email_placeholder')}
                          required
                          className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                          value={appointmentFormData.email}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, email: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentPhone" className="text-[#D4D4D8]">{t('vehicle_detail.form.phone')}</Label>
                        <div className="flex">
                          <div className="flex items-center px-3 bg-[#0B0B0C] border border-r-0 border-[#27272A] rounded-l-md">
                            <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                          </div>
                          <Input
                            id="appointmentPhone"
                            placeholder={t('vehicle_detail.form.phone_placeholder')}
                            className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)] rounded-l-none"
                            required
                            value={appointmentFormData.telefono}
                            onChange={(e) => setAppointmentFormData({ ...appointmentFormData, telefono: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="appointmentDate" className="text-[#D4D4D8]">{t('vehicle_detail.appointment.date_label')}</Label>
                        <Input
                          id="appointmentDate"
                          type="date"
                          required
                          className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)] text-foreground placeholder:text-muted-foreground"
                          value={appointmentFormData.fecha}
                          onChange={(e) => setAppointmentFormData({ ...appointmentFormData, fecha: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="appointmentTime" className="text-[#D4D4D8]">{t('vehicle_detail.appointment.time_label')}</Label>
                        <Select
                          required
                          value={appointmentFormData.hora}
                          onValueChange={(value) => setAppointmentFormData({ ...appointmentFormData, hora: value })}
                        >
                          <SelectTrigger className="bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)] text-foreground data-[placeholder]:text-muted-foreground">
                            <SelectValue placeholder={t('vehicle_detail.appointment.time_placeholder')} />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="09:00">09:00</SelectItem>
                            <SelectItem value="09:30">09:30</SelectItem>
                            <SelectItem value="10:00">10:00</SelectItem>
                            <SelectItem value="10:30">10:30</SelectItem>
                            <SelectItem value="11:00">11:00</SelectItem>
                            <SelectItem value="11:30">11:30</SelectItem>
                            <SelectItem value="12:00">12:00</SelectItem>
                            <SelectItem value="12:30">12:30</SelectItem>
                            <SelectItem value="16:00">16:00</SelectItem>
                            <SelectItem value="16:30">16:30</SelectItem>
                            <SelectItem value="17:00">17:00</SelectItem>
                            <SelectItem value="17:30">17:30</SelectItem>
                            <SelectItem value="18:00">18:00</SelectItem>
                            <SelectItem value="18:30">18:30</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="appointmentMessage" className="text-[#D4D4D8]">{t('vehicle_detail.form.message')}</Label>
                      <Textarea
                        id="appointmentMessage"
                        placeholder={`${t('vehicle_detail.appointment.message_placeholder')} ${vehicle.brand} ${vehicle.model}`}
                        className="min-h-[80px] resize-none bg-[#0B0B0C] border-[#27272A] text-white placeholder:text-white/85 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_10px_rgba(255,255,0,0.2)]"
                        required
                        rows={5}
                        value={appointmentFormData.mensaje}
                        onChange={(e) => setAppointmentFormData({ ...appointmentFormData, mensaje: e.target.value })}
                      />
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="appointmentTerms"
                        required
                        className="mt-1"
                        checked={appointmentFormData.acceptTerms}
                        onCheckedChange={(checked) => setAppointmentFormData({ ...appointmentFormData, acceptTerms: checked as boolean })}
                      />
                      <Label htmlFor="appointmentTerms" className="text-sm text-[#D4D4D8]">
                        {t('vehicle_detail.form.accept_terms')}{" "}
                        <button type="button" onClick={() => setOpenPrivacyModal(true)} className="text-[#ffff00] hover:text-[#ffff00]/70 underline cursor-pointer">
                          {t('vehicle_detail.form.privacy_policy')}
                        </button>.
                      </Label>
                    </div>

                    <Button type="submit" disabled={isSubmittingAppointment} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-3">
                      {isSubmittingAppointment ? t('vehicle_detail.form.submitting') : t('vehicle_detail.form.submit')}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {/* Contact Form */}
            <Card className="mdg-form-light border rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-slate-900">
                  {t('vehicle_detail.contact.title')}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isContactSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {t('vehicle_detail.contact.success_title')}
                    </h3>
                    <p className="text-slate-600 mb-6">
                      {t('vehicle_detail.contact.success_description')}
                    </p>
                    <Button
                      onClick={() => {
                        setIsContactSubmitted(false);
                      }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold border border-slate-300"
                    >
                      {t('vehicle_detail.contact.send_another')}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">{t('vehicle_detail.form.name')}</Label>
                      <Input
                        id="name"
                        placeholder={t('vehicle_detail.form.name_placeholder')}
                        required
                        className="bg-white border border-slate-300"
                        value={contactFormData.nombre}
                        onChange={(e) => setContactFormData({ ...contactFormData, nombre: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="surname">{t('vehicle_detail.form.surname')}</Label>
                      <Input
                        id="surname"
                        placeholder={t('vehicle_detail.form.surname_placeholder')}
                        required
                        className="bg-white border border-slate-300"
                        value={contactFormData.apellido}
                        onChange={(e) => setContactFormData({ ...contactFormData, apellido: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">{t('vehicle_detail.form.email')}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t('vehicle_detail.form.email_placeholder')}
                        required
                        className="bg-white border border-slate-300"
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData({ ...contactFormData, email: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">{t('vehicle_detail.form.phone')}</Label>
                      <div className="flex">
                        <div className="flex items-center px-3 border border-r-0 border-slate-300 rounded-l-md bg-slate-100 text-slate-700 text-sm whitespace-nowrap">
                          {getFlag()} {language === "es" ? "+34" : language === "en" ? "+44" : "+33"}
                        </div>
                        <Input
                          id="phone"
                          placeholder={t('vehicle_detail.form.phone_placeholder')}
                          className="rounded-l-none bg-white border border-slate-300"
                          required
                          value={contactFormData.telefono}
                          onChange={(e) => setContactFormData({ ...contactFormData, telefono: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">{t('vehicle_detail.form.message')}</Label>
                      <Textarea
                        id="message"
                        placeholder={`${t('vehicle_detail.contact.message_placeholder')} ${vehicle.brand} ${vehicle.model}`}
                        className="min-h-[80px] bg-white border border-slate-300"
                        required
                        value={contactFormData.mensaje}
                        onChange={(e) => setContactFormData({ ...contactFormData, mensaje: e.target.value })}
                      />
                    </div>
                    <Button type="submit" disabled={isSubmittingContact} className="w-full">
                      {isSubmittingContact ? t('vehicle_detail.form.submitting') : t('vehicle_detail.contact.submit_button')}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>


        {/* Trade-in Offer */}
        
      </main>

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
              <div className="bg-muted/50 p-4 rounded-lg">
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
    </div>;
};
export default VehicleDetail;