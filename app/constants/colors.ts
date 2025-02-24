export const Colors = {
  red: '#ff3b30',
  orange: '#ff9500',
  yellow: '#ffcc00',
  green: '#34c759',
  blue: '#007aff',
  purple: '#5856d6',
  pink: '#ff2d55',
  brown: '#a2845e',
} as const;

export type ColorKey = keyof typeof Colors;
export type ColorValue = (typeof Colors)[ColorKey];

export const COLOR_KEYS = Object.keys(Colors) as ColorKey[];
