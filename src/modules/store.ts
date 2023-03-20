const SET_SIGN_IN = "SET_SIGN_IN";
const SET_SIGN_OUT = "SET_SIGN_OUT";

type actionFunction = () => { type: string };

export const setSignIn: actionFunction = () => ({ type: SET_SIGN_IN });
export const setSignOut: actionFunction = () => ({ type: SET_SIGN_OUT });

const inititalState = {
  isLogin: false,
};

export default function store(state = inititalState, action: any) {
  switch (action.type) {
    case SET_SIGN_IN:
      return {
        ...state,
        isLogin: true,
      };
    case SET_SIGN_OUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
}
