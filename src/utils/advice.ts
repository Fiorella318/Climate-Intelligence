export const getTravelAdvice = (temp: number, condition: string) => {
  if (condition.includes("rain") || condition.includes("drizzle")) {
    return { message: "Lleva un paraguas y calzado impermeable.", icon: "🌂" };
  }
  if (temp > 28) {
    return { message: "Clima caluroso. No olvides protector solar y agua.", icon: "☀️" };
  }
  if (temp < 10) {
    return { message: "Hace frío. Empaca un abrigo pesado y bufanda.", icon: "❄️" };
  }
  if (temp >= 10 && temp <= 22) {
    return { message: "Clima templado. Una chaqueta ligera será suficiente.", icon: "🧥" };
  }
  return { message: "Clima agradable para explorar. ¡Disfruta el viaje!", icon: "🌍" };
};