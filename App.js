import { Provider } from 'react-redux';
import Index from './src/Index';
import { store } from './src/redux/store';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store}>
      <Index />
      <Toast/>
    </Provider>
  );
}
