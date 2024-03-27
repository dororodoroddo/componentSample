import Component, { SimpleElement } from './Core/Component.js';
import Header from './Components/Layout/Header.js';

// 앱 영역
export default function App() {
  return Component({
    element: SimpleElement('div'),
    renderFunction: () => {
      return [Header()];
    },
  });
}
