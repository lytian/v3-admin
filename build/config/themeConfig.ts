import { generate } from '@ant-design/colors';
import { mixLighten, mixDarken, tinycolor } from 'vite-plugin-theme';

export const primaryColor = '#409EFF';

export const darkMode = 'light';

type GenerateTheme = 'default' | 'dark';

export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  });
}

export function getThemeColors(color?: string) {
  const tc = color || primaryColor;
  const lightColors = generateAntColors(tc);
  const primary = lightColors[5];
  const modeColors = generateAntColors(primary, 'dark');

  return [...lightColors, ...modeColors];
}

export function generateColors(color: string = primaryColor) {
  const arr = new Array(19).fill(0);
  // 亮色
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  });

  // 暗色
  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  });

  // 透明色
  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  });
  // 简短rgb
  const shortAlphaColors = alphaColors.map((item) => item.replace(/\s/g, '').replace(/0\./g, '.'));
  // 趋近于#FFFFFF
  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#ffffff');
  // 趋近于#000000
  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter((item) => item !== '#000000');
  return [
    ...lightens,
    ...darkens,
    ...alphaColors,
    ...shortAlphaColors,
    ...tinycolorDarkens,
    ...tinycolorLightens,
  ].filter((item) => !item.includes('-'));
}
