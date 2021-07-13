import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider, useDispatch, useSelector } from 'react-redux';

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
import { SetMooring } from './store/modal';

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
  const mooringRef = useRef(null);

  const activeEngine = useSelector(state => state.engine);

  useEffect(() => {
    dispatch(SetMooring(mooringRef.current));
  }, [dispatch]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') window.activeEngine = activeEngine;
  }, [activeEngine]);

  return (
    <BrowserRouter>
      <Errors />
      <App />
      <Modal />
      <div ref={mooringRef} id='modal' />
      <div id='overlays' />
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
