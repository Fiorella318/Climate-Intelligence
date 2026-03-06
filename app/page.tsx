"use client"; // Indica que esta página tiene cosas que cambian (como el texto que escribes)

import { useState } from "react";
import { getWeatherData } from "@/services/weatherService";
import { WeatherData } from "@/types/weather";

export default function Home() {
  // 1. "Cajones" (Estados) para guardar la info
  const [city, setCity] = useState(""); // Lo que escribes en el buscador
  const [weather, setWeather] = useState<WeatherData | null>(null); // Los datos que nos da la API
  const [loading, setLoading] = useState(false); // Para saber si está cargando

  // 2. La función que se activa al dar click al botón
  const handleSearch = async () => {
    if (!city) return; // Si no escribes nada, no hace nada
    
    setLoading(true);
    try {
      const data = await getWeatherData(city);
      setWeather(data); // Guardamos el resultado en el "cajón"
    } catch (error) {
      alert("Error: No se pudo encontrar la ciudad");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-blue-50">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">SkyGuide</h1>
      
      {/* EL BUSCADOR */}
      <div className="flex gap-2 mb-8">
        <input
          type="text"
          placeholder="Escribe una ciudad..."
          className="p-2 border rounded-lg text-black"
          value={city}
          onChange={(e) => setCity(e.target.value)} // Actualiza el cajón 'city' cada vez que escribes
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </div>

      {/* RESULTADO (Solo se muestra si hay datos) */}
      {weather && (
        <div className="bg-white p-6 rounded-xl shadow-lg text-center text-black">
          <h2 className="text-2xl font-semibold">{weather.name}</h2>
          <p className="text-5xl font-bold my-4">{Math.round(weather.main.temp)}°C</p>
          <p className="capitalize text-gray-600">{weather.weather[0].description}</p>
          <div className="mt-4 text-sm text-gray-500">
            Humedad: {weather.main.humidity}% | Viento: {weather.wind.speed} m/s
          </div>
        </div>
      )}
    </main>
  );
}