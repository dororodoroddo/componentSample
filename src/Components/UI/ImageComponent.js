import { SimpleElement } from '../../Core/Component.js';

// 이미지
export default function ImageComponent({
  id,
  className,
  src,
  alt = '',
  height,
  width,
  properties = {},
  attributes = {},
  styles = {},
}) {
  attributes = {
    ...attributes,
    src,
    alt,
  };

  height && (attributes.height = height);
  width && (attributes.width = width);

  const element = SimpleElement('img', {
    id,
    className,
    attributes,
    properties,
    styles,
  });

  return element;
}
