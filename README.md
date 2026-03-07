# 🌤️ SkyGuide - Travel Intelligence Platform

**SkyGuide** is a high-performance weather forecasting application designed specifically for travelers. Unlike conventional weather apps, SkyGuide leverages custom logic to provide smart clothing recommendations and travel activity suggestions based on real-time meteorological data and 24-hour trends.

🚀 **Live Demo:** [https://climate-intelligence.vercel.app/](https://climate-intelligence.vercel.app/)

---

## ✨ Key Features

* **Global Search:** Real-time weather data for any city worldwide using the OpenWeatherMap API.
* **Smart Travel Advisor:** A granular algorithm that suggests outfits (linen, wool, layers) and activities (museums during rain, outdoor parks during sun).
* **Data Visualization:** Interactive **Area Charts** showing temperature trends for the next 24 hours.
* **Extended Forecast:** Detailed 5-day weather outlook with visual icons and temperature ranges.
* **Premium UX/UI:** Fully responsive design featuring **Glassmorphism**, smooth **Framer Motion** animations, and unit switching (°C/°F).
* **Performance:** Optimized loading states with **Skeleton Screens** for a seamless user experience.

---

## 🛠️ Tech Stack & Dependencies

This project is built with a modern tech stack focused on performance, type safety, and scalability:

* **Framework:** [Next.js 14](https://nextjs.org/) (App Router)
* **Language:** [TypeScript](https://www.typescriptlang.org/) (Static Typing)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Utility-first CSS)
* **Data Viz:** [Recharts](https://recharts.org/) (Interactive charts)
* **Animations:** [Framer Motion](https://www.framer.com/motion/) (Production-ready motion)
* **Icons:** [Lucide React](https://lucide.dev/) (Consistent iconography)
* **API:** [OpenWeatherMap API](https://openweathermap.org/api)

---

## 🚀 Getting Started

Follow these steps to set up and run the project locally:

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/climate-intelligence.git](https://github.com/your-username/climate-intelligence.git)
cd climate-intelligence
2. Install dependencies
Install all required packages using npm:

Bash
npm install
Note: This will install recharts, framer-motion, lucide-react, and clsx.

3. Environment Setup
Create a .env.local file in the root directory and add your OpenWeather API Key:

Fragmento de código
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
4. Run Development Server
Bash
npm run dev
Open http://localhost:3000 in your browser to see the results.

📂 Project Structure
To maintain clean code and separate concerns, the project follows this directory structure:

/src/app: Contains the core application logic, layouts, and page views (Next.js App Router).

/src/services: Handles all API integration and data fetching logic with OpenWeatherMap.

/src/utils: Contains the business logic for the Smart Travel Advisor algorithm.

/src/components: Reusable UI components such as the WeatherSkeleton and HourlyChart.

/src/types: TypeScript interfaces and types to ensure data consistency across the app.

👩‍💻 Author
Fiorella
Software Developer focused on building intuitive, data-driven, and user-centric web experiences.

This project was developed for educational and professional portfolio purposes.