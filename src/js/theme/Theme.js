export const modularScale = {
  ms10  : '11.089rem',
  ms9   : '8.755rem',
  ms8   : '6.854rem',
  ms7   : '5.411rem',
  ms6   : '4.236rem',
  ms5   : '3.344rem',
  ms4   : '2.618rem',
  ms3   : '2.067rem',
  ms2   : '1.618rem',
  ms1   : '1.277rem',
  ms0   : '1rem',
  'ms-0': '0.723rem',
  'ms-1': '0.618rem',
  'ms-2': '0.382rem',
  'ms-3': '0.236rem',
  'ms-4': '0.146rem'
};

// 16px = 1rem, modular scale 0 entry
export const BASE_MEASURE = 1;

export const theme = {
  colors   : {
    black         : '#000',
    'near-black'  : '#111',
    'dark-gray'   : '#333',
    'mid-gray'    : '#555',
    gray          : ' #777',
    silver        : '#999',
    'light-silver': '#aaa',
    'moon-gray'   : '#ccc',
    'light-gray'  : '#eee',
    'near-white'  : '#f4f4f4',
    white         : '#fff',
    transparent   : 'transparent',
    blacks        : [
      'rgba(0,0,0,.0125)',
      'rgba(0,0,0,.025)',
      'rgba(0,0,0,.05)',
      'rgba(0,0,0,.1)',
      'rgba(0,0,0,.2)',
      'rgba(0,0,0,.3)',
      'rgba(0,0,0,.4)',
      'rgba(0,0,0,.5)',
      'rgba(0,0,0,.6)',
      'rgba(0,0,0,.7)',
      'rgba(0,0,0,.8)',
      'rgba(0,0,0,.9)',
    ],
    whites        : [
      'rgba(255,255,255,.0125)',
      'rgba(255,255,255,.025)',
      'rgba(255,255,255,.05)',
      'rgba(255,255,255,.1)',
      'rgba(255,255,255,.2)',
      'rgba(255,255,255,.3)',
      'rgba(255,255,255,.4)',
      'rgba(255,255,255,.5)',
      'rgba(255,255,255,.6)',
      'rgba(255,255,255,.7)',
      'rgba(255,255,255,.8)',
      'rgba(255,255,255,.9)',
    ]
  },
  //https://webgradients.com/
  gradients: {
    'warm-flame'      : 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
    'sunny-morning'   : 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
    'dusty-grass'     : 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
    'winter-neva'     : 'linear-gradient(120deg, #a1c4fd 0%, #c2e9fb 100%)',
    'tempting-azue'   : 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)',
    'heavy-rain'      : 'linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%)',
    'cloudy-knoxville': 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    'ripe-malinka'    : 'linear-gradient(120deg, #f093fb 0%, #f5576c 100%)',
    'malibu-beach'    : 'linear-gradient(to right, #4facfe 0%, #00f2fe 100%)',
    'saint-petersburg': 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
    'strong-bliss'    : 'linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)',
    'above-clouds'    : 'linear-gradient(to left, #BDBBBE 0%, #9D9EA3 100%), radial-gradient(88% 271%, rgba(255, 255, 255, 0.25) 0%, rgba(254, 254, 254, 0.25) 1%, rgba(0, 0, 0, 0.25) 100%), radial-gradient(50% 100%, rgba(255, 255, 255, 0.30) 0%, rgba(0, 0, 0, 0.30) 100%)',
    'premium-dark'    : 'linear-gradient(to right, #434343 0%, black 100%)',
    'premium-white'   : 'linear-gradient(to top, #d5d4d0 0%, #d5d4d0 1%, #eeeeec 31%, #efeeec 75%, #e9e9e7 100%)'
  },
  space    : [BASE_MEASURE * 0.25, BASE_MEASURE * 0.5, BASE_MEASURE * 0.75, BASE_MEASURE, BASE_MEASURE * 1.25, BASE_MEASURE * 1.5, BASE_MEASURE * 2, BASE_MEASURE * 3],
  baseUnit : 'rem',
  fonts    : {
    sansSerif: '\'Helvetica Neue\', Helvetica, Arial, sans-serif'
  },
  shadows  : {
    textLight    : '1px 1px 0 rgba(255,255,255,.75)',
    textDark     : '1px 1px 0 rgba(0,0,0,.25)',
    textDarkSmall: '1px 1px 3px rgba(0,0,0,.25)',
    textEmboss   :
      '-1px -1px 0 rgba(0, 0, 0, .15), 1px 1px 0 rgba(255, 255, 255, .1)',
    dropShadow   : {
      xs: '0 1px 2px rgba(0,0,0,0.075)',
      sm: '0 2px 4px rgba(0,0,0,0.05), 2px 6px 8px -5px rgba(0,0,0,0.15)',
      m : '0 2px 4px rgba(0,0,0,0.05), 4px 8px 15px -7px rgba(0,0,0,0.1), 4px 8px 20px rgba(0,0,0,0.10)',
      lg: '0 1px  6px  rgba(0, 0, 0, .1), 0 8px  8px  rgba(0, 0, 0, .05), 4px 23px 40px -15px rgba(0,0,0,0.15), 8px 30px 64px rgba(0, 0, 0, .1)',
      xl: '0 1px  6px  rgba(0, 0, 0, .05), 0 8px  8px  rgba(0, 0, 0, .1), 0 16px 16px rgba(0, 0, 0, .1), 4px 32px 32px rgba(0, 0, 0, .05), 8px 50px 64px rgba(0, 0, 0, .15)',
      bigsoft: '0 16px 16px -20px rgba(0, 0, 0, .05), 4px 32px 64px -50px rgba(0, 0, 0, .05), 8px 70px 128px -20px rgba(0, 0, 0, .2)'
    }
  },
  radii    : ['3px', modularScale.ms0],
  fontSizes: [modularScale['ms-1'], '0.8rem', modularScale.ms0, modularScale.ms2],
  habitat  : {
    cardWidth             : 300,
    cardHeight            : 350,
    backgroundSize        : 100,
    backgroundSizeSelected: 300
  }
};