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

export const getForecastData = async (city: string) => {
  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  // Cambiamos 'weather' por 'forecast'
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=es`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Error al obtener pronóstico");
  
  const data = await response.json();
  
  // Filtramos para quedarnos solo con un pronóstico por día (ej: el de las 12:00 PM)
  const dailyData = data.list.filter((reading: any) => 
    reading.dt_txt.includes("12:00:00")
  );
  
  return dailyData;
};