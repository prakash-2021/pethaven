import Lenis from "lenis";
import { useEffect } from "react";

const SmoothScrollProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const lenis = new Lenis();

    function animate(time: number) {
      lenis.raf(time / 1.3);
      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};
export default SmoothScrollProvider;
