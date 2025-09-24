import { Moon, Sun, Smartphone, Download, Star, Users, Zap, Bell, ArrowLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTE_PATHS } from "@/routes/paths";

export default function MobileApp() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const features = [
    {
      icon: <Zap className="w-6 h-6 text-revz-red" />,
      title: "Real-time Race Data",
      description: "Live timing, sector times, and telemetry data"
    },
    {
      icon: <Bell className="w-6 h-6 text-revz-red" />,
      title: "Push Notifications",
      description: "Never miss important race moments"
    },
    {
      icon: <Users className="w-6 h-6 text-revz-red" />,
      title: "Driver Profiles",
      description: "Detailed stats and career information"
    },
    {
      icon: <Star className="w-6 h-6 text-revz-red" />,
      title: "Championship Standings",
      description: "Up-to-date driver and constructor standings"
    }
  ];

  const screenshots = [
    {
      title: "Race Dashboard",
      description: "Live race tracking with real-time data",
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=600&fit=crop&crop=center"
    },
    {
      title: "Driver Stats",
      description: "Comprehensive driver performance analytics",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=600&fit=crop&crop=center"
    },
    {
      title: "Circuit Guide",
      description: "Track layouts and sector analysis",
      image: "https://images.unsplash.com/photo-1566568393045-df8883fea27a?w=300&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
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
            src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1600&h=800&fit=crop&crop=center"
            alt="Formula 1 mobile app preview"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Smartphone className="w-16 h-16 text-revz-red" />
            </div>
            <h1 className="text-white font-nevera text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
              REVZ Mobile App
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Experience Formula 1 like never before. Get real-time race data, driver insights, and exclusive content right in your pocket.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest">
                <Download className="w-5 h-5 mr-2" />
                Download for iOS
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest">
                <Download className="w-5 h-5 mr-2" />
                Download for Android
              </Button>
            </div>
            <div className="flex justify-center items-center mt-6 space-x-6">
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                4.8★ Rating
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                100K+ Downloads
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
            Powerful Features
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to stay connected with Formula 1, designed for mobile-first experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl font-nevera">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Screenshots Section */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
            App Screenshots
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Take a look inside the REVZ mobile experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {screenshots.map((screenshot, index) => (
            <div key={index} className="text-center">
              <div className="relative mx-auto mb-6 w-64 h-96 sm:w-72 sm:h-[432px] bg-gray-900 rounded-[2rem] p-4 shadow-2xl">
                <div className="w-full h-full rounded-[1.5rem] overflow-hidden bg-black">
                  <img
                    src={screenshot.image}
                    alt={screenshot.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <h3 className="text-xl font-nevera mb-2 text-foreground">{screenshot.title}</h3>
              <p className="text-muted-foreground">{screenshot.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Download CTA Section */}
      <div className="mx-2 sm:mx-4 lg:mx-8 my-16">
        <Card className="bg-revz-red text-white border-0">
          <CardContent className="py-12 px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-nevera mb-4">
              Ready to Experience F1?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of Formula 1 fans who are already using REVZ to enhance their racing experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest">
                <Download className="w-5 h-5 mr-2" />
                App Store
              </Button>
              <Button size="lg" variant="secondary" className="px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest">
                <Download className="w-5 h-5 mr-2" />
                Google Play
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}