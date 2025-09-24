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

      <div className="relative z-10">
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div>
            <div className="text-sm font-numans opacity-80 mb-1">Active users</div>
            <div className="text-2xl font-numans font-bold">5000+</div>
          </div>
          <div>
            <div className="text-sm font-numans opacity-80 mb-1">Download</div>
            <div className="text-2xl font-numans font-bold">30.3k</div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h3 className="font-nevera text-3xl lg:text-4xl leading-tight">
            TRUSTED<br />WORLD WIDE
          </h3>
        </div>

        <div className="mb-8">
          <div className="text-sm font-numans opacity-80 mb-1">Reviews</div>
          <div className="text-2xl font-numans font-bold">1200+</div>
        </div>

        <div className="flex gap-4 justify-center">
          <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <Twitter className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <Instagram className="w-5 h-5" />
          </div>
          <div className="w-12 h-12 bg-black/10 rounded-full flex items-center justify-center">
            <Facebook className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
}