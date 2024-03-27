import Component, { SimpleElement } from '../../Core/Component.js';

// 직선 나열형 리스트
export function LinearList({
  elementType = 'ul',
  id,
  className,
  attributes = {},
  styles = {},
  // vsertical | horizontal
  direction = 'vertical',
  properties = {},
  state = {},
  globalKeys = [],
  renderFunction = () => {},
}) {
  let css;
  if (direction === 'vertical') {
    css = `
     display: flex;
     flex-flow: column nowrap;
   `;
  }

  if (direction === 'horizontal') {
    css = `
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
    `;
  }

  const element = SimpleElement(elementType, {
    id,
    className,
    css,
    styles,
    attributes,
    properties,
  });

  return Component({
    element,
    state,
    globalKeys,
    renderFunction,
  });
}

// 리스트 아이템
export function LinearListItem({
  id,
  className,
  attributes = {},
  styles = {},
  properties = {},
  state = {},
  globalKeys = [],
  renderFunction = () => {},
}) {
  const element = SimpleElement('li', {
    id,
    className,
    css: `
      diplay: flex;
      align-items: center;
      justify-content: space-between;
      padding : 3px 0 3px 12px;
    `,
    styles,
    properties,
    attributes,
  });

  return Component({
    element,
    state,
    globalKeys,
    renderFunction,
  });
}
