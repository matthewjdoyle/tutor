import { ExternalLearningResource } from '../types';
import { GlobeAltIcon } from '../assets/icons';

export const externalLearningResourcesData: ExternalLearningResource[] = [
  {
    id: 'ext001',
    name: 'HyperPhysics',
    url: 'http://hyperphysics.phy-astr.gsu.edu/hbase/index.html',
    audience: 'A-Level / University',
    icon: GlobeAltIcon,
  },
  {
    id: 'ext002',
    name: 'BBC Bitesize - GCSE',
    url: 'https://www.bbc.co.uk/bitesize/gcse',
    audience: 'GCSE',
    icon: GlobeAltIcon,
  },
  {
    id: 'ext003',
    name: 'Khan Academy',
    url: 'https://www.khanacademy.org/',
    audience: 'All Levels',
    icon: GlobeAltIcon,
  },
  {
    id: 'ext004',
    name: 'Isaac Physics',
    url: 'https://isaacphysics.org/',
    audience: 'A-Level / University',
    icon: GlobeAltIcon,
  },
  {
    id: 'ext005',
    name: 'PhET Interactive Simulations',
    url: 'https://phet.colorado.edu/',
    audience: 'All Levels',
    icon: GlobeAltIcon,
  }
];
