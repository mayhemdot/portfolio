export const getDevicePixelRatio = (isMobile: boolean) => {
  if (typeof window === "undefined") return 1;
  const desktopMaxPixelRatio = 1;
  const mobileMaxPixelRatio = 1.5;

  // here you can implement your device type detection logic
  if (isMobile) {
    return Math.min(mobileMaxPixelRatio, window.devicePixelRatio);
  }

  return Math.min(desktopMaxPixelRatio, window.devicePixelRatio);
};
