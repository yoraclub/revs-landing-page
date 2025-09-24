import { Play } from "lucide-react";

export default function StoryCard() {
  return (
    <div className="relative rounded-[24px] sm:rounded-[44px] overflow-hidden bg-black min-h-[400px] sm:min-h-[500px] lg:row-span-2 h-full">
      <div className="absolute inset-0">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/9f6323c242bb1e859cb1fa7656e09a3e7a33035a?width=1160"
          alt="Formula 1 racing background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
      </div>

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <button className="w-20 h-20 bg-revz-red/80 rounded-full flex items-center justify-center hover:bg-revz-red transition-colors">
          <Play className="w-8 h-8 text-white ml-1" fill="white" />
        </button>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <h2 className="text-white font-nevera text-3xl lg:text-4xl mb-4 leading-tight">
          Who We Are & Our Story
        </h2>
        <p className="text-white/90 font-numans text-base leading-relaxed">
          <span className="text-revz-red font-nevera">REVZ</span> is built by racing enthusiasts for racing enthusiasts. We're a team of fans, designers, and technologists united by one passion: Formula 1. Our mission is simple ...
          <span className="text-revz-red font-nevera ml-2">Read More →</span>
        </p>
      </div>
    </div>
  );
}