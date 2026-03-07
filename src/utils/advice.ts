export const getTravelAdvice = (temp: number, condition: string) => {
  if (condition.includes("rain") || condition.includes("drizzle")) {
    return { message: "Bring an umbrella and waterproof shoes.", icon: "🌂" };
  }
  if (temp > 28) {
    return { message: "Hot weather. Don't forget sunscreen and water.", icon: "☀️" };
  }
  if (temp < 10) {
    return { message: "It's cold. Pack a heavy coat and scarf.", icon: "❄️" };
  }
  if (temp >= 10 && temp <= 22) {
    return { message: "Mild weather. A light jacket will be sufficient.", icon: "🧥" };
  }
  return { message: "Gentle weather for exploring. Enjoy the trip!", icon: "🌍" };
};