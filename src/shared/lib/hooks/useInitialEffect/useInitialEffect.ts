import { useEffect, useRef } from "react";

export function useInitialEffect(callback: () => void | (() => void)) {
  const retVal = useRef<null | (() => void) | void>(null);
  useEffect(() => {
    retVal.current = callback();
    if (retVal.current) return retVal.current;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
