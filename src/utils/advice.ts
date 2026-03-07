// src/utils/advice.ts

export const getTravelAdvice = (temp: number, condition: string) => {
  const c = condition.toLowerCase();

  // 1. LLUVIA O TORMENTA
  if (c.includes("rain") || c.includes("drizzle") || c.includes("thunderstorm")) {
    return {
      message: "A day of persistent rain. I recommend an outfit with waterproof layers, waterproof shoes, and quick-drying pants. It's an excellent time to visit museums, galleries, or enjoy a local coffee shop while the worst of the downpour passes. Don't forget an umbrella or a raincoat with a hood to stay dry while exploring the city.",
      icon: "☔",
      color: "text-blue-300"
    };
  }

  // 2. NIEVE
  if (c.includes("snow")) {
    return {
      message: "Snowy landscape! The key today is the three-layer system: a thermal base layer next to your skin, a wool or fleece layer, and a windproof jacket on top. Don't forget thick socks and boots with good traction to avoid slipping. If you plan to be outside for a while, consider thermal gloves and a hat that covers your ears. The cold can be quite intense, so it's essential to stay warm and dry. Enjoy the magical atmosphere of the city under the snow!",
      icon: "❄️",
      color: "text-blue-100"
    };
  }

  // 3. FRÍO INTENSO (Menos de 7°C)
  if (temp <= 7) {
    return {
      message: "It's quite cold. Ideally, you'll need a long coat or thick parka, a wool scarf, and gloves. If you're going to be doing a lot of walking, wear comfortable, closed shoes. The cold air can dry out your skin, so it wouldn't hurt to keep lip balm in your pocket. If you have time, consider visiting indoor attractions like museums or cozy cafes to warm up between outdoor explorations.",
      icon: "🧥",
      color: "text-cyan-200"
    };
  }

  // 4. FRESCO / OTOÑAL (8°C a 16°C)
  if (temp > 7 && temp <= 16) {
    return {
      message: "The weather is quite pleasant but a bit chilly. A light sweater or hoodie over a cotton t-shirt should be sufficient. A light jacket or 'trench coat' is perfect for the hours when it gets cooler. Jeans or chinos will pair well with the overall ambiance.",
      icon: "🧣",
      color: "text-indigo-200"
    };
  }

  // 5. TEMPLADO / PRIMAVERAL (17°C a 24°C)
  if (temp > 16 && temp <= 24) {
    if (c.includes("cloud")) {
      return {
        message: "The weather is very pleasant but somewhat cloudy. Light clothing like linen shirts or blouses is ideal. I suggest bringing a light cardigan or denim jacket in case it gets chilly in the shade or when you go into air-conditioned places.",
        icon: "👟",
        color: "text-emerald-200"
      };
    }
    return {
      message: "It's a spectacular, sunny day. Light-colored clothing and breathable fabrics like cotton are your best friends. It's the perfect day to wear open shoes or lightweight sneakers, sunglasses, and stroll through the city parks.",
      icon: "🕶️",
      color: "text-yellow-200"
    };
  }

  // 6. CALOR (Más de 25°C)
  if (temp > 25) {
    return {
      message: "Hot day. Opt for loose-fitting clothing, shorts, or light dresses. Sunscreen and a hat are essential if you'll be exposed to the sun. Look for shady routes and keep a water bottle with you at all times to avoid fatigue.",
      icon: "☀️",
      color: "text-orange-300"
    };
  }

  return {
    message: "The weather looks stable, but it's always a good idea to dress in layers. Keep a light jacket handy and enjoy exploring the city.",
    icon: "🌍",
    color: "text-white"
  };
};