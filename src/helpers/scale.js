// import {
//   getSineCosine,
//   getPoint,
//   getOppositePoint
// } from './point-finder'
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
  // let point = getPoint(scaleType, { x, y, scaleX, scaleY, width, height, angle, scaleFromCenter })
  // let oppositePoint = getOppositePoint(scaleType, {
  //   x,
  //   y,
  //   scaleX,
  //   scaleY,
  //   width,
  //   height,
  //   angle
  // })
  const currentProps = {
    x,
    y,
    width,
    height
  }
  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
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
    onUpdate(currentProps)
  }
}
