import { useEffect, useState } from "react";

export const useLocalStorageState = (key: string) => {
  const [value, setValue] = useState<string>();

  useEffect(() => {
    const updateValue = () => {
      setValue(localStorage.getItem(key) || "");
    };

    window.addEventListener("storage", updateValue);

    // Also listen for manual updates in the same tab
    const interval = setInterval(updateValue, 500); // Poll every 500ms

    return () => {
      window.removeEventListener("storage", updateValue);
      clearInterval(interval);
    };
  }, [key]);

  return value;
};

export const useSetLocalStorage = () => {
  const setStoredValue = (key: string, newValue: string) => {
    localStorage.setItem(key, newValue);

    // Dispatch a custom event to notify other tabs
    window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
  };

  return setStoredValue;
};
