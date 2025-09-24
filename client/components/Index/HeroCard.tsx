import { Link } from "react-router-dom";
import { ROUTE_PATHS } from "@/routes/paths";
import { Cover } from "@/components/aceternity/WarpSpeed/cover";

export default function HeroCard() {
  return (
    <div className="relative rounded-[24px] sm:rounded-[44px] overflow-hidden bg-black min-h-[260px] sm:min-h-[320px] lg:min-h-[389px] lg:col-span-2">
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/488c2b39b92ddf59540f7aec11b62764ebebb92b?width=1586"
          alt="Formula 1 car background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>
      <div className="relative z-10 px-6 py-8 sm:px-8 sm:py-12 lg:px-16 lg:py-14">
        <div className="max-w-2xl">
          <h1 className="text-white font-nevera text-2xl sm:text-3xl lg:text-5xl leading-tight mb-6 sm:mb-8">
            The ultimate Formula 1 companion app. built for fans in the <Cover>fast lane</Cover>.
          </h1>
          <Link
            to={ROUTE_PATHS.MOBILE_APP}
            className="bg-revz-red hover:bg-revz-red/90 text-white px-8 py-4 rounded-full font-nevera text-sm uppercase tracking-widest transition-colors inline-block"
          >
            Download App
          </Link>
        </div>
      </div>
    </div>
  );
}