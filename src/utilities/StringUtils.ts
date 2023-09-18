export function generateRandomString (n: number = 5): string {
  let text = ''
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < n; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

export function colorify (str: string, saturation: number = 1, value: number = 1): string {
  const hsv = this.generateHSVColor(str, saturation, value)
  return this.HSVtoRGB(hsv[0], hsv[1], hsv[2])
}

export function generateHSVColor (str: string, saturation: number = 1, value: number = 1): [number, number, number] {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = hash % 360
  return [hue, saturation, value]
}

export function HSVtoRGB (h: number, s: number, v: number): string {
  let r, g, b
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)
  switch (i % 6) {
    case 0: r = v; g = t; b = p; break
    case 1: r = q; g = v; b = p; break
    case 2: r = p; g = v; b = t; break
    case 3: r = p; g = q; b = v; break
    case 4: r = t; g = p; b = v; break
    case 5: r = v; g = p; b = q; break
  }
  return '#' + ((1 << 24) | ((r * 255) << 16) | ((g * 255) << 8) | (b * 255)).toString(16).slice(1)
}
