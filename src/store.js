import { createStore } from "redux";

const initialState = {
  sidebarShow: "responsive",
  adminModal: {
    show: false,
    type: null,
    page: null,
  },
  committeeAss2Modal: {
    show: false,
  },
};

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};

const store = createStore(changeState);
export default store;
