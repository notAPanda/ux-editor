import {
  getSineCosine,
  getCenter
} from './point-finder'

const transform = (scaleType, moveDiff, width, height, x, y) => {
  const currentProps = {
    x,
    y,
    width,
    height
  }

  switch (scaleType) {
    case 'ml':
      currentProps.x = x + moveDiff.x
      currentProps.width = width - moveDiff.x
      break
    case 'mr':
      currentProps.width = width + moveDiff.x
      break
    case 'tm':
      currentProps.y = y + moveDiff.y
      currentProps.height = height - moveDiff.y
      break
    case 'tl':
      currentProps.x = x + moveDiff.x
      currentProps.y = y + moveDiff.y
      currentProps.width = width - moveDiff.x
      currentProps.height = height - moveDiff.y
      break
    case 'bm':
      currentProps.height = height + moveDiff.y
      break
    case 'br':
      if (!event.shiftKey) {
        currentProps.width = width + moveDiff.x
        currentProps.height = height + moveDiff.y
      } else {
        currentProps.width = width + moveDiff.x
        currentProps.height = height + moveDiff.x
      }
      break
    case 'bl':
      currentProps.x = x + moveDiff.x
      currentProps.width = width - moveDiff.x
      currentProps.height = height + moveDiff.y
      break
    case 'tr':
      if (!event.shiftKey) {
        currentProps.y = y + moveDiff.y
        currentProps.width = width + moveDiff.x
        currentProps.height = height - moveDiff.y
      } else if (moveDiff.x < Math.abs(moveDiff.y) && moveDiff.y < 0) {
        currentProps.y = y - Math.abs(moveDiff.y)
        currentProps.width = width + Math.abs(moveDiff.y)
        currentProps.height = height + Math.abs(moveDiff.y)
      } else {
        currentProps.y = y - moveDiff.x
        currentProps.width = width + moveDiff.x
        currentProps.height = height + moveDiff.x
      }
      break
  }
  if (currentProps.width < 10) {
    currentProps.width = 10
  }
  if (currentProps.height < 10) {
    currentProps.height = 10
  }

  return currentProps
}

export default (scaleType, {
  startX,
  startY,
  x,
  y,
  scaleX,
  scaleY,
  width,
  height,
  angle,
  scaleLimit,
  scaleFromCenter = false,
  enableScaleFromCenter = true,
  aspectRatio = false,
  enableAspectRatio = true
}, onUpdate) => {
  const negativeAngle = getSineCosine(null, -angle)
  const presentAngle = getSineCosine(null, angle)
  const previousCenter = getCenter({ x, y, scaleX, scaleY, width, height })
  const center = {
    x: Math.round(presentAngle.cos * (previousCenter.x - x) - presentAngle.sin * (previousCenter.y - y) + x),
    y: Math.round(presentAngle.sin * (previousCenter.x - x) + presentAngle.cos * (previousCenter.y - y) + y)
  }

  const previousTL = {
    x: Math.round(negativeAngle.cos * (x - center.x) - negativeAngle.sin * (y - center.y) + center.x),
    y: Math.round(negativeAngle.sin * (x - center.x) + negativeAngle.cos * (y - center.y) + center.y)
  }

  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }

    const rotatedMoveDiv = {
      x: Math.round(negativeAngle.cos * (moveDiff.x - 0) - negativeAngle.sin * (moveDiff.y - 0) + 0),
      y: Math.round(negativeAngle.sin * (moveDiff.x - 0) + negativeAngle.cos * (moveDiff.y - 0) + 0)
    }

    const zeroAngleProps = transform(scaleType, rotatedMoveDiv, width, height, previousTL.x, previousTL.y)
    const presentAngleProps = {
      x: Math.round(presentAngle.cos * (zeroAngleProps.x - center.x) - presentAngle.sin * (zeroAngleProps.y - center.y) + center.x),
      y: Math.round(presentAngle.sin * (zeroAngleProps.x - center.x) + presentAngle.cos * (zeroAngleProps.y - center.y) + center.y)
    }
    const currentProps = {
      ...zeroAngleProps,
      x: presentAngleProps.x,
      y: presentAngleProps.y
    }
    onUpdate(currentProps)
  }
}
