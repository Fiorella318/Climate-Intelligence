"use client";

import { useState, useEffect } from "react";
import { getWeatherData, getForecastData } from "@/src/services/weatherService";
import { WeatherData } from "@/src/types/weather";
// Importamos iconos profesionales
import { Sun, Cloud, CloudRain, Wind, Droplets, MapPin, Loader2 } from "lucide-react";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<any[]>([]); // Nuevo "cajón" para los 5 días
  const [loading, setLoading] = useState(false);

  // --- FUNCIÓN 1: BUSCAR POR CIUDAD ---
  const handleSearch = async (targetCity?: string) => {
    const searchCity = targetCity || city;
    if (!searchCity) return;

    setLoading(true);
    try {
      // Pedimos Clima Actual Y Pronóstico al mismo tiempo
      const [weatherData, forecastData] = await Promise.all([
        getWeatherData(searchCity),
        getForecastData(searchCity)
      ]);

      setWeather(weatherData);
      setForecast(forecastData);
    } catch (error) {
      alert("No se pudo obtener la información. Revisa la ciudad o tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  // --- FUNCIÓN 2: UBICACIÓN AUTOMÁTICA ---
  const getMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        setLoading(true);
        try {
          // Usamos una pequeña "trampa": la API acepta lat y lon en lugar de nombre
          const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=es`);
          const data = await res.json();
          handleSearch(data.name); // Buscamos por el nombre que nos dio la ubicación
        } catch (error) {
          console.error("Error con geolocalización");
        }
      });
    }
  };

  // Esto hace que la ubicación se pida apenas abres la app
  useEffect(() => {
    getMyLocation();
  }, []);

  return (
    <main className="flex flex-col items-center min-h-screen p-4 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white font-sans">
      
      {/* HEADER */}
      <div className="text-center my-10">
        <h1 className="text-5xl font-black tracking-tighter mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
          SkyGuide
        </h1>
        <p className="text-blue-200/60 font-medium italic">Travel Intelligence Platform</p>
      </div>
      
      {/* BUSCADOR Y UBICACIÓN */}
      <div className="flex w-full max-w-xl gap-2 mb-10">
        <div className="flex-1 flex bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-1">
          <input
            type="text"
            placeholder="Buscar destino..."
            className="flex-1 bg-transparent p-3 outline-none placeholder:text-slate-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={getMyLocation}
            className="p-3 text-blue-400 hover:text-blue-300 transition-colors"
            title="Usar mi ubicación"
          >
            <MapPin size={24} />
          </button>
        </div>
        <button
          onClick={() => handleSearch()}
          disabled={loading}
          className="bg-blue-500 hover:bg-blue-400 px-8 rounded-2xl font-bold shadow-lg shadow-blue-500/20 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Buscar"}
        </button>
      </div>

      {/* RESULTADO PRINCIPAL (HOY) */}
      {weather && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card Clima Actual */}
          <div className="md:col-span-2 bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 flex flex-col justify-between">
            <div>
              <h2 className="text-4xl font-bold">{weather.name}</h2>
              <p className="text-blue-300 capitalize text-lg">{weather.weather[0].description}</p>
            </div>
            <div className="flex items-center justify-between mt-6">
              <span className="text-9xl font-thin tracking-tighter">{Math.round(weather.main.temp)}°</span>
              <div className="text-right space-y-2">
                <div className="flex items-center justify-end gap-2 text-slate-300">
                   <Droplets size={20} /> <span>{weather.main.humidity}% Humedad</span>
                </div>
                <div className="flex items-center justify-end gap-2 text-slate-300">
                   <Wind size={20} /> <span>{weather.wind.speed} m/s Viento</span>
                </div>
              </div>
            </div>
          </div>

          {/* PRONÓSTICO 5 DÍAS */}
          <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-6">Próximos días</h3>
            <div className="space-y-6">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-slate-300">
                    {new Date(day.dt * 1000).toLocaleDateString('es', { weekday: 'short' })}
                  </span>
                  <div className="flex items-center gap-2">
                    <img 
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                      alt="icon"
                      className="w-10 h-10"
                    />
                    <span className="font-bold w-8 text-right">{Math.round(day.main.temp)}°</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </main>
  );
}