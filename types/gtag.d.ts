declare global {
  interface Window {
    gtag?: (
      command: 'event',
      eventName: string,
      eventParams?: Record<string, string | number | boolean>
    ) => void;
  }
}

export {};
