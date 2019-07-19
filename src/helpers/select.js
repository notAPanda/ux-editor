export default ({ startX, startY }, onUpdate) => {
  const currentProps = {}

  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }
    if (moveDiff.x >= 0) {
      currentProps.x = startX
      currentProps.width = moveDiff.x
    } else {
      currentProps.x = startX + moveDiff.x
      currentProps.width = Math.abs(moveDiff.x)
    }

    if (moveDiff.y >= 0) {
      currentProps.y = startY
      currentProps.height = moveDiff.y
    } else {
      currentProps.y = startY + moveDiff.y
      currentProps.height = Math.abs(moveDiff.y)
    }
    onUpdate(currentProps)
  }
}

export const doOverlap = (selector, element) => {
  return (selector.x + selector.width) > element.x &&
  selector.x < (element.x + element.width) &&
  (selector.y + selector.height) > element.y &&
  selector.y < (element.y + element.height)
}
