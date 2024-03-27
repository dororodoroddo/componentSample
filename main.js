import Component from './src/Core/Component.js';
import Flux from './src/Core/Flux.js';
import Actions from './src/Store/Actions.js';
import InitialState from './src/Store/InitialState.js';
import App from './src/App.js';

const app = document.querySelector('#app');

// 전역 스토어 초기화
Flux.init(InitialState, Actions, { debug: false });

Component({
  element: app,
  renderFunction: () => App(),
});
