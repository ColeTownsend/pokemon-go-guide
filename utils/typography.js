import Typography from 'typography'

const options = {
  baseFontSize: '17px',
  baseLineHeight: '28px',
  bodyFontFamily: ['HK Compakt', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  headerFontFamily: ['HK Compakt', 'Segoe UI', 'Helvetica', 'Arial', 'sans-serif'],
  bodyWeight: 400,
  headerGray: 5,
  headerGrayHue: 120,
  bodyGray: 20,
  bodyGrayHue: 150,
  headerWeight: 300,
  boldWeight: 500,
  modularScales: [
    {
      scale: 'octave',
    },
  ],
}

const typography = new Typography(options)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
