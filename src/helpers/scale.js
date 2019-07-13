import { getSineCosine, getPoint, getOppositePoint } from './point-finder'

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
  let point = getPoint(scaleType, { x, y, scaleX, scaleY, width, height, angle, scaleFromCenter })
  let oppositePoint = getOppositePoint(scaleType, {
    x,
    y,
    scaleX,
    scaleY,
    width,
    height,
    angle
  })
  const currentProps = {
    x,
    y,
    scaleX,
    scaleY
  }

  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }
    const { sin, cos } = getSineCosine(scaleType, angle)
    const rotatedMoveDiff = {
      x: Math.round((moveDiff.x * cos) - (moveDiff.y * sin)),
      y: Math.round((moveDiff.x * sin) + (moveDiff.y * cos))
    }
    switch (scaleType) {
      case 'ml':
        currentProps.x = x + rotatedMoveDiff.x
        currentProps.width = width - rotatedMoveDiff.x
        break
      case 'mr':
        currentProps.width = width + rotatedMoveDiff.x
        break
      case 'tm':
        currentProps.y = y + rotatedMoveDiff.y
        currentProps.height = height - rotatedMoveDiff.y
        break
      case 'tl':
        currentProps.x = x + rotatedMoveDiff.x
        currentProps.y = y + rotatedMoveDiff.y
        currentProps.width = width - rotatedMoveDiff.x
        currentProps.height = height - rotatedMoveDiff.y
        break
      case 'bm':
        currentProps.height = height + rotatedMoveDiff.y
        break
      case 'br':
        currentProps.width = width + rotatedMoveDiff.x
        currentProps.height = height + rotatedMoveDiff.y
        break
      case 'bl':
        currentProps.x = x + rotatedMoveDiff.x
        currentProps.width = width - rotatedMoveDiff.x
        currentProps.height = height + rotatedMoveDiff.y
        break
      case 'tr':
        currentProps.y = y + rotatedMoveDiff.y
        currentProps.width = width + rotatedMoveDiff.x
        currentProps.height = height - rotatedMoveDiff.y
        break
    }
    if (currentProps.width < 10) {
      currentProps.width = 10
    }
    if (currentProps.height < 10) {
      currentProps.height = 10
    }
    onUpdate(currentProps)
  }
}
