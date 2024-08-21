interface AppState {
  selectedColor: string;
  isDropPickerActive: boolean;
}

export const INITIAL_STATE: AppState = {
  selectedColor: '',
  isDropPickerActive: false,
};

export enum APP_ACTIONS {
  SET_COLOR = 'SET_COLOR',
  SET_DROP_PICKER_ACTIVE = 'SET_DROP_PICKER_ACTIVE',
}

type AppAction = {
  type: APP_ACTIONS;
  [payload: string]: any;
};

export const colorDropperReducer = (
  state: AppState,
  { type, payload }: AppAction,
) => {
  switch (type) {
    case APP_ACTIONS.SET_COLOR:
      return { ...state, selectedColor: payload.selectedColor };
    case APP_ACTIONS.SET_DROP_PICKER_ACTIVE:
      return {
        ...state,
        isDropPickerActive: payload.isDropPickerActive,
      };
    default:
      throw Error(`Wrong action type: ${type}`);
  }
};
