import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const TABLET_BREAKPOINT = 1024;

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function useResponsive() {
  const [device, setDevice] = React.useState<DeviceType | undefined>(
    undefined,
  );

  React.useEffect(() => {
    const updateDevice = () => {
      const width = window.innerWidth;
      if (width < MOBILE_BREAKPOINT) {
        setDevice('mobile');
      } else if (width < TABLET_BREAKPOINT) {
        setDevice('tablet');
      } else {
        setDevice('desktop');
      }
    };

    const mqlMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const mqlTablet = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`);

    mqlMobile.addEventListener("change", updateDevice);
    mqlTablet.addEventListener("change", updateDevice);
    updateDevice();

    return () => {
      mqlMobile.removeEventListener("change", updateDevice);
      mqlTablet.removeEventListener("change", updateDevice);
    };
  }, []);

  return {
    isMobile: device === 'mobile',
    isTablet: device === 'tablet',
    isDesktop: device === 'desktop',
    device: device || 'desktop'
  };
}

// Keep the old hook for backward compatibility
export function useIsMobile() {
  const { isMobile } = useResponsive();
  return isMobile;
}
