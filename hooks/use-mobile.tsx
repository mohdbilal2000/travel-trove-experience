import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkIsMobile()

    // Add event listener for resize
    window.addEventListener("resize", checkIsMobile)
    
    // Add event listener for orientation change (important for mobile)
    window.addEventListener("orientationchange", () => {
      // Small delay to ensure the orientation change has completed
      setTimeout(checkIsMobile, 100)
    })

    return () => {
      window.removeEventListener("resize", checkIsMobile)
      window.removeEventListener("orientationchange", checkIsMobile)
    }
  }, [])

  return isMobile
}
