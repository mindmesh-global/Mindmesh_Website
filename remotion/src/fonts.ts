import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { loadFont as loadPlayfair } from '@remotion/google-fonts/PlayfairDisplay';

const inter = loadInter('normal', {
  weights: ['400', '500', '600', '700'],
  subsets: ['latin'],
});

/** Playfair Display — Georgia-like serif for MindMesh branding in Remotion */
const brandSerif = loadPlayfair('normal', {
  weights: ['400', '700'],
  subsets: ['latin'],
});

export const interFontFamily = inter.fontFamily;
export const georgiaFontFamily = brandSerif.fontFamily;
