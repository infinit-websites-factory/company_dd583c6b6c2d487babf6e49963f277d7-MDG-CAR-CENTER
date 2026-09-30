import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import SEO from "@/components/SEO";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2, ArrowRight, ArrowLeft, CheckCircle, Shield, Clock, Sparkles, Car } from "lucide-react";
import sellBg from "@/assets/img1.jpg";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const Sell = () => {
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
  const [currentStep, setCurrentStep] = useState(1);
  const [openPrivacyModal, setOpenPrivacyModal] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    tipoVehiculo: "turismo",
    marca: "",
    modelo: "",
    ano: "",
    carroceria: "",
    color: "",
    combustible: "",
    tipoCambio: "",
    version: "",
    kilometraje: "",
    matricula: "",
    cuandoVender: "",
    interesIntercambio: "",
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    acceptPrivacy: false
  });

  const totalSteps = 3;
  const progress = (currentStep / totalSteps) * 100;

  // Vehicle type specific marca lists
  const marcasTurismo = [
    "Abarth", "Aiways", "Aixam", "Alfa Romeo", "Alpine", "Aro", "Asia", "Aston Martin", "Audi",
    "Baic", "Bentley", "Bestune", "BMW", "BYD", "Cadillac", "Chevrolet", "Chrysler", "Citroën",
    "Corvette", "CUPRA", "Dacia", "Daewoo", "Daihatsu", "Daimler", "Dodge", "Dongfeng", "DR AUTOMOBILES",
    "DS", "DFSK", "EBRO", "EVO", "Ferrari", "Fiat", "Fisker", "Ford", "Galloper", "Honda", "HONGQI",
    "HUMMER", "Hyundai", "Ineos", "Infiniti", "Innocenti", "Isuzu", "Iveco", "JAECOO", "Jaguar",
    "Jeep", "Kia", "KIA", "KGM", "Lada", "Lamborghini", "Lancia", "Land Rover", "Leapmotor", "Lexus",
    "Ligier", "Livan", "Lotus", "Lynk & Co", "Mahindra", "Maserati", "Maybach", "Mazda", "MCC",
    "McLaren", "Mercedes", "Mercedes-Benz", "MG", "MHero", "Micro", "MINI", "Mitsubishi", "Morgan",
    "MAXUS", "Nissan", "OMODA", "Opel", "Peugeot", "Pilote", "Polestar", "Pontiac", "Porsche",
    "Renault", "Rolls-Royce", "Rover", "Saab", "Santana", "SEAT", "SERES", "Skoda", "Skywell",
    "smart", "Smart", "SsangYong", "Subaru", "Suzuki", "SWM", "TATA", "Tesla", "Toyota", "UMM",
    "VAZ", "Volkswagen", "Volvo", "Voyah", "Weinsberg", "Xpeng", "Yooudooo", "Yudo", "Zhidou"
  ];

  const marcasIndustrial = [
    "Baic", "BYD", "Cenntro", "Citroën", "Dacia", "Daewoo", "DAF", "Daihatsu", "DFSK", "DR AUTOMOBILES",
    "DSK", "EVO", "EVUM", "Farizon", "Fiat", "Ford", "Foton", "Hyundai", "Ineos", "Isuzu", "Iveco",
    "Jeep", "KGM", "KIA", "Lada", "Land Rover", "LDV", "LEVC", "Ligier", "Livan", "Mahindra", "MAN",
    "MAXUS", "Mazda", "Mercedes", "Mercedes-Benz", "Mitsubishi", "Mitsubishi Fuso", "MW Motors",
    "Nextem", "Nissan", "Opel", "Peugeot", "Piaggio", "RAM", "Renault", "Renault Trucks", "SaIC",
    "SAIC MAXUS", "Santana", "Scania", "SEAT", "Skoda", "SsangYong", "Suzuki", "TATA", "Toyota",
    "UMM", "Volkswagen", "Volvo"
  ];

  // Generate years from 2025 down to 2000
  const years = Array.from({ length: 26 }, (_, i) => (2025 - i).toString());

  // Body-type options depend on the vehicle type
  const carroceriaTurismo = ["berlina", "coupe", "cabrio", "familiar", "monovolumen", "suv", "pickup", "otro"];
  const carroceriaIndustrial = ["furgon", "furgoneta", "chasis", "camion", "isotermo", "volquete", "otro"];
  const carroceriaOptions = formData.tipoVehiculo === "industrial" ? carroceriaIndustrial : carroceriaTurismo;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Reset marca + carrocería when vehicle type changes (option lists differ)
    if (field === "tipoVehiculo") {
      setFormData({ ...formData, [field]: value, marca: "", carroceria: "" });
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate all required Step 1 fields
    if (!formData.marca) {
      newErrors.marca = t("sell_page.form.required_field");
    }
    if (!formData.ano) {
      newErrors.ano = t("sell_page.form.required_field");
    }
    if (!formData.combustible) {
      newErrors.combustible = t("sell_page.form.required_field");
    }
    if (!formData.tipoCambio) {
      newErrors.tipoCambio = t("sell_page.form.required_field");
    }
    if (!formData.carroceria) {
      newErrors.carroceria = t("sell_page.form.required_field");
    }

    setErrors(newErrors);

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    // Validate Step 2 fields
    if (!formData.cuandoVender) {
      newErrors.cuandoVender = t("sell_page.form.required_field");
    }
    if (!formData.interesIntercambio) {
      newErrors.interesIntercambio = t("sell_page.form.required_field");
    }

    setErrors(newErrors);

    // Check privacy acceptance
    if (!formData.acceptPrivacy) {
      toast({
        title: "Error",
        description: t("sell_page.errors.privacy_required"),
        variant: "destructive"
      });
      return;
    }

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Build the message
      const tipoVehiculoLabel = formData.tipoVehiculo === "turismo" ? "Turismo" : "Industrial";
      const cuandoVenderLabels: Record<string, string> = {
        "lo-antes-posible": "Lo antes posible",
        "4-semanas": "En las próximas 4 semanas",
        "4-meses": "En los próximos 4 meses",
        "no-decidido": "Aún no lo he decidido"
      };
      const interesIntercambioLabel = formData.interesIntercambio === "si" ? "Sí" : "No";

      let message = `SOLICITUD DE TASACIÓN

=== DATOS DEL VEHÍCULO ===
Tipo: ${tipoVehiculoLabel}
Marca: ${formData.marca}
Modelo: ${formData.modelo}
Versión: ${formData.version}
Año: ${formData.ano}`;

      if (formData.carroceria) {
        message += `\nCarrocería: ${formData.carroceria.charAt(0).toUpperCase() + formData.carroceria.slice(1)}`;
      }

      message += `
Color: ${formData.color}
Combustible: ${formData.combustible.charAt(0).toUpperCase() + formData.combustible.slice(1)}
Tipo de cambio: ${formData.tipoCambio.charAt(0).toUpperCase() + formData.tipoCambio.slice(1)}
Kilometraje: ${formData.kilometraje} km`;

      if (formData.matricula) {
        message += `\nMatrícula: ${formData.matricula}`;
      }

      message += `

=== INTENCIÓN DEL VENDEDOR ===
¿Cuándo planea vender?: ${cuandoVenderLabels[formData.cuandoVender]}
¿Interesado en comprar un coche a cambio?: ${interesIntercambioLabel}`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: formData.nombre,
        lead_lastname: formData.apellido,
        lead_phone_number: formData.telefono,
        lead_email: formData.email,
        message: message
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

      setCurrentStep(3);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error",
        description: t("sell_page.errors.submission_error"),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO page="sell" />
      <Header />

      <main className="flex-1">
        {/* Hero Section with Form */}
        <section className="relative pt-12 pb-20 px-4 overflow-hidden bg-[#0B0B0C]">
          {/* Radial spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(255,255,0,0.04)_0%,transparent_55%)] pointer-events-none" />

          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
              {/* Left side - Title, subtitle, and benefits */}
              <div className="lg:col-span-2 space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161618] border border-[#ffff00]/40 text-[#ffff00] text-sm font-semibold">
                    <Car className="w-4 h-4" />
                    Tasación Gratuita de tu Vehículo
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                    {t("sell_page.hero.title")}
                  </h1>
                  <p className="text-xl text-[#D4D4D8] leading-relaxed">
                    {t("sell_page.hero.subtitle")}
                  </p>
                </div>

                {/* Benefits checklist */}
                <div className="space-y-5">
                  {[
                    { icon: Sparkles, titleKey: "sell_page.benefits.best_price.title", descKey: "sell_page.benefits.best_price.description" },
                    { icon: Clock, titleKey: "sell_page.benefits.fast_process.title", descKey: "sell_page.benefits.fast_process.description" },
                    { icon: Shield, titleKey: "sell_page.benefits.no_commitment.title", descKey: "sell_page.benefits.no_commitment.description" },
                    { icon: CheckCircle2, titleKey: "sell_page.benefits.any_vehicle.title", descKey: "sell_page.benefits.any_vehicle.description" },
                  ].map((b, i) => {
                    const BIcon = b.icon;
                    return (
                      <div key={i} className="flex items-start gap-4 p-4 rounded-3xl bg-[#161618]/90 backdrop-blur-md border-2 border-[#ffff00]/60 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.8),0_0_36px_-14px_rgba(255,255,0,0.28)] hover:border-[#ffff00] hover:-translate-y-0.5 hover:shadow-[0_20px_45px_-16px_rgba(0,0,0,0.85),0_0_48px_-10px_rgba(255,255,0,0.42)] transition-all duration-300">
                        <div className="flex-shrink-0 bg-[#ffff00] text-black rounded-xl p-3 shadow-md flex items-center justify-center">
                          <BIcon className="w-5 h-5 text-black" />
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-white mb-1">{t(b.titleKey as any)}</h3>
                          <p className="text-slate-300 text-xs font-normal">{t(b.descKey as any)}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Right side - Form */}
              <div className="lg:col-span-3">
                <Card className="mdg-form-light bg-[#161618] border rounded-3xl shadow-2xl">
                  <CardHeader className="space-y-4">
                    {/* Step indicator */}
                    {currentStep !== 3 && (
                      <div className="mb-1">
                        <div className="flex items-center justify-between text-xs font-semibold mb-2">
                          <span className={currentStep >= 1 ? "text-[#ffff00]" : "text-white/85"}>Paso 01 · Datos del Vehículo</span>
                          <span className={currentStep >= 2 ? "text-[#ffff00]" : "text-white/85"}>Paso 02 · Contacto</span>
                        </div>
                        <div className="h-1.5 w-full bg-[#0B0B0C] rounded-full overflow-hidden border border-[#27272A]">
                          <div
                            className="h-full bg-[#ffff00] rounded-full transition-all duration-500"
                            style={{ width: currentStep >= 2 ? "100%" : "50%" }}
                          />
                        </div>
                      </div>
                    )}

                    {currentStep === 1 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-white">{t("sell_page.form.step1.title")}</CardTitle>
                        <p className="text-sm text-[#D4D4D8]">
                          {t("sell_page.form.step1.subtitle")}
                        </p>
                      </div>
                    )}

                    {currentStep === 2 && (
                      <div className="space-y-2">
                        <CardTitle className="text-2xl text-white">{t("sell_page.form.step2.title")}</CardTitle>
                        <p className="text-sm text-[#D4D4D8]">
                          {t("sell_page.form.step2.subtitle")}
                        </p>
                      </div>
                    )}

                    {currentStep === 3 && null}
                  </CardHeader>
                
                <CardContent>
                  {/* Step 1: Vehicle Details */}
                  {currentStep === 1 && (
                    <form onSubmit={handleNext} className="space-y-6">
                      <div className="space-y-6 animate-fade-in">
                        {/* Vehicle Type Toggle Buttons */}
                        <div className="space-y-2">
                          <Label className="text-slate-800 text-xs font-bold">{t("sell_page.form.vehicle_type")} {t("sell_page.form.required")}</Label>
                          <div className="grid grid-cols-2 gap-3">
                            <button
                              type="button"
                              className={`h-11 rounded-xl border px-4 text-sm transition-all ${formData.tipoVehiculo === "turismo" ? "bg-[#ffff00] text-black border-[#ffff00] font-bold shadow-sm" : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 font-medium"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "turismo")}
                            >
                              {t("sell_page.form.vehicle_type_tourism")}
                            </button>
                            <button
                              type="button"
                              className={`h-11 rounded-xl border px-4 text-sm transition-all ${formData.tipoVehiculo === "industrial" ? "bg-[#ffff00] text-black border-[#ffff00] font-bold shadow-sm" : "bg-slate-100 text-slate-700 border-transparent hover:bg-slate-200 font-medium"}`}
                              onClick={() => handleSelectChange("tipoVehiculo", "industrial")}
                            >
                              {t("sell_page.form.vehicle_type_industrial")}
                            </button>
                          </div>
                        </div>

                        {/* Marca - Modelo */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="marca" className="text-slate-800 text-xs font-bold">{t("sell_page.form.brand")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.marca}
                              onValueChange={(value) => {
                                handleSelectChange("marca", value);
                                setErrors({ ...errors, marca: "" });
                              }}
                              required
                              disabled={!formData.tipoVehiculo}
                            >
                              <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.marca ? "border-red-500" : "border-[#27272A]"}`}>
                                <SelectValue placeholder={t("sell_page.form.brand_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                {(formData.tipoVehiculo === "turismo" ? marcasTurismo : marcasIndustrial).map((marca) => (
                                  <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.marca && <p className="text-sm text-red-500">{errors.marca}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="modelo" className="text-slate-800 text-xs font-bold">{t("sell_page.form.model")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="modelo"
                              placeholder={t("sell_page.form.model_placeholder")}
                              value={formData.modelo}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                        </div>

                        {/* Versión - Carrocería */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="version" className="text-slate-800 text-xs font-bold">{t("sell_page.form.version")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="version"
                              placeholder={t("sell_page.form.version_placeholder")}
                              value={formData.version}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="carroceria" className="text-slate-800 text-xs font-bold">{t("sell_page.form.body_type")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.carroceria}
                              onValueChange={(value) => {
                                handleSelectChange("carroceria", value);
                                setErrors({ ...errors, carroceria: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.carroceria ? "border-red-500" : "border-[#27272A]"}`}>
                                <SelectValue placeholder={t("sell_page.form.body_type_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                {carroceriaOptions.map((c) => (
                                  <SelectItem key={c} value={c}>{t(`sell_page.form.body_types.${c}` as any)}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.carroceria && <p className="text-sm text-red-500">{errors.carroceria}</p>}
                          </div>
                        </div>

                        {/* Tipo de cambio - Combustible */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="tipoCambio" className="text-slate-800 text-xs font-bold">{t("sell_page.form.transmission")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.tipoCambio}
                              onValueChange={(value) => {
                                handleSelectChange("tipoCambio", value);
                                setErrors({ ...errors, tipoCambio: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.tipoCambio ? "border-red-500" : "border-[#27272A]"}`}>
                                <SelectValue placeholder={t("sell_page.form.transmission_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="manual">{t("sell_page.form.transmission_types.manual")}</SelectItem>
                                <SelectItem value="automatico">{t("sell_page.form.transmission_types.automatico")}</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.tipoCambio && <p className="text-sm text-red-500">{errors.tipoCambio}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="combustible" className="text-slate-800 text-xs font-bold">{t("sell_page.form.fuel")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.combustible}
                              onValueChange={(value) => {
                                handleSelectChange("combustible", value);
                                setErrors({ ...errors, combustible: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.combustible ? "border-red-500" : "border-[#27272A]"}`}>
                                <SelectValue placeholder={t("sell_page.form.fuel_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="gasolina">{t("sell_page.form.fuel_types.gasolina")}</SelectItem>
                                <SelectItem value="diesel">{t("sell_page.form.fuel_types.diesel")}</SelectItem>
                                <SelectItem value="hibrido">{t("sell_page.form.fuel_types.hibrido")}</SelectItem>
                                <SelectItem value="hibrido-enchufable">{t("sell_page.form.fuel_types.hibrido_enchufable")}</SelectItem>
                                <SelectItem value="electrico">{t("sell_page.form.fuel_types.electrico")}</SelectItem>
                                <SelectItem value="gas">{t("sell_page.form.fuel_types.gas")}</SelectItem>
                              </SelectContent>
                            </Select>
                            {errors.combustible && <p className="text-sm text-red-500">{errors.combustible}</p>}
                          </div>
                        </div>

                        {/* Año - Color */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="ano" className="text-slate-800 text-xs font-bold">{t("sell_page.form.year")} {t("sell_page.form.required")}</Label>
                            <Select
                              value={formData.ano}
                              onValueChange={(value) => {
                                handleSelectChange("ano", value);
                                setErrors({ ...errors, ano: "" });
                              }}
                              required
                            >
                              <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.ano ? "border-red-500" : "border-[#27272A]"}`}>
                                <SelectValue placeholder={t("sell_page.form.year_placeholder")} />
                              </SelectTrigger>
                              <SelectContent>
                                {years.map((year) => (
                                  <SelectItem key={year} value={year}>{year}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {errors.ano && <p className="text-sm text-red-500">{errors.ano}</p>}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="color" className="text-slate-800 text-xs font-bold">{t("sell_page.form.color")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="color"
                              placeholder={t("sell_page.form.color_placeholder")}
                              value={formData.color}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                        </div>

                        {/* Kilometraje - Matrícula */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="kilometraje" className="text-slate-800 text-xs font-bold">{t("sell_page.form.mileage")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="kilometraje"
                              type="number"
                              placeholder={t("sell_page.form.mileage_placeholder")}
                              value={formData.kilometraje}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="matricula" className="text-slate-800 text-xs font-bold">{t("sell_page.form.license_plate")}</Label>
                            <Input
                              id="matricula"
                              placeholder={t("sell_page.form.license_plate_placeholder")}
                              value={formData.matricula}
                              onChange={handleInputChange}
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                        </div>

                        <Button
                          type="submit"
                          className="w-full"
                          size="lg"
                        >
                          {t("sell_page.form.continue")}
                        </Button>
                      </div>
                    </form>
                  )}

                  {/* Step 2: Contact Details */}
                  {currentStep === 2 && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-6 animate-fade-in">
                        <div className="space-y-2">
                          <Label htmlFor="cuandoVender" className="text-slate-800 text-xs font-bold">{t("sell_page.form.when_to_sell")} {t("sell_page.form.required")}</Label>
                          <Select
                            value={formData.cuandoVender}
                            onValueChange={(value) => {
                              handleSelectChange("cuandoVender", value);
                              setErrors({ ...errors, cuandoVender: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.cuandoVender ? "border-red-500" : "border-[#27272A]"}`}>
                              <SelectValue placeholder={t("sell_page.form.when_to_sell_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="lo-antes-posible">{t("sell_page.form.when_to_sell_options.asap")}</SelectItem>
                              <SelectItem value="4-semanas">{t("sell_page.form.when_to_sell_options.4_weeks")}</SelectItem>
                              <SelectItem value="4-meses">{t("sell_page.form.when_to_sell_options.4_months")}</SelectItem>
                              <SelectItem value="no-decidido">{t("sell_page.form.when_to_sell_options.not_decided")}</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.cuandoVender && <p className="text-sm text-red-500">{errors.cuandoVender}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="interesIntercambio" className="text-slate-800 text-xs font-bold">{t("sell_page.form.interested_trade")} {t("sell_page.form.required")}</Label>
                          <Select
                            value={formData.interesIntercambio}
                            onValueChange={(value) => {
                              handleSelectChange("interesIntercambio", value);
                              setErrors({ ...errors, interesIntercambio: "" });
                            }}
                            required
                          >
                            <SelectTrigger className={`bg-[#0B0B0C] data-[placeholder]:text-[#D4D4D8] text-white focus:border-[#ffff00] focus:shadow-[0_0_12px_rgba(255,255,0,0.25)] ${errors.interesIntercambio ? "border-red-500" : "border-[#27272A]"}`}>
                              <SelectValue placeholder={t("sell_page.form.interested_trade_placeholder")} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="si">{t("sell_page.form.yes")}</SelectItem>
                              <SelectItem value="no">{t("sell_page.form.no")}</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.interesIntercambio && <p className="text-sm text-red-500">{errors.interesIntercambio}</p>}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="nombre" className="text-slate-800 text-xs font-bold">{t("sell_page.form.first_name")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="nombre"
                              name="nombre"
                              placeholder={t("sell_page.form.first_name_placeholder")}
                              value={formData.nombre}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apellido" className="text-slate-800 text-xs font-bold">{t("sell_page.form.last_name")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="apellido"
                              name="apellido"
                              placeholder={t("sell_page.form.last_name_placeholder")}
                              value={formData.apellido}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-slate-800 text-xs font-bold">{t("sell_page.form.email")} {t("sell_page.form.required")}</Label>
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder={t("sell_page.form.email_placeholder")}
                              value={formData.email}
                              onChange={handleInputChange}
                              required
                              className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)]"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="telefono" className="text-slate-800 text-xs font-bold">{t("sell_page.form.phone")} {t("sell_page.form.required")}</Label>
                            <div className="flex">
                              <div className="flex items-center px-3 bg-[#101318] border border-r-0 border-[#1F232A] rounded-l-md">
                                <span className="text-sm text-red-600 font-semibold">{getFlag()}</span>
                              </div>
                              <Input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                placeholder={t("sell_page.form.phone_placeholder")}
                                value={formData.telefono}
                                onChange={handleInputChange}
                                required
                                className="bg-[#0B0B0C] border-[#27272A] text-white focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_12px_rgba(255,255,0,0.25)] rounded-l-none"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-start space-x-2">
                            <Checkbox
                              id="acceptPrivacy"
                              checked={formData.acceptPrivacy}
                              onCheckedChange={(checked) =>
                                setFormData({ ...formData, acceptPrivacy: checked as boolean })
                              }
                            />
                            <Label htmlFor="acceptPrivacy" className="text-sm text-white/85">
                              {t("sell_page.form.accept_privacy")}{" "}
                              <button
                                type="button"
                                onClick={() => setOpenPrivacyModal(true)}
                                className="text-white font-medium hover:text-[#D4D4D8] underline"
                              >
                                {t("sell_page.form.privacy_policy")}
                              </button>.
                            </Label>
                          </div>
                        </div>

                        {/* Photo upload hint */}
                        <div className="flex items-start gap-3 p-4 rounded-xl bg-[#ffff00]/10 border border-[#ffff00]/40">
                          <span className="text-2xl flex-shrink-0">📸</span>
                          <div>
                            <p className="text-sm font-semibold text-white mb-1">Añade fotos de tu vehículo</p>
                            <p className="text-xs text-[#D4D4D8] leading-relaxed">
                              Tras enviar el formulario, te recomendamos enviar fotos del vehículo (delantera, trasera, laterales, interior y cuentakilómetros) por WhatsApp al{" "}
                              <a href="tel:+34633406310" className="text-white font-semibold underline">+34 633 40 63 10</a>
                              {" "}o por email a{" "}
                              <a href="mailto:info@mdgcarcenter.com" className="text-white font-semibold underline">info@mdgcarcenter.com</a>
                              . Las fotos nos ayudan a ofrecerte una valoración más precisa.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <Button
                            type="submit"
                            className="w-full"
                            size="lg"
                            disabled={isSubmitting}
                          >
                            {isSubmitting ? t("sell_page.form.validating") : t("sell_page.form.validate")}
                          </Button>
                          <button
                            type="button"
                            onClick={() => {
                              setCurrentStep(1);
                              setFormData({
                                tipoVehiculo: "turismo",
                                marca: "",
                                modelo: "",
                                ano: "",
                                carroceria: "",
                                color: "",
                                combustible: "",
                                tipoCambio: "",
                                version: "",
                                kilometraje: "",
                                matricula: "",
                                cuandoVender: "",
                                interesIntercambio: "",
                                nombre: "",
                                apellido: "",
                                telefono: "",
                                email: "",
                                acceptPrivacy: false
                              });
                            }}
                            className="w-full text-center text-sm text-[#D4D4D8] hover:text-foreground underline"
                          >
                            {t("sell_page.form.cancel")}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}

                  {/* Step 3: Success Message */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-6 text-center py-8 animate-fade-in">
                        <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle className="w-10 h-10 text-green-600" />
                        </div>

                        <div className="space-y-3">
                          <h3 className="text-2xl font-bold text-foreground">
                            {t("sell_page.success.title")}
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            {t("sell_page.success.description")} <span className="font-semibold text-foreground">{t("sell_page.success.hours")}</span> {t("sell_page.success.description_suffix")}
                          </p>
                        </div>

                        {/* Photo reminder + WhatsApp CTA */}
                        <div className="max-w-sm mx-auto p-4 rounded-xl bg-green-900/20 border border-green-700/30 text-left space-y-3">
                          <p className="text-sm font-semibold text-green-400 flex items-center gap-2">
                            <span>📸</span> Siguiente paso: envía las fotos
                          </p>
                          <p className="text-xs text-white/85 leading-relaxed">
                            Para recibir una valoración más precisa, envíanos fotos de tu vehículo (delantera, trasera, laterales, interior y cuentakilómetros).
                          </p>
                          <div className="flex flex-col gap-2 pt-1">
                            <a
                              href={`https://wa.me/34633406310?text=${encodeURIComponent('Hola, acabo de enviar el formulario de tasación y quiero adjuntar las fotos de mi vehículo.')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-[#25D366] text-white text-sm font-semibold rounded-lg hover:bg-[#1ebe5a] transition-colors"
                            >
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                              </svg>
                              Enviar fotos por WhatsApp
                            </a>
                            <a
                              href="mailto:info@mdgcarcenter.com?subject=Fotos tasación vehículo"
                              className="flex items-center justify-center gap-2 w-full py-2.5 px-4 border border-white/20 text-white/90 text-sm font-medium rounded-lg hover:bg-white/5 transition-colors"
                            >
                              Enviar fotos por email
                            </a>
                          </div>
                        </div>

                        <Button
                          type="button"
                          onClick={() => {
                            setCurrentStep(1);
                            setFormData({
                              tipoVehiculo: "turismo",
                              marca: "",
                              modelo: "",
                              ano: "",
                              carroceria: "",
                              color: "",
                              combustible: "",
                              tipoCambio: "",
                              version: "",
                              kilometraje: "",
                              matricula: "",
                              cuandoVender: "",
                              interesIntercambio: "",
                              nombre: "",
                              apellido: "",
                              telefono: "",
                              email: "",
                              acceptPrivacy: false
                            });
                          }}
                          variant="outline"
                          size="lg"
                        >
                          {t("sell_page.success.back_home")}
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ¿Cómo vender tu coche? — 3-step process */}
        <section className="relative py-20 px-4 bg-[#0B0B0C] border-t border-[#27272A] overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(255,255,0,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="container mx-auto max-w-6xl relative z-10">
            {/* Header */}
            <div className="text-center mb-14">
              <p className="text-[#ffff00] text-sm tracking-[0.28em] uppercase mb-3 font-semibold">
                ¿Cómo vender tu coche en MDG?
              </p>
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                Vende o tasa tu coche<br className="hidden md:block" /> en 3 sencillos pasos.
              </h2>
              <p className="text-[#D4D4D8] max-w-2xl mx-auto leading-relaxed">
                Te acompañamos durante todo el proceso para que vender o cambiar tu coche sea fácil, transparente y sin compromiso.
              </p>
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Glowing dotted connector (desktop) */}
              <div
                className="hidden md:block absolute top-[52px] left-[16.66%] right-[16.66%] h-px z-0"
                style={{
                  backgroundImage: "repeating-linear-gradient(90deg, rgba(255,255,0,0.55) 0 8px, transparent 8px 18px)",
                  filter: "drop-shadow(0 0 6px rgba(255,255,0,0.5))",
                }}
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {[
                  {
                    n: "01",
                    title: "Solicita tu tasación gratuita",
                    desc: "Rellena el formulario con los datos de tu vehículo. Recibirás una valoración profesional y sin compromiso en el menor tiempo posible.",
                  },
                  {
                    n: "02",
                    title: "Inspección y recogida",
                    desc: "Revisamos tu coche en nuestras instalaciones de Purullena (Granada) o coordinamos la recogida. Nos desplazamos por toda España.",
                  },
                  {
                    n: "03",
                    title: "Cierre y trámites",
                    desc: "Acordamos el precio y realizamos el pago por transferencia bancaria. Nos encargamos del cambio de nombre y de todo el papeleo por ti.",
                  },
                ].map((step) => (
                  <div
                    key={step.n}
                    className="mdg-feature-card group relative backdrop-blur-xl rounded-2xl p-7 text-center hover:-translate-y-1.5 transition-all duration-500"
                  >
                    {/* Number badge */}
                    <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#ffff00] flex items-center justify-center font-heading font-bold text-xl text-black shadow-[0_0_22px_rgba(255,255,0,0.5)] group-hover:scale-110 transition-transform duration-300">
                      {step.n}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                    <p className="text-[#D4D4D8] text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust badges strip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-14 max-w-3xl mx-auto">
              {[
                "Tasación gratuita y sin compromiso",
                "Entrega y recogida en toda España",
                "Aceptamos tu coche como parte de pago",
                "Gestionamos todos los trámites por ti",
              ].map((label) => (
                <span
                  key={label}
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-[#161618]/80 backdrop-blur-md border border-[#ffff00]/30 text-white/85 text-sm font-medium text-center shadow-[0_4px_14px_rgba(0,0,0,0.5)] hover:border-[#ffff00] hover:text-white hover:-translate-y-0.5 hover:shadow-[0_8px_22px_-6px_rgba(255,255,0,0.4)] transition-all duration-300"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#ffff00] flex-shrink-0 group-hover:scale-110 transition-transform duration-300" />
                  {label}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>

      <FAQ />

      <Footer />

      {/* Privacy Policy Modal */}
      <Dialog open={openPrivacyModal} onOpenChange={setOpenPrivacyModal}>
        <DialogContent className="mdg-form-light max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{t('legal.privacy_policy.title')}</DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-sm text-[#D4D4D8]">
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
    </div>
  );
};

export default Sell;
