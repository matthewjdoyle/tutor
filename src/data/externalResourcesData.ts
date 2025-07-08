import { ExternalLearningResource } from '../types';

export const externalLearningResourcesData: ExternalLearningResource[] = [
  {
    id: 'ext001',
    name: 'HyperPhysics',
    url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
    audience: 'A-Level / University',
    icon: 'externalLogos/hyperphysics.png',
  },
  {
    id: 'ext002',
    name: 'BBC Bitesize - GCSE',
    url: 'https://www.bbc.co.uk/bitesize/levels/z98jmp3',
    audience: 'GCSE',
    icon: 'externalLogos/bitesize.png',
  },
  {
    id: 'ext003',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org/',
    audience: 'All Levels',
    icon: 'externalLogos/khan-academy.png',
  },
  {
    id: 'ext004',
    name: 'Isaac Physics',
    url: 'https://isaacphysics.org/',
    audience: 'A-Level / University',
    icon: 'externalLogos/isaacphysics.png',
  },
  {
    id: 'ext005',
    name: 'PhET Interactive Simulations',
    url: 'https://phet.colorado.edu/',
    audience: 'All Levels',
    icon: 'externalLogos/PhET.png',
  }
];
