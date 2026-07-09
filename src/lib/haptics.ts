export const triggerVibration = (pattern: number | number[] = 50) => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {
      // Ignore errors on devices that don't support vibration
    }
  }
};

// Patterns for different interactions
export const hapticPatterns = {
  light: 10,
  medium: 50,
  heavy: 100,
  success: [20, 50, 20],
  error: [50, 50, 50],
};
