import { SET_CURRENT_IMAGE_IN_PREVIEW, SET_IMAGES_IN_PREVIEW } from './types';

export const setImages = (images) => {
  return { type: SET_IMAGES_IN_PREVIEW, payload: images };
};

export const setCurrentImage = (image) => {
  return { type: SET_CURRENT_IMAGE_IN_PREVIEW, payload: image };
};
