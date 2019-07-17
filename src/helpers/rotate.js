import { getCenter } from './point-finder'
import { rotatePoint } from './point-transformer'

export default ({ x, y, scaleX, scaleY, width, height, angle, startX, startY, offsetX, offsetY }, onUpdate) => {
  const oldCenter = getCenter({ x, y, scaleX, scaleY, width, height })
  const center = rotatePoint(oldCenter, { x, y }, angle)
  const oldTL = rotatePoint({ x, y }, center, -angle)
  const pressAngle = Math.atan2((startY - offsetY) - center.y, (startX - offsetX) - center.x) * 180 / Math.PI

  return (event) => {
    const degree = Math.atan2((event.pageY - offsetY) - center.y, (event.pageX - offsetX) - center.x) * 180 / Math.PI
    let ang = Math.round(angle + degree - pressAngle)
    if (event.shiftKey) {
      ang = (ang / 15 >> 0) * 15
    }

    const multi = ang / 360
    if (multi > 1 || multi < -1) {
      ang = ang - Math.round(multi) * 360
    }

    const newXY = rotatePoint(oldTL, center, ang)

    onUpdate({
      angle: ang,
      ...newXY
    })
  }
}
