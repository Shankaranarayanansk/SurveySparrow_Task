const labelsClasses = [
  "indigo",
  "gray",
  "green",
  "blue",
  "red",
  "purple",
];

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  safelist: [
    // Backgrounds
    ...labelsClasses.map((lbl) => `bg-${lbl}-500`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-100`),
    ...labelsClasses.map((lbl) => `bg-${lbl}-200`),

    // Text colors
    ...labelsClasses.map((lbl) => `text-${lbl}-400`),
    ...labelsClasses.map((lbl) => `text-${lbl}-500`),
    ...labelsClasses.map((lbl) => `text-${lbl}-600`),

    // Borders
    ...labelsClasses.map((lbl) => `border-${lbl}-500`),

    // Hover states
    ...labelsClasses.map((lbl) => `hover:bg-${lbl}-100`),
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans"],
        poppins: ["Poppins", "sans-serif"],
      },
      gridTemplateColumns: {
        "1/5": "1fr 5fr",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
