import { Moon, Sun, ArrowLeft, Check, X, Crown, Zap, Star, Shield } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTE_PATHS } from "@/routes/paths";

export default function Pricing() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const pricingPlans = [
    {
      name: "Free Forever",
      description: "Perfect for casual fans who want to stay connected to the race weekend.",
      monthlyPrice: "Free",
      yearlyPrice: "Free",
      icon: <Star className="w-8 h-8 text-blue-500" />,
      features: [
        "Basic race calendar",
        "Championship standings",
        "Driver profiles",
        "Race results & highlights",
        "Circuit information",
        "Community access"
      ],
      limitations: [
        "No live timing data",
        "No push notifications",
        "Limited analytics",
        "Ads supported"
      ],
      highlight: false,
      popular: false
    },
    {
      name: "Fast Lane Pro",
      description: "Full race-day experience with real-time insights and advanced features.",
      monthlyPrice: "$4.99",
      yearlyPrice: "$49.99",
      yearlyDiscount: "Save 17%",
      icon: <Zap className="w-8 h-8 text-revz-red" />,
      features: [
        "Everything in Free",
        "Live race timing & data",
        "Real-time push notifications",
        "Advanced performance analytics",
        "Driver comparison tools",
        "Telemetry insights",
        "Weather radar integration",
        "Offline data access",
        "Custom alerts & favorites",
        "Ad-free experience",
        "Priority customer support",
        "Exclusive content access"
      ],
      limitations: [],
      highlight: true,
      popular: true
    },
    {
      name: "Team Principal",
      description: "Premium experience with exclusive insights for the ultimate F1 enthusiast.",
      monthlyPrice: "$9.99",
      yearlyPrice: "$99.99",
      yearlyDiscount: "Save 17%",
      icon: <Crown className="w-8 h-8 text-yellow-500" />,
      features: [
        "Everything in Fast Lane Pro",
        "Exclusive paddock insights",
        "Advanced strategy analysis",
        "Historical data archive",
        "Multi-screen experience",
        "Team radio transcripts",
        "Pit stop strategy insights",
        "Early access to new features",
        "VIP community access",
        "Personal racing assistant AI",
        "Custom dashboard layouts",
        "Export data capabilities"
      ],
      limitations: [],
      highlight: false,
      popular: false
    }
  ];

  const comparisonFeatures = [
    { category: "Core Features", features: [
      { name: "Race Calendar", free: true, pro: true, premium: true },
      { name: "Championship Standings", free: true, pro: true, premium: true },
      { name: "Driver Profiles", free: true, pro: true, premium: true },
      { name: "Circuit Information", free: true, pro: true, premium: true }
    ]},
    { category: "Live Features", features: [
      { name: "Live Timing Data", free: false, pro: true, premium: true },
      { name: "Push Notifications", free: false, pro: true, premium: true },
      { name: "Real-time Weather", free: false, pro: true, premium: true },
      { name: "Team Radio", free: false, pro: false, premium: true }
    ]},
    { category: "Analytics", features: [
      { name: "Basic Statistics", free: true, pro: true, premium: true },
      { name: "Performance Analytics", free: false, pro: true, premium: true },
      { name: "Driver Comparisons", free: false, pro: true, premium: true },
      { name: "Historical Analysis", free: false, pro: false, premium: true }
    ]},
    { category: "Experience", features: [
      { name: "Ad-free Experience", free: false, pro: true, premium: true },
      { name: "Offline Access", free: false, pro: true, premium: true },
      { name: "Custom Alerts", free: false, pro: true, premium: true },
      { name: "Multi-screen Support", free: false, pro: false, premium: true }
    ]}
  ];

  const faqItems = [
    {
      question: "Can I switch between plans anytime?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll pro-rate any differences."
    },
    {
      question: "Is there a free trial for paid plans?",
      answer: "Yes! All paid plans come with a 7-day free trial. You can cancel anytime during the trial period without being charged."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, and Google Pay for seamless checkout."
    },
    {
      question: "Do you offer student discounts?",
      answer: "Yes! Students can get 50% off any paid plan with a valid student email address. Contact support for details."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation Controls */}
      <div className="fixed top-2 left-2 right-2 sm:top-4 sm:left-4 sm:right-4 z-50 flex justify-between">
        <Link
          to={ROUTE_PATHS.HOME}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700 dark:text-white" />
        </Link>
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center transition-colors"
        >
          {theme === "dark" ? (
            <Sun className="w-5 h-5 text-yellow-500" />
          ) : (
            <Moon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative rounded-[24px] sm:rounded-[44px] overflow-hidden bg-black min-h-[400px] sm:min-h-[500px] mx-2 mt-2 sm:mx-4 sm:mt-4 lg:mx-8 lg:mt-8">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&h=800&fit=crop&crop=center"
            alt="Formula 1 pricing"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Shield className="w-16 h-16 text-revz-red" />
            </div>
            <h1 className="text-white font-nevera text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
              Choose Your Plan
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Select the perfect plan for your Formula 1 passion. From casual fan to racing expert, we have the right features for you.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className={`text-sm ${!isYearly ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
              <button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  isYearly ? 'bg-revz-red' : 'bg-gray-600'
                }`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    isYearly ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
              <span className={`text-sm ${isYearly ? 'text-white' : 'text-gray-400'}`}>Yearly</span>
              {isYearly && (
                <Badge className="bg-revz-red/20 text-revz-red border-revz-red">Save 17%</Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Plans */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card
              key={index}
              className={`relative ${plan.highlight ? 'border-revz-red shadow-lg scale-105' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge className="bg-revz-red text-white">Most Popular</Badge>
                </div>
              )}

              <CardHeader className="text-center pb-6">
                <div className="flex justify-center mb-4">
                  {plan.icon}
                </div>
                <CardTitle className="text-2xl font-nevera mb-2">{plan.name}</CardTitle>
                <div className="text-4xl font-bold text-revz-red mb-2">
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  {plan.monthlyPrice !== "Free" && (
                    <span className="text-sm font-normal text-muted-foreground">
                      /{isYearly ? 'year' : 'month'}
                    </span>
                  )}
                </div>
                {isYearly && plan.yearlyDiscount && (
                  <div className="text-sm text-green-600 font-medium">{plan.yearlyDiscount}</div>
                )}
                <p className="text-muted-foreground text-sm">{plan.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                      Included Features
                    </h4>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {plan.limitations.length > 0 && (
                    <div>
                      <h4 className="font-medium text-sm uppercase tracking-wide text-muted-foreground mb-3">
                        Limitations
                      </h4>
                      <ul className="space-y-2">
                        {plan.limitations.map((limitation, idx) => (
                          <li key={idx} className="flex items-start">
                            <X className="w-4 h-4 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{limitation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <Button
                  className={`w-full ${
                    plan.highlight
                      ? 'bg-revz-red hover:bg-revz-red/90 text-white'
                      : 'bg-transparent border-revz-red text-revz-red hover:bg-revz-red hover:text-white'
                  }`}
                  variant={plan.highlight ? "default" : "outline"}
                  size="lg"
                >
                  {plan.monthlyPrice === "Free" ? "Get Started Free" : "Start Free Trial"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Feature Comparison Table */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
            Feature Comparison
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See exactly what's included in each plan
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="grid grid-cols-4 border-b bg-muted/50">
              <div className="p-4 font-semibold">Features</div>
              <div className="p-4 text-center font-semibold">Free</div>
              <div className="p-4 text-center font-semibold text-revz-red">Fast Lane Pro</div>
              <div className="p-4 text-center font-semibold">Team Principal</div>
            </div>

            {comparisonFeatures.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <div className="grid grid-cols-4 border-b bg-muted/20">
                  <div className="p-4 font-medium text-sm uppercase tracking-wide text-muted-foreground" colSpan={4}>
                    {category.category}
                  </div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-4 border-b last:border-b-0">
                    <div className="p-4 text-sm">{feature.name}</div>
                    <div className="p-4 text-center">
                      {feature.free ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="p-4 text-center">
                      {feature.pro ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 mx-auto" />
                      )}
                    </div>
                    <div className="p-4 text-center">
                      {feature.premium ? (
                        <Check className="w-4 h-4 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-red-500 mx-auto" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to know about our plans
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {faqItems.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-nevera text-lg mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}