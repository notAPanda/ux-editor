import { rotatePoint } from "./point-transformer";

/**
 * Find the actual point position of a transformed point
 *
 * @param {Object} payload an object holding required information to find actual point
 * @param {number} payload.x position of x
 * @param {number} payload.y position of y
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center  {{x,y}} the center of element
 * @param {number} payload.rad the a computed radians of a provided angle
 *
 * @returns {{x: number, y: number}} an object holding the position
 */
const findPoint = ({ x, y, angle, center, rad = angle * (Math.PI / 180) }) => {
  return { x, y };
};

/**
 * Get the Center point of a box
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 *
 * @returns {{x: *, y: *}} the center of point of element
 */
export const getCenter = ({ x, y, width, height }) => {
  return {
    x: x + width / 2,
    y: y + height / 2
  };
};
/**
 * Get the Center point of a box
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 *
 * @returns {{x: *, y: *}} the center of point of element
 */
export const getRotatedCenter = ({ x, y, width, height, angle }) => {
  return rotatePoint(
    {
      x: x + width / 2,
      y: y + height / 2
    },
    { x, y },
    angle
  );
};

/**
 * get the TopLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTL = ({ x, y }) => ({ x, y });

/**
 * get the LeftBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBL = ({ x, y, width, height, angle }) => {
  return rotatePoint(
    {
      x,
      y: y + height
    },
    { x, y },
    angle
  );
};

/**
 * Get TopRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTR = ({ x, y, width, height, angle }) =>
  rotatePoint(
    {
      x: x + width,
      y
    },
    { x, y },
    angle
  );

/**
 * Get BottomRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBR = ({ x, y, width, height, angle }) => {
  return rotatePoint(
    {
      x: x + width,
      y: y + height
    },
    { x, y },
    angle
  );
};

/**
 * get MiddleRight point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getMR = ({ x, y, width, height, angle }) =>
  rotatePoint(
    {
      x: x + width,
      y: y + height / 2
    },
    { x, y },
    angle
  );

/**
 * get MiddleBottom point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getBM = ({ x, y, width, height, angle }) =>
  rotatePoint(
    {
      x: x + width / 2,
      y: y + height
    },
    { x, y },
    angle
  );

/**
 * get MiddleTop point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getTM = ({ x, y, width, height, angle }) =>
  rotatePoint(
    {
      x: x + width / 2,
      y: y
    },
    { x, y },
    angle
  );

/**
 * get MiddleLeft point position
 *
 * @param {Object} payload element information
 * @param {number} payload.x the position of x
 * @param {number} payload.y the position of y
 * @param {number} payload.width the original width of element
 * @param {number} payload.height the original height of element
 * @param {number} payload.angle the  rotation angle
 * @param {Object} payload.center {{x:number, y:number}}
 *
 * @returns {{x: number, y: number}} the position
 */
export const getML = ({ x, y, width, height, angle }) =>
  findPoint(
    {
      x: x,
      y: y + height / 2
    },
    { x, y },
    angle
  );

/**
 * given a point, get it's opposite point
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
export const getOppositePoint = (scaleType, props) => {
  let caller;

  const center = getRotatedCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    angle: props.angle
  });

  props = {
    center,
    ...props,
    x: getOriginalPositionFromScale(props.x, props.width),
    y: getOriginalPositionFromScale(props.y, props.height)
  };

  switch (scaleType) {
    case "tl":
      caller = getBR;
      break;

    case "ml":
      caller = getMR;
      break;

    case "tr":
      caller = getBL;
      break;

    case "tm":
      caller = getBM;
      break;

    case "bl":
      caller = getTR;
      break;

    case "bm":
      caller = getTM;
      break;

    case "br":
      caller = getTL;
      break;

    case "mr":
      caller = getML;
      break;
  }
  return caller(props);
};

/**
 * given a point position by it's string name
 *
 * @param {string} scaleType scale point position name
 * @param {Object} props element information
 * @param {number} props.x the position of x
 * @param {number} props.y the position of y
 * @param {number} props.width the original width of element
 * @param {number} props.height the original height of element
 * @param {number} props.angle the  rotation angle
 * @param {boolean} props.scaleFromCenter scaling performed from center
 * @param {Object} props.center {{x:number, y:number}}
 *
 * @returns {{x:number, y:number}} point position
 */
export const getPoint = (scaleType, props) => {
  const center = getRotatedCenter({
    x: props.x,
    y: props.y,
    width: props.width,
    height: props.height,
    angle: props.angle
  });

  if (props.scaleFromCenter) {
    return center;
  }

  props = {
    center,
    ...props,
    x: getOriginalPositionFromScale(props.x, props.width),
    y: getOriginalPositionFromScale(props.y, props.height)
  };

  let caller;
  switch (scaleType) {
    case "tl":
      caller = getTL;
      break;

    case "ml":
      caller = getML;
      break;

    case "tr":
      caller = getTR;
      break;

    case "tm":
      caller = getTM;
      break;

    case "bl":
      caller = getBL;
      break;

    case "bm":
      caller = getBM;
      break;

    case "br":
      caller = getBR;
      break;

    case "mr":
      caller = getMR;
      break;
  }

  return caller(props);
};

/**
 * get sine and cosine for a point based on angle and point name
 *
 * @param {string} scaleType scale point position name
 * @param {number} angle the  rotation angle
 *
 * @returns {{sin: number, cos: number}} the sine and cosine of scale type
 */
export const getSineCosine = (scaleType, angle) => {
  switch (scaleType) {
    case "tr":
    case "tm":
    case "bl":
    case "bm":
      return {
        cos: Math.cos(-angle * (Math.PI / 180)),
        sin: Math.sin(-angle * (Math.PI / 180))
      };
    default:
      return {
        sin: Math.sin(angle * (Math.PI / 180)),
        cos: Math.cos(angle * (Math.PI / 180))
      };
  }
};

/**
 * get the amount of movement for a point
 *
 * @param {string} scaleType scale point position name
 * @param {object} oppositePoint the opposite point position {x: number,y: number}
 * @param {object} point the point position {x: number,y: number}
 * @param {object} moveDiff the the amount of pixels that element moved {x: number,y: number}
 *
 * @returns {{x: number, y:number}} the new position of moved element
 */
export const getMovePoint = (scaleType, oppositePoint, point, moveDiff) => {
  switch (scaleType) {
    case "tl":
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case "ml":
      return {
        x: oppositePoint.x - moveDiff.x - point.x,
        y: oppositePoint.y - moveDiff.y - point.y
      };

    case "tr":
    case "tm":
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: oppositePoint.y - (moveDiff.y + point.y)
      };
    case "mr":
    case "br":
      return {
        x: point.x + (moveDiff.x - oppositePoint.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
    case "bl":
    case "bm":
      return {
        x: oppositePoint.x - (moveDiff.x + point.x),
        y: point.y + (moveDiff.y - oppositePoint.y)
      };
  }
};

/**
 * guess the original point position based on scale and the position after scaling
 *
 * @param {number} position the position of x or y
 * @param {number} size the size of element (width for x, height for y)
 * @param {number} scale the amount of scaled element (scaleX for x, scaleY for y)
 *
 * @returns {number} the original point position
 */
const getOriginalPositionFromScale = (position, size) => {
  return position;
};

/**
 * Find the real position of lowest and highest handle
 *
 * @param  {object} point the point
 * @returns {{x: number, y: number}} the max and min values of  X & Y
 */
export const minMax = point => {
  const points = [getTL(point), getTR(point), getBL(point), getBR(point)];

  const bounds = points.reduce((bounds, point, c) => {
    if (c === 0) {
      bounds.xmin = point.x;
      bounds.xmax = point.x;
      bounds.ymin = point.y;
      bounds.ymax = point.y;
    } else {
      bounds.xmin = Math.min(bounds.xmin, point.x);
      bounds.xmax = Math.max(bounds.xmax, point.x);
      bounds.ymin = Math.min(bounds.ymin, point.y);
      bounds.ymax = Math.max(bounds.ymax, point.y);
    }
    return bounds;
  }, {});

  return bounds;
};

export const getElementXSnapPoints = point => {
  return [getTL(point), getTR(point), getBL(point), getBR(point), getRotatedCenter(point)].map(e => e.x);
};

export const getElementYSnapPoints = point => {
  return [getTL(point), getTR(point), getBL(point), getBR(point)].map(e => e.y);
};
