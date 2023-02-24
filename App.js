import { Provider } from 'react-redux';
import Index from './src/Index';
import { store } from './src/redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  );
}
