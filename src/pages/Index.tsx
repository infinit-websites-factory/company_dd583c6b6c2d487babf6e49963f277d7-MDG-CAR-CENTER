import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VehicleGallery from "@/components/VehicleGallery";
import GoogleReviews from "@/components/GoogleReviews";
import Services from "@/components/Services";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SEO page="home" />
      <Header />
      <Hero />
      <VehicleGallery />
      <GoogleReviews />
      <Services />

      {/* Divider between Services and FAQ */}
      <div className="container mx-auto max-w-7xl px-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#ffff00]" />
            <span className="w-2 h-2 rounded-full bg-black" />
            <span className="w-2 h-2 rounded-full bg-[#ffff00]" />
          </div>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>
      </div>

      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
