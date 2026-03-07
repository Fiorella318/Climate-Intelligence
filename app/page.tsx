"use client";

import { useState, useEffect } from "react";
import { getWeatherData, getForecastData, getHourlyData } from "@/src/services/weatherService";
import { WeatherData } from "@/src/types/weather";
import { getTravelAdvice } from "@/src/utils/advice";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Loader2, History, Share2, Clock 
} from "lucide-react";

const WeatherSkeleton = () => (
  <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse mt-8">
    <div className="md:col-span-2 space-y-6">
      <div className="bg-white/10 h-[300px] rounded-3xl border border-white/10"></div>
      <div className="bg-white/5 h-[200px] rounded-3xl border border-white/10"></div>
    </div>
    <div className="bg-black/20 h-[500px] rounded-3xl border border-white/5"></div>
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
      alert("Error retrieving data");
    } finally {
      setLoading(false);
    }
  };

  const shareOnWhatsApp = () => {
    if (!weather) return;
    const advice = getTravelAdvice(weather.main.temp, weather.weather[0].main.toLowerCase());
    const text = `🌍 *Climate Intelligence*: I'm going to ${weather.name}. It will be ${displayTemp(weather.main.temp)}°${unit}. My recommendation: ${advice.message}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const getBackgroundClass = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "from-amber-200 via-blue-400 to-blue-600";
    if (hour >= 12 && hour < 19) return "from-blue-500 via-blue-700 to-indigo-900";
    return "from-slate-900 via-purple-900 to-black";
  };

  return (
    <main className={`flex flex-col items-center min-h-screen p-4 transition-all duration-1000 bg-gradient-to-br ${getBackgroundClass()} text-white font-sans overflow-x-hidden`}>
      
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center my-10 px-4">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Climate Intelligence</h1>
        <p className="text-blue-100/80 font-medium italic text-sm md:text-base">Travel Intelligence Platform</p>
      </motion.div>
      
      <div className="w-full max-w-xl mb-10 px-2">
        {/* BUSCADOR RESPONSIVO */}
        <div className="flex flex-col sm:flex-row gap-2 mb-4 w-full">
          <div className="flex-1 flex bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1 overflow-hidden">
            <input
              type="text"
              placeholder="Find a destination..."
              className="flex-1 bg-transparent p-3 outline-none placeholder:text-slate-400 text-sm min-w-0"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button 
              onClick={() => setUnit(unit === "C" ? "F" : "C")}
              className="px-4 text-xs font-bold border-l border-white/20 hover:text-blue-300 transition-colors shrink-0"
            >
              °{unit}
            </button>
          </div>
          <button 
            onClick={() => handleSearch()} 
            className="bg-blue-600 hover:bg-blue-500 p-4 rounded-2xl font-bold transition-all flex justify-center items-center shrink-0 sm:px-8 text-sm"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Search"}
          </button>
        </div>

        {recentCities.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            <History size={14} className="text-blue-300 shrink-0" />
            {recentCities.map((c, i) => (
              <button key={i} onClick={() => handleSearch(c)} className="text-[10px] whitespace-nowrap bg-white/10 hover:bg-white/20 px-3 py-1 rounded-full border border-white/10 transition-colors">
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
            <div className="bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold">{weather.name}</h2>
                  <p className="text-blue-200 capitalize text-sm md:text-lg">{weather.weather[0].description}</p>
                </div>
                <button onClick={shareOnWhatsApp} className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors shrink-0">
                  <Share2 size={18} />
                </button>
              </div>
              
              {/* Busca este bloque dentro del div de 'weather && !loading' */}
<div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-6 relative z-10">
  {/* Aquí está tu temperatura gigante */}
  <span className="text-8xl md:text-9xl font-thin tracking-tighter">
    {displayTemp(weather.main.temp)}°
  </span>
  
  {/* ESTE ES EL AJUSTE ESPECÍFICO PARA EL CONSEJO LARGO */}
  <div className="w-full sm:max-w-[240px] bg-white/10 backdrop-blur-2xl p-6 rounded-3xl border border-white/20 shadow-2xl transition-all hover:bg-white/15">
    <div className="flex items-center gap-3 mb-3">
      <span className="text-3xl filter drop-shadow-md">{getTravelAdvice(weather.main.temp, weather.weather[0].description).icon}</span>
      <div className="flex flex-col">
        <p className="text-[10px] uppercase font-black opacity-60 tracking-[0.15em] text-blue-200">
          Travel Expert
        </p>
        <div className="h-0.5 w-8 bg-blue-400/50 rounded-full"></div>
      </div>
    </div>
    <p className={`text-[13px] leading-relaxed font-medium italic ${getTravelAdvice(weather.main.temp, weather.weather[0].description).color}`}>
      "{getTravelAdvice(weather.main.temp, weather.weather[0].description).message}"
    </p>
  </div>
</div>
            </div>

            {/* Gráfico de Horas */}
            <div className="bg-white/5 backdrop-blur-sm p-4 md:p-6 rounded-3xl border border-white/10 h-[250px] md:h-[300px] shadow-xl">
              <div className="flex items-center gap-2 mb-4 opacity-60">
                <Clock size={14} />
                <h4 className="text-[10px] md:text-xs font-bold uppercase tracking-tighter">Hourly Forecast (°{unit})</h4>
              </div>
              <ResponsiveContainer width="100%" height="80%">
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
                    contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="temp" stroke="#38bdf8" fillOpacity={1} fill="url(#colorTemp)" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pronóstico 5 Días */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-2xl"
          >
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6 underline decoration-blue-500 underline-offset-8 text-center">Next Days</h3>
            <div className="space-y-5 md:space-y-6">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between group">
                  <span className="text-slate-300 group-hover:text-white transition-colors capitalize text-xs md:text-sm">
                    {new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'long' })}
                  </span>
                  <div className="flex items-center gap-2">
                    <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} alt="icon" className="w-8 h-8 shrink-0" />
                    <span className="font-bold w-10 text-right text-sm md:text-base">{displayTemp(day.main.temp)}°</span>
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