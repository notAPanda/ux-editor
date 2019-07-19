export default ({
  startX,
  startY
}, onUpdate) => {
  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }
    const props = {
      x: startX,
      y: startY,
      width: Math.abs(moveDiff.x),
      height: Math.abs(moveDiff.y)
    }
    onUpdate(props)
  }
}