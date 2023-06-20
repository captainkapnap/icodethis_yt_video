import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")(
    {
      strategy: 'class',
    }
  )],
  darkMode: 'class',
} satisfies Config;
