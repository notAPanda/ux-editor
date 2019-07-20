export const translateMultiple = ({ x, y, startX, startY }, onUpdate) => {
  return (event) => {
    const moveDiff = {
      x: event.pageX - startX,
      y: event.pageY - startY
    }

    onUpdate(moveDiff)

    startX = event.pageX
    startY = event.pageY
  }
}
