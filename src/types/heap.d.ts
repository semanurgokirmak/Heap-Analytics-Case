declare global {
  interface Window {
    heap: {
      identify: (identity: string) => void;
      addUserProperties: (properties: Record<string, string | number | boolean>) => void;
      addEventProperties: (properties: Record<string, any>) => void;
      clearEventProperties: () => void;
      track: (event: string, properties?: Record<string, any>) => void;
      resetIdentity: () => void;
      removeEventProperty: (property: string) => void;
      appid: string;
      userId: string;
      identity: string | null;
      config: any;
    };
  }
}

export {};