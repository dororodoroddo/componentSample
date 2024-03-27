import Component, { SimpleElement } from '../../Core/Component.js';

// 버튼
export default function ButtonComponent({
  id,
  className,
  attributes = {},
  type = 'button',
  styles = {},
  onclick = () => {},
  title = '',
  disabled = false,
  state = {},
  globalKeys = [],
  _properties,
  renderFunction = () => {},
}) {
  const properties = {
    ..._properties,
    onclick,
  };

  const element = SimpleElement('button', {
    id,
    className,
    css: `
      padding: 0px;
      border: none;
      background: transparent;
      cursor: pointer;
    `,
    styles,
    properties,
    attributes: { ...attributes, title, type },
  });

  element.disabled = disabled;

  return Component({
    element,
    state,
    globalKeys,
    renderFunction,
  });
}
