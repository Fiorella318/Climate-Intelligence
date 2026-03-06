export const getWeatherData = async (city: string) => {
  // Sacamos la llave que guardaste en el archivo .env.local
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  
  // Esta es la dirección de la "oficina" de OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Ciudad no encontrada");
  }

  return await response.json();
};