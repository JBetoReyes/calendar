import React from 'react';
import { Provider } from 'react-redux';
import AppRouter from './components/routers/AppRouter';
import store from './store/store';

const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
};

export default App;
