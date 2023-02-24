import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signOut,
} from 'firebase/auth';
// import Toast from 'react-native-toast-message';
import { authSlice } from './authSlice';
import { auth } from '../../firebase/config';
import { postsSlice } from '../posts/postsSlice';
import { toastError } from '../../helpers/toast';

const authLogin = ({ email, password }) =>
  async dispatch => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: user.user.uid,
          nickName: user.user.displayName,
          userEmail: user?.user?.email,
          userAvatar: user?.user?.photoURL,
        }),
      );
      dispatch(authSlice.actions.authCurrentUser(true));
    } catch (error) {
      toastError(error);
    }
  };

const authRegister = ({ email, password, nickname, photoURL }) =>
  async dispatch => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: nickname,
        photoURL,
      });
      const userSuccess = auth.currentUser;
      dispatch(
        authSlice.actions.updateUserProfile({
          userId: userSuccess.uid,
          nickName: userSuccess.displayName,
          userEmail: userSuccess.email,
          userAvatar: userSuccess.photoURL,
        }),
      );
      dispatch(authSlice.actions.authCurrentUser(true));
      console.log(userSuccess);
    } catch (error) {
      toastError(error);
    }
  };

const authLogout = () => async dispatch => {
  try {
    await signOut(auth);
    dispatch(authSlice.actions.authLogOut());
    dispatch(postsSlice.actions.reset());
  } catch (e) {
    toastError(e);
  }
};

const authCurrentUser = () => async dispatch => {
  try {
    await onAuthStateChanged(auth, user => {
      if (user) {
        dispatch(
          authSlice.actions.updateUserProfile({
            userId: user.uid,
            nickName: user.displayName,
            userEmail: user?.email,
          }),
        );
        dispatch(authSlice.actions.authCurrentUser(true));
      }
    });
  } catch (e) {
    toastError(e);
  }
};

const authOperations = {
  authLogin,
  authRegister,
  authLogout,
  authCurrentUser,
};

export default authOperations;
