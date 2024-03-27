import Component, { SimpleElement } from '../../Core/Component.js';

const fontMap = {
  'bold-1': 'font-weight: 700;',
  'normal-1': 'font-weight: 500;',
};

const colorMap = {
  'black-100': 'color: rgba(0, 0, 0, 1);',
  'white-100': 'color: rgba(255, 255, 255, 1);',
};

// 공통 텍스트 컴포넌트
export default function TextComponent({
  elementType = 'span',
  id,
  className,
  text = '',
  attributes = {},
  properties = {},
  styles = {},
  font = 'normal-1',
  color = 'black-100',
}) {
  const element = SimpleElement(elementType, {
    id,
    className,
    textContent: text,
    css: fontMap[font] + colorMap[color],
    styles,
    attributes,
    properties,
  });

  return element;
}
