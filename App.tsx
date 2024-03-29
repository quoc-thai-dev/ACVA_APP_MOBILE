/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
// import {registerRootComponent} from 'expo';
import React from 'react';
import FlashMessage from 'react-native-flash-message';
import {Provider} from 'react-redux';
import i18n from './src/locales/i18n';
import Router from './src/navigations/Router';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store'; // Adjust the path accordingly
import {I18nextProvider} from 'react-i18next';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
        <PaperProvider>
          <I18nextProvider i18n={i18n}>
            <Router />
            <FlashMessage position={'top'} />
          </I18nextProvider>
        </PaperProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

export default App;
