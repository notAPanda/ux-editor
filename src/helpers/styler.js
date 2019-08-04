export const roundTo = n => Math.round(n);
export default ({
  x,
  y,
  angle,
  width,
  height,
  disableScale = false,
  zIndex
}) => {
  return {
    element: {
      width,
      height,
      position: "absolute"
    },
    controls: {
      width,
      height,
      position: "absolute"
    }
  };
};
