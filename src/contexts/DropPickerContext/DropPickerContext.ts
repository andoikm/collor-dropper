import { createContext } from 'react';

interface IDropPickerContext {
  selectedColor: string;
  setSelectedColor: (selectedColor: string) => void;
  isDropPickerActive: boolean;
  setDropPickerActive: (isDropPickerActive: boolean) => void;
}

export const DropPickerContext = createContext<IDropPickerContext>({
  selectedColor: '',
  setSelectedColor: () => {},
  isDropPickerActive: false,
  setDropPickerActive: () => {},
});
