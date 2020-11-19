import { useState } from "react";

export default function usePersist({ itemName, initialState }) {
  const [value, setValue] = useState(() => {
    const savedItem = localStorage.getItem(itemName);
    try {
      if (savedItem === null) throw new Error();
      return JSON.parse(savedItem);
    } catch (e) {
      return initialState;
    }
  });

  const customSetValue = (stateUpdate) => {
    const newValue =
      stateUpdate instanceof Function ? stateUpdate(value) : stateUpdate;
    console.log(newValue);
    setValue(newValue);

    localStorage.setItem(itemName, JSON.stringify(newValue));
  };

  return { value, customSetValue };
}
