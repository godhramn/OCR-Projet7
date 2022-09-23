import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals'
import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';
import './styles/index.scss';
import store from './redux/store';
import Footer from './components/Footer';

const theme = createTheme({
  palette: {
    primary: {
      light: '#fd5733',
      main: '#FD2D01',
      dark: '#b11f00',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#ffe6e6',
      main: '#FFD7D7',
      dark: '#fc7c7c',
      constrastText: '#ffffff',
    },
    tertiary: {
      light: '#717384',
      main: '#4E5166',
      dark: '#363847',
      constrastText: '#FFD7D7',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
    <Footer />
  </Provider>
)

reportWebVitals();
