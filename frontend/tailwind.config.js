export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        block: 'linear-gradient(90deg, #44C9DB 0%, #BD03FF 100%)',
        hbtn: ' linear-gradient(90deg, #00408A 0%, #0079D0 103.79%)',
        hbtn2: 'linear-gradient(90deg, #400AB1 0%, #4349D6 103.79%)',
        hbtn3: 'linear-gradient(90deg, #E89A80 0%, #FDDC5A 103.79%)',
        cards1:
          'linear-gradient(102.72deg, rgba(239, 192, 255, 0.1) 0%, rgba(79, 11, 103, 0.1) 102.5%)',
        dataset: ' linear-gradient(90deg, #FFE455 0%, #E79980 100%)',
        cta: 'linear-gradient(90deg, #FFD25D 0%, #FF6F1E 100%)',
        phero: ' linear-gradient(89.84deg, #BFB5FF 0.08%, #6BB3F5 90.15%)',
        pbtn: ' linear-gradient(90deg, #400AB1 0%, #4349D6 103.79%)',
        reward: 'linear-gradient(90deg, #7159C1 0%, #0079D0 103.79%)',
      },
      background: {
        cards11:
          'linear-gradient(102.72deg, rgba(239, 192, 255, 0.1) 0%, rgba(79, 11, 103, 0.1) 102.5%)',
      },
      boxShadow: {
        btns: '10px 8px 10.4px 0px #00000040',
        cards1: ' 0px 4px 4px 0px #00000040',
      },
    },
  },
  plugins: [],
};
