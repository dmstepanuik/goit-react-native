import Toast from 'react-native-toast-message';

export const toastError = error => {
  Toast.show({
    type: 'error',
    text1: 'Error:',
    text2: error.message,
  });
};