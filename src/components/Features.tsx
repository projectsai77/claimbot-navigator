import { CheckCircle2, Clock, MessageSquareText } from "lucide-react";

const features = [
  {
    icon: <Clock className="w-12 h-12 text-secondary" />,
    title: "Quick Processing",
    description: "Submit your claim in minutes with our streamlined process",
  },
  {
    icon: <MessageSquareText className="w-12 h-12 text-secondary" />,
    title: "24/7 AI Support",
    description: "Get instant answers to your questions anytime, anywhere",
  },
  {
    icon: <CheckCircle2 className="w-12 h-12 text-secondary" />,
    title: "Smart Verification",
    description: "Advanced AI technology ensures accurate claim processing",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Our Platform?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 animate-fadeIn"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="mb-6">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-4 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;