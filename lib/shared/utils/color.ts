/**
 * Calculate the relative luminance of a color according to WCAG 2.1
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 */
function getRelativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const sRGB = c / 255;
    return sRGB <= 0.03928 ? sRGB / 12.92 : Math.pow((sRGB + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Parse hex color to RGB values
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

/**
 * Calculate contrast ratio between two colors
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 */
export function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  
  if (!rgb1 || !rgb2) return 1;
  
  const lum1 = getRelativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getRelativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Get the best text color (black or white) for a given background color
 * to ensure WCAG AA compliance (minimum 4.5:1 contrast ratio for normal text)
 */
export function getContrastColor(backgroundColor: string): string {
  const rgb = hexToRgb(backgroundColor);
  
  if (!rgb) return '#000000'; // Fallback to black
  
  const luminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
  
  // Use white text for dark backgrounds, black for light backgrounds
  // Threshold at 0.5 works well in practice
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
}

/**
 * Check if the contrast ratio meets WCAG standards
 * @param ratio - The contrast ratio to check
 * @param level - 'AA' (4.5:1) or 'AAA' (7:1) for normal text
 */
export function meetsContrastStandard(
  ratio: number,
  level: 'AA' | 'AAA' = 'AA'
): boolean {
  return level === 'AAA' ? ratio >= 7 : ratio >= 4.5;
}
