export const CALL_UNSPLASH = "@unsplash/CALL_UNSPLASH";
export const CALL_UNSPLASH_SUCCESS = "@unsplash/CALL_UNSPLASH_SUCCESS";

export function callUnsplash() {
  return {
    type: CALL_UNSPLASH,
  };
}

export function callUnsplashSuccess(data) {
  return {
    type: CALL_UNSPLASH_SUCCESS,
    payload: data,
  };
}
