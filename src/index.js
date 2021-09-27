import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import App from './App';
import Modal from './components/Modal';
import configureStore from './store';
import { SetModalMooring } from './store/modal';
import { SetOverlayMooring } from './store/engine/overlays/actions';

import './index.css';
import './utils/prototypes';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.dispatch = store.dispatch;
}

function Root () {
  const dispatch = useDispatch();
  const modalMooringRef = useRef(null);
  const overlayMooringRef = useRef(null);

  useEffect(() => {
    dispatch(SetModalMooring(modalMooringRef.current));
    dispatch(SetOverlayMooring(overlayMooringRef.current));
  }, [dispatch]);

  return (
    <BrowserRouter>
      <App />
      <Modal />
      <div ref={modalMooringRef} id='modal' />
      <div ref={overlayMooringRef} id='overlay' />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
