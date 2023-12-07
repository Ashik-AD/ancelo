import { useState } from 'react';

export type ThemeType = 'dark' | 'light' | 'dev';
export default function useTheme(themeType?: ThemeType) {
  const [theme, setTheme] = useState<ThemeType>(themeType || 'dark');

  return { theme, setTheme } as const;
}
