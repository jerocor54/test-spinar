module.exports = {
  important: true,
  prefix: '',
  purge: {
    content: ['./src/**/*.{ts,html,scss}']
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
};
