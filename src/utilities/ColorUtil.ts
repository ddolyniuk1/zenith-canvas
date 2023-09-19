export function convert (color: string): number {
  return parseInt(color.replace(/^#/, ''), 16)
}

export function darken (color: string, percentage: number): string {
  let r = parseInt(color.substring(1, 3), 16)
  let g = parseInt(color.substring(3, 5), 16)
  let b = parseInt(color.substring(5, 7), 16)

  r = Math.floor(r * (1 - percentage / 100))
  g = Math.floor(g * (1 - percentage / 100))
  b = Math.floor(b * (1 - percentage / 100))

  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0')
}

export function extractRGB (color: number): any {
  const r = (color >> 16) & 0xFF
  const g = (color >> 8) & 0xFF
  const b = color & 0xFF

  return { r, g, b }
}

export function convertRGBToInt ({ r, g, b }: { r: number, g: number, b: number }): number {
  return (r << 16) + (g << 8) + b
}
