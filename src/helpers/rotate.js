import { getCenter, getSineCosine, getTL } from './point-finder'

export default ({ x, y, scaleX, scaleY, width, height, angle, startX, startY, offsetX, offsetY }, onUpdate) => {
  const oldCenter = getCenter({ x, y, scaleX, scaleY, width, height })
  const { sin, cos } = getSineCosine(null, angle)
  const prim = getSineCosine(null, -angle)  
  
  const center = {
    x: Math.round(cos * (oldCenter.x - x) - sin * (oldCenter.y - y) + x),
    y: Math.round(sin * (oldCenter.x - x) + cos * (oldCenter.y - y) + y)
  }

  const oldTL = {
    x: Math.round(prim.cos * (x - center.x) - prim.sin * (y - center.y) + center.x),
    y: Math.round(prim.sin * (x - center.x) + prim.cos * (y - center.y) + center.y)
  }

  const pressAngle = Math.atan2((startY - offsetY) - center.y, (startX - offsetX) - center.x) * 180 / Math.PI

  return (event) => {
    const degree = Math.atan2((event.pageY - offsetY) - center.y, (event.pageX - offsetX) - center.x) * 180 / Math.PI
    
    let ang = Math.round(angle + degree - pressAngle)
    
    if (event.shiftKey) {
      ang = (ang / 15 >> 0) * 15
    }

    const { sin, cos } = getSineCosine(null, ang)
    const newX = Math.round(cos * (oldTL.x - center.x) - sin * (oldTL.y - center.y) + center.x)
    const newY = Math.round(sin * (oldTL.x - center.x) + cos * (oldTL.y - center.y) + center.y)

    onUpdate({
      angle: ang,
      x: newX,
      y: newY
    })
  }
}
