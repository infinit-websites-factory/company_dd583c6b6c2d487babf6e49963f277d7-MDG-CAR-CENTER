import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { LanguageProvider } from "./contexts/LanguageContext";
import Index from "./pages/Index";
import Stock from "./pages/Stock";
import VehicleDetail from "./pages/VehicleDetail";
import Sell from "./pages/Sell";
import Financing from "./pages/Financing";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import FloatingWhatsApp from "./components/FloatingWhatsApp";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <LanguageProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/stock" element={<Stock />} />
              <Route path="/stock/:id" element={<VehicleDetail />} />
              <Route path="/sell" element={<Sell />} />
              <Route path="/financing" element={<Financing />} />
              <Route path="/services" element={<Services />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/nosotros" element={<About />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingWhatsApp />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </LanguageProvider>
  </HelmetProvider>
);

export default App;
