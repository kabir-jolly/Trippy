/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#6366F1';
const tintColorDark = '#818CF8';

export const Colors = {
  light: {
    text: '#1F2937',
    background: '#FFFFFF',
    tint: tintColorLight,
    icon: '#4B5563',
    tabIconDefault: '#D1D5DB',
    tabIconSelected: tintColorLight,
    border: '#E5E7EB',
    card: '#FFFFFF',
    cardBorder: '#F3F4F6',
    primary: '#6366F1',
    secondary: '#8B5CF6',
    accent: '#EC4899',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    muted: '#9CA3AF',
    buttonBackground: '#6366F1',
    buttonText: '#FFFFFF',
    inputBackground: '#F9FAFB',
    shadow: 'rgba(0, 0, 0, 0.05)',
  },
  dark: {
    text: '#F9FAFB',
    background: '#111827',
    tint: tintColorDark,
    icon: '#D1D5DB',
    tabIconDefault: '#4B5563',
    tabIconSelected: tintColorDark,
    border: '#374151',
    card: '#1F2937',
    cardBorder: '#374151',
    primary: '#818CF8',
    secondary: '#A78BFA',
    accent: '#F472B6',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    muted: '#6B7280',
    buttonBackground: '#818CF8',
    buttonText: '#F9FAFB',
    inputBackground: '#374151',
    shadow: 'rgba(0, 0, 0, 0.2)',
  },
};
