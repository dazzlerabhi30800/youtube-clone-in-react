import { useEffect, useState } from "react";
export default function Resize() {
  const [width, setWidth] = useState(window.innerWidth);

  const handleWidth = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, [width]);

  return { width };
}
