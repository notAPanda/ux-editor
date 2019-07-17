import { getSineCosine } from './point-finder'

export const rotatePoint = (point, relative, angle) => {
  const { sin, cos } = getSineCosine(null, angle)
  return {
    x: Math.round(cos * (point.x - relative.x) - sin * (point.y - relative.y) + relative.x),
    y: Math.round(sin * (point.x - relative.x) + cos * (point.y - relative.y) + relative.y)
  }
}
