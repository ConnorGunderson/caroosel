module.exports = {
  purge: [
    './components/**/*.tsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "cloud-1": "#dde7ee",
        "cloud-2": "#81a5ba",
        "cloud-3": "#396b89",
        "cloud-4": "#323456",
        "cloud-5": "#202547",
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
