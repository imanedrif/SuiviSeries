/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily:{
        poppins:['Poppins', 'sans-serif']
      },
      backgroundColor: {
        body: '#070636', 
      },
      colors:{
        'red':'#FF0000',
        'grey-500':'rgba(163, 163, 163, 0.70)'
      }
    },
  },
  plugins: [],
}

