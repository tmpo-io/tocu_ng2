



let colors = {
  groc: '#fdfbee',
  groc_fosc: '#ffffb7',
  marro: '#f1bc0f',
  marro_fosc: '#c1960b',
  verd: '#73d4c5',
  verd_fosc: '#237367',
  blau: '#8ed6dd',
  blau_fosc: '#3a6079',
  gris: '#b0b0b0',
  gris_fosc: '#424242',
  ocre: '#ffffb7',
  ocre_fosc: '#afaf00',
  vermell: '#f80707',
  vermell_fosc: '#b80505',
}


export function getColor(name: string): string {
  return colors[name];
}

export function getRandomColor(): string {
  const keys = Object.keys(colors);
  let index = keys[Math.floor(keys.length * Math.random())];
  return colors[index];
}

export function toColor(s: string): number {
  return parseInt(s.replace('#', '0x'), 16);
}

export function getRandomIntColor(): number {
  return toColor(getRandomColor());
}
