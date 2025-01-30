import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-b from-primary/90 to-primary min-h-[600px] flex items-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Insurance Claims Made Simple
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Let our AI assistant guide you through the claims process in minutes, not days.
          </p>
          <div className="flex gap-4">
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90"
              onClick={() => console.log("File Claim clicked")}
            >
              File a Claim
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white/10"
              onClick={() => console.log("Learn More clicked")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-10 bg-repeat"></div>
    </div>
  );
};

export default Hero;