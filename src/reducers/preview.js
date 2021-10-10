import {
  SET_CURRENT_IMAGE_IN_PREVIEW,
  SET_IMAGES_IN_PREVIEW,
} from '../actions/types';

const initialState = {
  images: undefined,
  currentImage: undefined,
};

const order = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_CURRENT_IMAGE_IN_PREVIEW:
      return { ...state, currentImage: payload };
    case SET_IMAGES_IN_PREVIEW:
      return { ...state, images: payload };
    default:
      return state;
  }
};

export default order;
