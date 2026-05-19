import { videoNew } from './modes/videoNew';
import { videoFromImg } from './modes/videoFromImg';
import { photoNew } from './modes/photoNew';
import { photoTransform } from './modes/photoTransform';
import { videoFromFrames } from './modes/videoFromFrames';
import { otherModes } from './modes/otherModes';

export const MODES = {
  'video-new': videoNew,
  'video-from-img': videoFromImg,
  'photo-new': photoNew,
  'photo-transform': photoTransform,
  'image-stacker': otherModes['image-stacker'],
  'about': otherModes['about'],
  'photo-montage': otherModes['photo-montage'],
  'video-from-frames': videoFromFrames,
  'tiktok-collections': otherModes['tiktok-collections']
};
