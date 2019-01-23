import MobileDetect from 'mobile-detect';

const md = new MobileDetect( window.navigator.userAgent );
const platform = md.mobile() ? 'touch' : 'desktop';

require(`./view/platforms/${ platform }`);
