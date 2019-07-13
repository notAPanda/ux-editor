import {
    scale,
    rotate,
    translate,
    transform,
    toCSS
  } from 'transformation-matrix';
  
  //https://stackoverflow.com/questions/15762768/javascript-math-round-to-two-decimal-places
  const roundTo = (n) => Math.round(n)
  
  export default ({x, y, angle, scaleX, scaleY, width, height, disableScale = false}) => {
    return {
      element: {
        width,
        height,
        transform: `rotate(0deg) translate(${roundTo(x)}px, ${roundTo(y)}px) rotate(${angle}deg)`,
        position: "absolute",
      },
      controls: {
        width,
        height,
        transform: `rotate(0deg) translate(${roundTo(x)}px, ${roundTo(y)}px) rotate(${angle}deg)`,
        position: "absolute",
      }
    }
  }