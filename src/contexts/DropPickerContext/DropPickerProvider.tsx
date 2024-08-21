import React, { useReducer, useCallback } from 'react';
import { DropPickerContext } from './DropPickerContext';
import {
  APP_ACTIONS,
  INITIAL_STATE,
  colorDropperReducer,
} from '../../reducers/colorDropperReducer';

type DropPickerProviderType = {
  children: React.ReactNode;
};

export const DropPickerProvider = ({ children }: DropPickerProviderType) => {
  const [state, dispatch] = useReducer(colorDropperReducer, INITIAL_STATE);

  const setSelectedColor = useCallback(
    (selectedColor: string) =>
      dispatch({ type: APP_ACTIONS.SET_COLOR, payload: { selectedColor } }),
    [],
  );

  const setDropPickerActive = useCallback(
    (isDropPickerActive: boolean) =>
      dispatch({
        type: APP_ACTIONS.SET_DROP_PICKER_ACTIVE,
        payload: { isDropPickerActive },
      }),
    [],
  );

  const { selectedColor, isDropPickerActive } = state;

  return (
    <DropPickerContext.Provider
      value={{
        selectedColor,
        setSelectedColor,
        isDropPickerActive,
        setDropPickerActive,
      }}
    >
      {children}
    </DropPickerContext.Provider>
  );
};
