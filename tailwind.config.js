module.exports = {
  purge: ["./index.html", "./src/**/*.vue", "./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/custom-forms")],
};
