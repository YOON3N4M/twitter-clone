const SET_SIGN_IN = "SET_SIGN_IN";
const SET_SIGN_OUT = "SET_SIGN_OUT";
const SET_FBASE_INIT = "SET_FBASE_INIT";
const SET_USER = "SET_USER";

type ActionFunction = () => { type: string };
type User = Object;
type ActionFucntionData = (data: User) => { type: string; data: User };

export const setSignIn: ActionFunction = () => ({ type: SET_SIGN_IN });
export const setSignOut: ActionFunction = () => ({ type: SET_SIGN_OUT });
export const setFBaseInit: ActionFunction = () => ({ type: SET_FBASE_INIT });
export const setUser: ActionFucntionData = (data: User) => ({
  type: SET_USER,
  data: data,
});

const inititalState = {
  isLogin: false,
  fBaseInit: false,
  user: {},
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
    case SET_FBASE_INIT:
      return {
        ...state,
        setFBaseInit: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.data,
      };
    default:
      return state;
  }
}
