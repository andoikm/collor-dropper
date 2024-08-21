import { useContext } from 'react';
import { DropPickerContext } from './DropPickerContext';

export const useDropPickerContext = () => useContext(DropPickerContext);
