import { useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FAQ from "@/components/FAQ";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, CheckCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_FORM_API_URL, PROFILE_ID } from "@/services/carsApi";

const brands = [
  "Audi", "BMW", "Mercedes-Benz", "Volkswagen", "SEAT", "CUPRA", "Volvo", "Porsche",
  "Land Rover", "Mini", "Toyota", "Honda", "Hyundai", "Kia", "Ford", "Renault",
  "Peugeot", "Citroën", "Mazda", "Nissan", "Otra",
];
const fuels = ["Sin preferencia", "Gasolina", "Diésel", "Híbrido", "Híbrido enchufable", "Eléctrico", "GLP / GNC"];
const mileages = ["Sin límite", "Hasta 50.000 km", "50.000 – 100.000 km", "100.000 – 150.000 km", "Más de 150.000 km"];

const inputCls =
  "bg-[#0B0B0C] rounded-xl border-[#27272A] text-white placeholder:text-[#E5E7EB]/60 shadow-[0_4px_12px_rgba(0,0,0,0.5)] transition-all duration-300 hover:border-[#ffff00]/50 focus-visible:ring-0 focus-visible:border-[#ffff00] focus-visible:shadow-[0_0_15px_-2px_rgba(255,255,0,0.25)]";
const triggerCls =
  "bg-[#0B0B0C] rounded-xl border-[#27272A] text-white data-[placeholder]:text-[#D4D4D8] transition-all duration-300 hover:border-[#ffff00]/50 focus:ring-0 focus:border-[#ffff00] data-[state=open]:border-[#ffff00]";
const contentCls = "bg-white border-slate-200 text-slate-900";
const itemCls = "text-slate-900 focus:bg-[#ffff00]/20 focus:text-slate-900";

const Presupuestos = () => {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellidos: "", email: "", telefono: "",
    marca: "", modelo: "", combustible: "", kilometraje: "", mensaje: "",
    acceptPrivacy: false,
  });

  const getFlag = () => (language === "en" ? "🇬🇧" : language === "fr" ? "🇫🇷" : "🇪🇸");
  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.acceptPrivacy) {
      toast({ title: "Error", description: "Debes aceptar la política de privacidad", variant: "destructive" });
      return;
    }
    setIsSubmitting(true);
    try {
      const message = `SOLICITUD A LA CARTA (BAJO PEDIDO)

=== VEHÍCULO DESEADO ===
Marca: ${form.marca || "No especificada"}
Modelo: ${form.modelo || "No especificado"}
Combustible: ${form.combustible || "Sin preferencia"}
Kilometraje: ${form.kilometraje || "Sin límite"}

=== INFORMACIÓN ADICIONAL ===
${form.mensaje || "—"}`;

      const payload = {
        profile_id: PROFILE_ID,
        lead_firstname: form.nombre,
        lead_lastname: form.apellidos,
        lead_phone_number: form.telefono,
        lead_email: form.email,
        message,
      };
      const res = await fetch(CONTACT_FORM_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error submitting à la carte form:", err);
      toast({ title: "Error", description: "Hubo un problema al enviar la solicitud. Inténtalo de nuevo.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col">
      <Helmet>
        <title>Presupuestos · Coches a la carta | MDG CAR CENTER</title>
        <meta name="description" content="Solicita tu coche a la carta en MDG CAR CENTER. Lo importamos y preparamos a tu medida. Cuéntanos qué buscas y te ayudamos a encontrar el vehículo perfecto." />
      </Helmet>
      <Header />

      <main className="flex-1">
        <section className="relative py-16 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(255,255,0,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="container mx-auto max-w-3xl relative z-10">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161618] border border-[#ffff00]/40 text-[#ffff00] text-sm font-semibold mb-5">
                <Sparkles className="w-4 h-4" />
                A la carta
              </div>
              <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
                El coche que buscas, <span className="text-[#ffff00]">a tu medida</span>
              </h1>
              <div className="w-16 h-1 bg-[#ffff00] mx-auto mb-5 rounded-full" />
              <p className="text-[#D4D4D8] leading-relaxed">
                Cuéntanos qué vehículo tienes en mente y nos encargamos de buscarlo, importarlo y prepararlo por ti. Rellena el formulario o contáctanos por teléfono, email o redes sociales y te ayudamos a encontrar el coche perfecto.
              </p>
            </div>

            {/* Form card */}
            {isSubmitted ? (
              <div className="mdg-form-light bg-[#161618] border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-10 text-center">
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-900/30 flex items-center justify-center">
                  <CheckCircle className="w-9 h-9 text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">¡Solicitud enviada con éxito!</h2>
                <p className="text-[#D4D4D8] mb-6">
                  Hemos recibido tu petición a la carta. Nuestro equipo la está revisando y te contactará lo antes posible con las mejores opciones.
                </p>
                <Button
                  onClick={() => { setIsSubmitted(false); setForm({ nombre: "", apellidos: "", email: "", telefono: "", marca: "", modelo: "", combustible: "", kilometraje: "", mensaje: "", acceptPrivacy: false }); }}
                  className="bg-[#ffff00] hover:bg-[#e6e600] text-black font-bold rounded-xl"
                >
                  Enviar otra solicitud
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mdg-form-light bg-[#161618] border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 md:p-8 space-y-6">
                {/* Name / Surname */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Nombre <span className="text-[#ffff00]">*</span></Label>
                    <Input required value={form.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Nombre" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Apellidos <span className="text-[#ffff00]">*</span></Label>
                    <Input required value={form.apellidos} onChange={(e) => set("apellidos", e.target.value)} placeholder="Apellidos" className={inputCls} />
                  </div>
                </div>

                {/* Email / Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Email <span className="text-[#ffff00]">*</span></Label>
                    <Input type="email" required value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="email@ejemplo.com" className={inputCls} />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Teléfono <span className="text-[#ffff00]">*</span></Label>
                    <div className="flex">
                      <div className="flex items-center px-3 bg-[#0B0B0C] border border-r-0 border-[#27272A] rounded-l-xl text-sm">{getFlag()}</div>
                      <Input type="tel" required value={form.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="600 000 000" className={`${inputCls} rounded-l-none`} />
                    </div>
                  </div>
                </div>

                {/* Brand / Model */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Marca <span className="text-[#ffff00]">*</span></Label>
                    <Select value={form.marca} onValueChange={(v) => set("marca", v)} required>
                      <SelectTrigger className={triggerCls}><SelectValue placeholder="Selecciona marca" /></SelectTrigger>
                      <SelectContent className={contentCls}>
                        {brands.map((b) => <SelectItem key={b} value={b} className={itemCls}>{b}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Modelo <span className="text-[#ffff00]">*</span></Label>
                    <Input required maxLength={50} value={form.modelo} onChange={(e) => set("modelo", e.target.value)} placeholder="Ej: Serie 3, A4, Golf..." className={inputCls} />
                    <p className="text-xs text-white/80">{form.modelo.length} de 50 caracteres máximo.</p>
                  </div>
                </div>

                {/* Fuel / Mileage */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-white/80">Combustible</Label>
                    <Select value={form.combustible} onValueChange={(v) => set("combustible", v)}>
                      <SelectTrigger className={triggerCls}><SelectValue placeholder="Sin preferencia" /></SelectTrigger>
                      <SelectContent className={contentCls}>
                        {fuels.map((f) => <SelectItem key={f} value={f} className={itemCls}>{f}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white/80">Kilometraje</Label>
                    <Select value={form.kilometraje} onValueChange={(v) => set("kilometraje", v)}>
                      <SelectTrigger className={triggerCls}><SelectValue placeholder="Sin límite" /></SelectTrigger>
                      <SelectContent className={contentCls}>
                        {mileages.map((m) => <SelectItem key={m} value={m} className={itemCls}>{m}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label className="text-white/80">Más información</Label>
                  <Textarea maxLength={2000} rows={5} value={form.mensaje} onChange={(e) => set("mensaje", e.target.value)} placeholder="Cuéntanos color, equipamiento, presupuesto orientativo, plazos..." className={`${inputCls} resize-none`} />
                  <p className="text-xs text-white/80">{form.mensaje.length} de 2000 caracteres máximo.</p>
                </div>

                {/* Privacy */}
                <div className="flex items-start gap-2">
                  <Checkbox id="alacartePrivacy" checked={form.acceptPrivacy} onCheckedChange={(c) => set("acceptPrivacy", c as boolean)} className="mt-1" />
                  <Label htmlFor="alacartePrivacy" className="text-sm text-[#D4D4D8]">
                    Acepto las comunicaciones comerciales y la política de privacidad.
                  </Label>
                </div>

                <Button type="submit" disabled={isSubmitting} className="w-full bg-[#ffff00] hover:bg-[#e6e600] text-black font-bold py-3 rounded-xl hover:scale-[1.02] hover:shadow-[0_10px_25px_-5px_rgba(255,255,0,0.4)] transition-all duration-300">
                  {isSubmitting ? "Enviando..." : "Solicitar presupuesto"}
                </Button>
              </form>
            )}

            {/* Trust note */}
            <div className="flex items-center justify-center gap-2 mt-6 text-[#D4D4D8] text-sm">
              <Star className="w-4 h-4 fill-[#ffff00] text-[#ffff00]" />
              Sin compromiso · Importación y preparación con garantía MDG
            </div>
          </div>
        </section>
      </main>

      <FAQ />

      <Footer />
    </div>
  );
};

export default Presupuestos;
