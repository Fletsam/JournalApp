import { async } from "@firebase/util";
import { signInWithEmailAndPassword } from "firebase/auth";
import {
  LoginWithEmailPassword,
  logoutFireBase,
  registerWithEmailPassword,
  singinWithGoogle,
} from "../../firebase/providers";
import { clearNotesLogout } from "../journal";
import { checkingCredentiasl, login, logout } from "./authSlice";

export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentiasl());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentiasl());

    const result = await singinWithGoogle();
    if (!result.ok) {
      return dispatch(logout(result.errorMessage));
    }
    return dispatch(login(result));
  };
};

export const startCreatingUserWithEmailPassword = ({
  email,
  password,
  displayName,
}) => {
  return async (dispatch) => {
    dispatch(checkingCredentiasl());
    const { ok, uid, photoURL, errorMessage } = await registerWithEmailPassword(
      {
        email,
        password,
        displayName,
      }
    );
    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL, ok }));
  };
};

export const startLoginWithEmailPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentiasl());

    const { ok, displayName, photoURL, uid, errorMessage } =
      await LoginWithEmailPassword({ email, password });

    if (!ok) return dispatch(logout({ errorMessage }));
    dispatch(login({ uid, displayName, email, photoURL, ok }));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFireBase();

    dispatch(logout());
    dispatch(clearNotesLogout());
  };
};
