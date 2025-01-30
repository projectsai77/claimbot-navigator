import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="text-xl font-bold text-primary">
              InsuranceAI
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-primary">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary">
              How it Works
            </a>
            <Button variant="outline" className="mr-4">
              Sign In
            </Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;