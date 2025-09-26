import { Twitter, Instagram, Facebook } from "lucide-react";

export default function StatsCard() {
  return (
    <div className="rounded-[24px] sm:rounded-[44px] bg-revz-red text-white p-6 sm:p-8 min-h-[400px] sm:min-h-[500px] relative overflow-hidden lg:col-start-2 lg:row-start-2">
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 400 400" fill="none">
          <path d="M-50 200C100 100, 200 300, 350 200C500 100, 600 300, 750 200" stroke="white" strokeWidth="2" opacity="0.3"/>
          <path d="M-50 250C100 150, 200 350, 350 250C500 150, 600 350, 750 250" stroke="white" strokeWidth="2" opacity="0.2"/>
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        {/* Top stats section */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          <div>
            <div className="text-base font-numans opacity-90 mb-2">Active users</div>
            <div className="text-3xl font-numans font-bold">5000+</div>
          </div>
          <div className="text-right">
            <div className="text-base font-numans opacity-90 mb-2">Download</div>
            <div className="text-3xl font-numans font-bold">30.3k</div>
          </div>
        </div>

        {/* Center TRUSTED WORLD WIDE section */}
        <div className="flex-1 flex items-center justify-center">
          <h3 className="font-nevera text-4xl lg:text-5xl leading-tight text-center">
            TRUSTED<br />WORLD WIDE
          </h3>
        </div>

        {/* Bottom section with Reviews and Social Icons */}
        <div className="flex items-end justify-between">
          <div>
            <div className="text-base font-numans opacity-90 mb-2">Reviews</div>
            <div className="text-3xl font-numans font-bold">1200+</div>
          </div>
          <div className="flex gap-3">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Twitter className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Instagram className="w-6 h-6" />
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Facebook className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}