import { getCenter } from "./point-finder";
import { rotatePoint } from "./point-transformer";

const transform = (scaleType, moveDiff, width, height, x, y) => {
  const currentProps = {
    x,
    y,
    width,
    height
  };

  switch (scaleType) {
    case "ml":
      currentProps.x = x + moveDiff.x;
      currentProps.width = width - moveDiff.x;
      break;
    case "mr":
      currentProps.width = width + moveDiff.x;
      break;
    case "tm":
      currentProps.y = y + moveDiff.y;
      currentProps.height = height - moveDiff.y;
      break;
    case "tl":
      currentProps.x = x + moveDiff.x;
      currentProps.y = y + moveDiff.y;
      currentProps.width = width - moveDiff.x;
      currentProps.height = height - moveDiff.y;
      break;
    case "bm":
      currentProps.height = height + moveDiff.y;
      break;
    case "br":
      if (!event.shiftKey) {
        currentProps.width = width + moveDiff.x;
        currentProps.height = height + moveDiff.y;
      } else {
        currentProps.width = width + moveDiff.x;
        currentProps.height = height + moveDiff.x;
      }
      break;
    case "bl":
      currentProps.x = x + moveDiff.x;
      currentProps.width = width - moveDiff.x;
      currentProps.height = height + moveDiff.y;
      break;
    case "tr":
      if (!event.shiftKey) {
        currentProps.y = y + moveDiff.y;
        currentProps.width = width + moveDiff.x;
        currentProps.height = height - moveDiff.y;
      } else if (moveDiff.x < Math.abs(moveDiff.y) && moveDiff.y < 0) {
        currentProps.y = y - Math.abs(moveDiff.y);
        currentProps.width = width + Math.abs(moveDiff.y);
        currentProps.height = height + Math.abs(moveDiff.y);
      } else {
        currentProps.y = y - moveDiff.x;
        currentProps.width = width + moveDiff.x;
        currentProps.height = height + moveDiff.x;
      }
      break;
  }
  if (currentProps.width < 10) {
    currentProps.width = 10;
  }
  if (currentProps.height < 10) {
    currentProps.height = 10;
  }

  return currentProps;
};

export default (
  scaleType,
  {
    startX,
    startY,
    x,
    y,
    width,
    height,
    angle,
    scaleLimit,
    scaleFromCenter = false,
    enableScaleFromCenter = true,
    aspectRatio = false,
    enableAspectRatio = true
  },
  onUpdate
) => {
  const previousCenter = getCenter({ x, y, width, height });
  const center = rotatePoint(previousCenter, { x, y }, angle);
  const previousTL = rotatePoint({ x, y }, center, -angle);

  return event => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    };
    const rotatedMoveDiv = rotatePoint(moveDiff, { x: 0, y: 0 }, -angle);
    const zeroAngleProps = transform(
      scaleType,
      rotatedMoveDiv,
      width,
      height,
      previousTL.x,
      previousTL.y
    );
    const presentAngleProps = rotatePoint(zeroAngleProps, center, angle);

    const currentProps = {
      ...zeroAngleProps,
      ...presentAngleProps
    };
    onUpdate(currentProps);
  };
};
