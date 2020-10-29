export const OPEN_MODAL = '[UI] Open Modal';
export const CLOSE_MODAL = '[UI] Close Modal';

interface IOpenModal {
  type: typeof OPEN_MODAL;
}

interface ICloseModal {
  type: typeof CLOSE_MODAL;
}

export type UIActionsTypes = IOpenModal | ICloseModal;

export const openModal = (): UIActionsTypes => {
  return {
    type: OPEN_MODAL,
  };
};

export const closeModal = (): UIActionsTypes => {
  return {
    type: CLOSE_MODAL,
  };
};
