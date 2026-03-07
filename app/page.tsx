"use client";

import { useState, useEffect } from "react";
import { getWeatherData, getForecastData, getHourlyData } from "@/src/services/weatherService";
import { WeatherData } from "@/src/types/weather";
import { getTravelAdvice } from "@/src/utils/advice";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  MapPin, Loader2, History, Share2, Wind, Droplets, Clock 
} from "lucide-react";

// Componente de Carga (Skeleton)
const WeatherSkeleton = () => (
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse mt-8">
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white/10 h-[300px] rounded-3xl border border-white/10"></div>
      <div className="bg-white/5 h-[200px] rounded-3xl border border-white/10"></div>
    </div>
    <div className="bg-black/20 h-[520px] rounded-3xl border border-white/5"></div>
  </div>
);

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]);
  const [hourly, setHourly] = useState<any[]>([]); 
  const [loading, setLoading] = useState(false);
  const [recentCities, setRecentCities] = useState<string[]>([]);
  const [unit, setUnit] = useState<"C" | "F">("C");

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  };

  useEffect(() => {
    const saved = localStorage.getItem("recentCities");
    if (saved) setRecentCities(JSON.parse(saved));
  }, []);

  const displayTemp = (tempC: number) => {
    if (unit === "F") return Math.round((tempC * 9/5) + 32);
    return Math.round(tempC);
  };

  const handleSearch = async (targetCity?: string) => {
    const searchCity = targetCity || city;
    if (!searchCity) return;

    setLoading(true);
    try {
      const [weatherData, forecastData, hourlyData] = await Promise.all([
        getWeatherData(searchCity),
        getForecastData(searchCity),
        getHourlyData(searchCity)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
      setHourly(hourlyData);

      const cityName = weatherData.name;
      setRecentCities((prev) => {
        const filtered = prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase());
        const updated = [cityName, ...filtered].slice(0, 3);
        localStorage.setItem("recentCities", JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      alert("Error retrieving data. Please check the city name and try again.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!weather) return;
    const advice = getTravelAdvice(weather.main.temp, weather.weather[0].main.toLowerCase());
    const text = `🌍 *Climate Intelligence Plan*: I'll be at ${weather.name}. It will be ${displayTemp(weather.main.temp)}°${unit}. My recommendation: ${advice.message}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getBackgroundClass = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "from-amber-200 via-blue-400 to-blue-600";
    if (hour >= 12 && hour < 19) return "from-blue-500 via-blue-700 to-indigo-900";
    return "from-slate-900 via-purple-900 to-black";
  };

  return (
    <main className={`flex flex-col items-center min-h-screen p-4 transition-all duration-1000 bg-gradient-to-br ${getBackgroundClass()} text-white font-sans`}>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center my-10">
        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Climate Intelligence</h1>
        <p className="text-blue-100/80 font-medium italic">Travel Intelligence Platform</p>
      </motion.div>
      
      <div className="w-full max-w-xl mb-10">
        <div className="flex gap-2 mb-4">
          <div className="flex-1 flex bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1">
            <input
              type="text"
              placeholder="Find a destination..."
              className="flex-1 bg-transparent p-3 outline-none placeholder:text-slate-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="px-4 text-sm font-bold border-l border-white/20 hover:text-blue-300 transition-colors"
            >
              °{unit}
            </button>
          </div>
          <button onClick={() => handleSearch()} className="bg-blue-500 hover:bg-blue-400 px-8 rounded-2xl font-bold transition-all">
            {loading ? <Loader2 className="animate-spin" /> : "Search"}
          </button>
        </div>

        {recentCities.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            <History size={14} className="text-blue-300" />
            {recentCities.map((c, i) => (
              <button key={i} onClick={() => handleSearch(c)} className="text-xs bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10">
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading && <WeatherSkeleton />}

      {weather && !loading && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div {...fadeInUp} className="md:col-span-2 space-y-6">
            {/* Clima Actual */}
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-4xl font-bold">{weather.name}</h2>
                  <p className="text-blue-200 capitalize text-lg">{weather.weather[0].description}</p>
                </div>
                <button onClick={shareOnWhatsApp} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                  <Share2 size={20} />
                </button>
              </div>
              
              <div className="flex items-center justify-between mt-6">
                <span className="text-9xl font-thin tracking-tighter">
                  {displayTemp(weather.main.temp)}°
                </span>
                
                <div className="max-w-[180px] bg-white/20 backdrop-blur-lg p-4 rounded-2xl border border-white/30 shadow-xl rotate-2">
                  <p className="text-[10px] uppercase font-black mb-1 opacity-70 tracking-widest text-blue-200">Pro Suggestion</p>
                  <div className="text-2xl mb-1">
                     {getTravelAdvice(weather.main.temp, weather.weather[0].main.toLowerCase()).icon}
                  </div>
                  <p className="text-sm leading-tight font-medium">
                    {getTravelAdvice(weather.main.temp, weather.weather[0].main.toLowerCase()).message}
                  </p>
                </div>
              </div>
            </div>

            {/* GRÁFICO POR HORAS (Próximas 24h) */}
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-3xl border border-white/10 h-[280px] shadow-xl">
              <div className="flex items-center gap-2 mb-4 opacity-60">
                <Clock size={14} />
                <h4 className="text-xs font-bold uppercase tracking-tighter">Hourly forecast (°{unit})</h4>
              </div>
              <ResponsiveContainer width="100%" height="85%">
                <AreaChart data={hourly.map(h => ({ 
                  time: new Date(h.dt * 1000).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit' }), 
                  temp: displayTemp(h.main.temp) 
                }))}>
                  <defs>
                    <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pronóstico 5 Días */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl h-full"
          >
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6 underline decoration-blue-500 underline-offset-8 text-center">Next few days</h3>
            <div className="space-y-6">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <span className="text-slate-300 group-hover:text-white transition-colors capitalize text-sm">
                    {new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long' })}
                  </span>
                  <div className="flex items-center gap-2">
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-8 h-8" />
                    <span className="font-bold w-12 text-right">{displayTemp(day.main.temp)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      )}
    </main>
  );
}