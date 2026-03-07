
export const WeatherSkeleton = () => (
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
    <div className="md:col-span-2 bg-white/10 h-[300px] rounded-3xl border border-white/10"></div>
    <div className="bg-black/20 h-[300px] rounded-3xl border border-white/5"></div>
  </div>
);