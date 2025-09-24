import { Moon, Sun, ArrowLeft, Zap, Bell, Users, Trophy, Calendar, BarChart3, MapPin, Clock, Settings, Shield, Smartphone } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROUTE_PATHS } from "@/routes/paths";
import { TracingBeam } from "@/components/aceternity/tracing-beam";

export default function Features() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const coreFeatures = [
    {
      icon: <Zap className="w-8 h-8 text-revz-red" />,
      title: "Real-time Race Data",
      description: "Live timing, sector splits, and telemetry data delivered instantly during races",
      details: ["Live lap times", "Sector analysis", "Gap timing", "Speed traps"]
    },
    {
      icon: <Bell className="w-8 h-8 text-revz-red" />,
      title: "Smart Notifications",
      description: "Never miss crucial race moments with intelligent push notifications",
      details: ["Race start alerts", "DRS zones", "Safety car updates", "Penalty notifications"]
    },
    {
      icon: <Users className="w-8 h-8 text-revz-red" />,
      title: "Driver Profiles",
      description: "Comprehensive driver statistics and career performance data",
      details: ["Career stats", "Current season data", "Head-to-head comparisons", "Performance trends"]
    },
    {
      icon: <Trophy className="w-8 h-8 text-revz-red" />,
      title: "Championship Standings",
      description: "Up-to-date driver and constructor championship standings",
      details: ["Live points calculation", "Historical comparisons", "Season predictions", "Title fight analysis"]
    },
    {
      icon: <Calendar className="w-8 h-8 text-revz-red" />,
      title: "Race Calendar",
      description: "Complete F1 calendar with session times and timezone conversion",
      details: ["Practice schedules", "Qualifying times", "Race dates", "Local time zones"]
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-revz-red" />,
      title: "Performance Analytics",
      description: "Advanced statistical analysis and performance metrics",
      details: ["Lap time analysis", "Tire strategy data", "Weather impact", "Track comparisons"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <MapPin className="w-6 h-6 text-revz-red" />,
      title: "Circuit Guide",
      description: "Interactive track maps with corner analysis and racing lines"
    },
    {
      icon: <Clock className="w-6 h-6 text-revz-red" />,
      title: "Session Timer",
      description: "Countdown timers for upcoming sessions and race weekends"
    },
    {
      icon: <Settings className="w-6 h-6 text-revz-red" />,
      title: "Custom Alerts",
      description: "Personalized notifications for your favorite drivers and teams"
    },
    {
      icon: <Shield className="w-6 h-6 text-revz-red" />,
      title: "Offline Mode",
      description: "Access cached data even when you're not connected"
    },
    {
      icon: <Smartphone className="w-6 h-6 text-revz-red" />,
      title: "Cross-Platform",
      description: "Seamless experience across mobile, tablet, and desktop"
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
            src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=1600&h=800&fit=crop&crop=center"
            alt="Formula 1 features showcase"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30" />
        </div>
        <div className="relative z-10 px-6 py-12 sm:px-8 sm:py-16 lg:px-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              <Trophy className="w-16 h-16 text-revz-red" />
            </div>
            <h1 className="text-white font-nevera text-3xl sm:text-4xl lg:text-6xl leading-tight mb-6">
              REVZ Features
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
              Discover all the powerful features that make REVZ the ultimate Formula 1 companion. From real-time data to advanced analytics.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={ROUTE_PATHS.MOBILE_APP}>
                <Button size="lg" className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest">
                  Download App
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <TracingBeam className="px-6">
        <div className="max-w-4xl mx-auto antialiased pt-4 relative">
          {/* Core Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="bg-revz-red text-white rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                Core Features
              </h2>
              <h3 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
                Everything you need for the ultimate Formula 1 experience
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {coreFeatures.map((feature, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow mb-10">
                  <CardHeader>
                    <div className="flex items-center mb-4">
                      {feature.icon}
                      <CardTitle className="text-xl font-nevera ml-4">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div className="w-2 h-2 bg-revz-red rounded-full mr-3 flex-shrink-0" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Additional Features Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="bg-revz-red text-white rounded-full text-sm w-fit px-4 py-1 mb-4 mx-auto">
                Additional Features
              </h2>
              <h3 className="text-3xl sm:text-4xl font-nevera mb-4 text-foreground">
                Even more ways to enhance your F1 experience
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 rounded-lg border bg-card mb-10">
                  {feature.icon}
                  <div>
                    <h3 className="font-nevera text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </TracingBeam>

    </div>
  );
}