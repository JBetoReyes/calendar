export const OPEN_MODAL = '[UI] Open Modal';
export const CLOSE_MODAL = '[UI] Close Modal';

interface IOpenModal {
  type: typeof OPEN_MODAL;
}

interface ICloseModal {
  type: typeof CLOSE_MODAL;
}

export type UIActionsTypes = IOpenModal | ICloseModal;

const openModal = (): UIActionsTypes => {
  return {
    type: OPEN_MODAL,
  };
};
