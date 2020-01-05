/* eslint-disable max-params */
import { useRef, useEffect } from 'react';

export function useEventListener(eventName, handler, flag, element = window){
  const savedHandler = useRef();
  

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      const eventListener = event => savedHandler.current(event);
      
      element.addEventListener(eventName, eventListener, flag);
      
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
}