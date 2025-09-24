import { ArrowUpRight } from "lucide-react";

export default function PricingCard() {
  return (
    <div className="relative hidden lg:flex items-center justify-center lg:col-start-3 lg:row-start-2">
      <div className="absolute -z-0 w-64 h-40 -top-6 left-6 bg-[radial-gradient(circle,rgba(0,0,0,0.25)_2px,transparent_2px)] dark:bg-[radial-gradient(circle,rgba(255,255,255,0.25)_2px,transparent_2px)] [background-size:14px_14px] rounded-2xl" />
      <div className="z-10">
        <div className="relative">
          {/* Fast Lane Pro card - positioned behind */}
          <div className="bg-gray-900 text-white rounded-[24px] px-6 py-6 w-[260px] shadow-xl absolute top-12 left-32 z-10">
            <div className="font-nevera text-sm tracking-wide uppercase opacity-80 mb-1">Fast Lane (Pro)</div>
            <p className="font-numans text-sm leading-relaxed opacity-90">Full race-day experience with real-time insights.</p>
            <div className="font-numans text-xs opacity-70 mt-2">$4.99 / month • $49.99 / year</div>
          </div>
          {/* Free Forever card - positioned in front */}
          <div className="bg-revz-red text-white rounded-[24px] px-6 py-6 w-[260px] shadow-xl relative z-20">
            <div className="font-nevera text-sm tracking-wide uppercase opacity-80 mb-1">Free Forever</div>
            <p className="font-numans text-sm leading-relaxed">Perfect for casual fans who want to stay connected to the race weekend.</p>
          </div>
        </div>
        <div className="font-nevera text-xl text-revz-red tracking-wide mt-4">PRICING</div>
      </div>
      <div className="absolute right-0 -mr-6">
        <button className="w-12 h-12 rounded-full border border-black/10 dark:border-white/20 flex items-center justify-center">
          <ArrowUpRight className="w-6 h-6 text-revz-red rotate-45" />
        </button>
      </div>
    </div>
  );
}