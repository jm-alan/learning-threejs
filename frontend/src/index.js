import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';

import * as pointLights from './store/engine/pointLights/actions';
import * as ambientLights from './store/engine/ambientLights/actions';
import * as camera from './store/engine/cameras/actions';
import * as canvas from './store/engine/canvas/actions';
import * as geometries from './store/engine/geometries/actions';
import * as keys from './store/engine/keys/actions';
import * as renderer from './store/engine/renderer/actions';
import * as scene from './store/engine/scene/actions';
import App from './App';
import Modal from './components/Modal';
import configureStore from './store';
import Errors from './components/Errors';
import csrfetch from './store/csrfetch';
import { SetModalMooring } from './store/modal';
import { SetOverlayMooring } from './store/engine/overlays/actions';

import './index.css';
import findCookie from './utils/findCookie';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  const engine = {
    pointLights,
    ambientLights,
    camera,
    canvas,
    geometries,
    keys,
    renderer,
    scene
  };
  window.store = store;
  window.dispatch = store.dispatch;
  window.csrfetch = csrfetch;
  window.findCookie = findCookie;
  window.engine = engine;
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
      <Errors />
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
