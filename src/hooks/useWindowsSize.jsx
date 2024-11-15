import { useState, useEffect } from "react";

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    // This will only run in the browser
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Only run on the client side
    if (typeof window !== "undefined") {
      // Set the initial window size
      handleResize();
      // Add event listener for resizing
      window.addEventListener("resize", handleResize);

      // Clean up the event listener on component unmount
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowSize;
};

export default useWindowSize;
