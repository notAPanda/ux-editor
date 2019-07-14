import {
  getSineCosine,
  getPoint,
  getOppositePoint
} from './point-finder'
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

  /*
    zrób dobre skalowanie dla konta 0 stopni
    zrob funkcję, generującą wektor o danym kącie (x: 0, y:-100)
    zrób funkcje, która obróci element o wskazany kąt (bez udziału myszy)
    --------------------------------------------------------------------------
    przelicz wartości dla elementu o przeciwnym kącie
    przelicz wartość dla wektora zmian uwzględniając przeciwny kąt
    dokonaj zmian na elemencie przy przeciwnym koncie (powinien wynosic 0)

    obróć element o wskazany kąt
    narysuj element

  */
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
    console.log(moveDiff)
    switch (scaleType) {
      case 'ml':
        currentProps.x = x + moveDiff.x
        currentProps.width = width - moveDiff.x
        break
      case 'mr':
        currentProps.width = width + moveDiff.x
        break
      case 'tm':
        if (-45 < angle && angle < 45) {
          currentProps.y = y + moveDiff.y
          currentProps.height = height - moveDiff.y
        }
        if (45 < angle && angle < 135) {
          currentProps.x = x + moveDiff.x
          currentProps.height = height + moveDiff.x
        }
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
