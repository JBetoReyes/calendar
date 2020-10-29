import { CLOSE_MODAL, OPEN_MODAL, UIActionsTypes } from './uiActions';
import { IUIState } from './uiModel';

const initialValue: IUIState = {
  modalOpen: false,
};

const uiReducer = (
  state: IUIState = initialValue,
  action: UIActionsTypes,
): IUIState => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        modalOpen: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        modalOpen: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
