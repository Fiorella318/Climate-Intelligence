# 🌤️ Climate Intelligence - Travel Intelligence Platform

**Climate Intelligence** is a high-performance weather forecasting application designed specifically for travelers. Unlike conventional weather apps, SkyGuide leverages custom logic to provide smart clothing recommendations and travel activity suggestions based on real-time meteorological data and 24-hour trends.

🚀 **Live Demo:** <a href="https://climate-intelligence.vercel.app/" target="_blank">Climate Intelligence</a>
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

## 🚀 Getting Started & Installation

Follow these steps to set up and run the project in your local environment:

### 1. Clone the repository
First, clone the project to your local machine:
```bash
git clone [https://climate-intelligence.vercel.app/](https://climate-intelligence.vercel.app/)
cd climate-intelligence
```

### 2. Install Dependencies
Install all the necessary packages and libraries mentioned in the Tech Stack:
```bash
npm install
This command installs core dependencies like recharts, framer-motion, lucide-react, and clsx.
```

### 3. Environment Setup
You need an API Key from OpenWeatherMap. Once you have it, create a file named .env.local in the root directory of the project and add your key:
```bash
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
```

### 4. Run Development Server
To start the application in development mode, run:
```bash
npm run dev
Open http://localhost:3000 in your browser to see the results.
```

### 5. Build for Production
To create an optimized production build:
```bash
npm run build
npm start
```

## 📂 Project Structure
To maintain clean code and separate concerns, the project follows this directory structure:

**/src/app:** Contains the core application logic, layouts, and page views (Next.js App Router).

**/src/services:** Handles all API integration and data fetching logic with OpenWeatherMap.

**/src/utils:** Contains the business logic for the Smart Travel Advisor algorithm.

**/src/components:** Reusable UI components such as the WeatherSkeleton and HourlyChart.

**/src/types:** TypeScript interfaces and types to ensure data consistency across the app.

## 👩‍💻 Author
### Fiorella
Software Developer focused on building intuitive, data-driven, and user-centric web experiences.

*This project was developed for educational and professional portfolio purposes.*